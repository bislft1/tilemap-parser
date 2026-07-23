# tilemap-parser Documentation Guide

This document describes the **public API surface**, **correct usage patterns**, and **common pitfalls** of the `tilemap-parser` package. It is written to guide an AI agent building a documentation site.

---

## 1. Architecture Overview

```
tilemap_parser/
├── __init__.py          # Re-exports everything via __all__ (87 symbols)
├── parser/              # Parsing: JSON/TMX → typed dataclasses
│   ├── map_parse.py     # Map / layer / tile / tileset dataclasses
│   ├── tmx_converter.py # Tiled TMX/TSX importer
│   ├── collision.py     # Collision models (Polygon, Rect, Circle, Capsule)
│   ├── collision_loader.py # File I/O for collision JSON
│   ├── animation.py     # Animation clip/library parsing
│   ├── particle.py      # Particle config parsing
│   └── node_parse.py    # Node/area/particle-emitter parsing
├── runtime/             # Runtime classes (Pygame surfaces, rendering, collision)
│   ├── map_loader.py    # TilemapData — central loaded-map object
│   ├── renderer.py      # TileLayerRenderer — tile rendering + y-sort
│   ├── map_object.py    # MapObject + load_map_objects
│   ├── tile_collision.py # CollisionRunner — movement/physics
│   ├── object_collision.py # ObjectCollisionManager — object-vs-object
│   ├── camera.py        # Camera with follow, shake, bounds
│   ├── animation_player.py # SpriteAnimationSet + AnimationPlayer
│   ├── particles.py     # Particle system (editor preview quality)
│   └── collision_cache.py # Global collision data cache
└── utils/
    └── geometry.py      # Pure collision math (SAT, AABB, shape dispatchers)
```

### Data Flow

```
map.json → parse_map_file() → ParsedMap (typed dataclasses)
                                        ↓
                             TilemapData.load() loads images, resolves paths
                                        ↓
                             TileLayerRenderer (renders tiles)
                             load_map_objects() (loads object-layer entities)
                             CollisionRunner (movement & tile collision)
```

---

## 2. Loading a Map

### Entry Point

```python
from tilemap_parser import load_map

data = load_map("path/to/map.json", extra_search_base=Path("assets/"))
```

**DO NOT** manually construct `TilemapData` — use `load_map()` or `TilemapData.load()`.

### What `load_map()` does internally

1. Calls `parse_map_file(path)` → `ParsedMap` (typed dataclasses)
2. Loads each tileset image via `pygame.image.load()`
3. Searches for sidecar `<map_stem>.nodes.json` for node data (area zones, particle emitters)
4. Normalizes `.ttype` fields from string paths to integer tileset indices
5. Returns a `TilemapData` instance with all surfaces, paths, and parsed data

### TilemapData Key Properties

| Property | Type | Description |
|---|---|---|
| `parsed` | `ParsedMap` | The full parsed map (metadata, layers, tilesets, etc.) |
| `surfaces` | `List[Optional[Surface]]` | Loaded tileset surfaces, indexed parallel to `parsed.tilesets` |
| `resolved_paths` | `List[Path]` | Resolved file paths for each tileset |
| `map_path` | `Optional[Path]` | Original map file path |
| `tile_size` | `(int, int)` | `(tile_width, tile_height)` |
| `render_scale` | `float` | Visual scale factor applied to all spatial data |
| `area_nodes` | `List[AreaNode]` | Parsed area zones for triggers/events |
| `particle_emitters` | `List[ParticleEmitterNode]` | Parsed particle emitters |

---

## 3. Tile Rendering (TileLayerRenderer)

### Basic Usage

```python
from tilemap_parser import TileLayerRenderer

renderer = TileLayerRenderer(data)
stats = renderer.render(screen, camera.offset)
# stats.drawn_tiles, stats.skipped_tiles, stats.visible_layers
```

### Full Signature

```python
def render(
    self,
    target: Surface,
    camera_xy: tuple[float, float] = (0, 0),
    viewport_size: tuple[int, int] | None = None,
    *,
    extra_objects: Sequence | None = None,
    current_time_ms: float | None = None,
) -> LayerRenderStats
```

### Layer Ordering

Tiles render in **layer z_index order** (ascending). Within each layer, tiles render chunk-by-chunk (chunked 32×32 for frustum culling). Within each chunk, original insertion order is preserved **unless** `y_sort` is enabled.

### Y-Sort

When `layer.y_sort == True`, each chunk's tiles are sorted by their **pixel Y coordinate** before blitting:

```python
sorted(chunk, key=lambda p: p[1] * eff_h + y_sort_origin)
```

- Tile Y = `(grid_row * tile_height)`
- `y_sort_origin` = per-layer pixel offset (default 0 = top of tile)
- Setting `y_sort_origin = tile_height` sorts by **bottom** of tile
- Higher Y renders on top (painter's algorithm)

**Only layers with `y_sort=True` are y-sorted** — non-y-sorted layers preserve their natural chunk order. Y-sort is opt-in, not global.

### Extra Objects

```python
class ExtraObject(Protocol):
    surface: Surface | None
    x: float
    y: float
    # optional: z_index: int (default 0, NOT USED for ordering)
    # optional: y_sort_origin: int | None (default None)
```

Pass renderable game entities to blit **after** all tile layers:

```python
stats = renderer.render(screen, camera.offset, extra_objects=my_objects)
```

Extra objects are blitted in **caller order** (no interleaving with tile layers). They always render on top of all tiles. The old behavior of global `(z_index, y)` sort has been removed — y-sort for objects is the game's responsibility.

**Use case**: Rendering buildings, NPCs, items on top of the tilemap. For proper y-sort integration with the player, the game code should sort objects + player together.

### Animated Tiles

Tileset animation metadata is read from the map JSON. Supports two modes:

- `"default"` — all tiles of the same type animate in sync
- `"random_start_times"` — each tile's animation phase is seeded by its `(x, y, ttype)` hash

Animation frame = `variant + frame_index * frame_stride`

---

## 4. Object Layers (MapObject)

### Loading Objects

```python
from tilemap_parser import load_map_objects

objects = load_map_objects(data, "path/to/collision/")
```

`load_map_objects` iterates every **object layer** in the map, resolves `<tileset_stem>.object_collision.json` from the collision directory, and returns a list of `MapObject` instances.

### MapObject Fields

| Field | Type | Description |
|---|---|---|
| `x` | `float` | World X (pre-scaled by render_scale) |
| `y` | `float` | World Y (pre-scaled by render_scale) |
| `surface` | `Surface` | Rendered sprite (pre-scaled) |
| `collision_shape` | `CollisionPolygon` | Primary collision shape |
| `collision_shapes` | `List[CollisionPolygon]` | All shapes (for multi-shape regions) |
| `collision_layer` | `int` | Physics layer bitmask |
| `collision_mask` | `int` | Physics mask bitmask |
| `y_sort_origin` | `Optional[int]` | Y-sort offset (default None = use `surface.get_height()`) |

### Y-Sort Origin for Objects

In the **game code** (not the renderer), objects are typically y-sorted against the player. The sort key should be:

```python
sort_y = obj.y + (obj.y_sort_origin if obj.y_sort_origin is not None else obj.surface.get_height())
```

**Default** (`y_sort_origin = None`): sort by **bottom** of the sprite.  
**Set to `height // 2`**: sort by **center** of the sprite (useful for tall buildings — player walks past the door and renders on top).  
**Set to 0**: sort by **top** of the sprite.

### IMPORTANT: Only objects with collision data are loaded

`load_map_objects` **skips objects that have no matching `<tileset>.object_collision.json` file** or whose region has no collision shapes. If an object isn't appearing, check:
1. The collision file exists in the correct directory
2. The file name matches `<tileset_path.stem>.object_collision.json`
3. The region within the collision file is valid

---

## 5. Collision System

### Tile Collision (CollisionRunner)

```python
from tilemap_parser import CollisionRunner, MovementMode

runner = CollisionRunner(
    tile_size=(16, 16),
    mode=MovementMode.SLIDE,  # SLIDE | PLATFORMER | RPG
    render_scale=2.0,         # Must match the map's render_scale
)
```

**Movement modes:**

| Mode | Use case |
|---|---|
| `SLIDE` | Top-down, slide along walls |
| `PLATFORMER` | Platformer with gravity, jumping, step-up |
| `RPG` | Grid-snapping top-down |

**Usage:**

```python
# RPG mode
result = runner.move_rpg(entity, tileset_collision, tile_map, dx, dy)

# Slide mode
result = runner.move_and_slide(entity, tileset_collision, tile_map, dx, dy)

# Platformer mode
result = runner.move_platformer(entity, tileset_collision, tile_map, dt, input_x, jump_pressed)
```

### Object-vs-Object Collision

```python
from tilemap_parser import ObjectCollisionManager

manager = ObjectCollisionManager()
manager.add_object(my_object)
hits = manager.check_object(player)
for hit in hits:
    player.x -= hit.normal[0] * hit.depth
    player.y -= hit.normal[1] * hit.depth
```

Or lower-level:

```python
from tilemap_parser import check_collision

hit = check_collision(entity_a, entity_b)
if hit:
    hit.resolve()  # separates both by half depth
```

### Setting Up Tile Collision

```python
from tilemap_parser import load_tileset_collision

tileset_collision = load_tileset_collision("path/to/Atlas.collision.json")
tile_map = data.build_tile_map(use_gids=True)
```

### DO: Use `get_shape_aabb()`

To get the world-space bounding box of any entity's collision shape:

```python
from tilemap_parser import get_shape_aabb

left, top, right, bottom = get_shape_aabb(entity.x, entity.y, entity.collision_shape)
```

This is the **correct** way to determine an entity's spatial extent. It works for all shape types (RectangleShape, CircleShape, CapsuleShape, CollisionPolygon) and accounts for the shape's offset.

### DON'T: Direct `x`/`y` manipulation for collision bounds

```python
# ❌ WRONG — assumes rectangle, ignores offset
entity_rect = Rect(entity.x, entity.y, 32, 32)

# ✅ CORRECT — uses get_shape_aabb
from tilemap_parser import get_shape_aabb
left, top, right, bottom = get_shape_aabb(entity.x, entity.y, entity.collision_shape)
```

### DON'T: Assume tile coordinates == pixel coordinates

`render_scale` multiplies all spatial data. A tile at grid `(5, 10)` with `tile_size=(16,16)` and `render_scale=2.0` has pixel position `(160, 320)`. Always use `TileLayerRenderer.render()` with camera offset rather than manual layout.

---

## 6. The `ICollidable` Protocol

Any entity that participates in collision must satisfy this protocol:

```python
class ICollidable(Protocol):
    x: float
    y: float
    collision_shape: RectangleShape | CircleShape | CapsuleShape | CollisionPolygon
```

Implement it on your entity class:

```python
from tilemap_parser import ICollidable, RectangleShape

class Player(ICollidable):
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.collision_shape = RectangleShape(width=16, height=16, offset=(0, 0))
```

For object-vs-object collision, also implement `ICollidableObject`:

```python
class ICollidableObject(ICollidable, Protocol):
    collision_layer: int
    collision_mask: int
```

The layer/mask system uses bitwise AND: two objects collide if `(a.collision_layer & b.collision_mask) != 0` and `(b.collision_layer & a.collision_mask) != 0`.

---

## 7. Camera

```python
from tilemap_parser import Camera

camera = Camera(
    viewport_width=800,
    viewport_height=600,
    mode="centered",           # "centered" | "deadzone"
)
camera.follow(player)
camera.update(dt)
# camera.offset → (x, y) for rendering
```

Features:
- **Modes:** `"centered"` (always center on target) or `"deadzone"` (move only when target leaves a dead zone)
- **Lerp smoothing:** `camera.lerp_speed = 4.0`
- **Bounds clamping:** `camera.bounds = Rect(0, 0, map_pixels_w, map_pixels_h)`
- **Screen shake:** `camera.shake(duration=0.5, intensity=5.0)`

---

## 8. Animation System

### Loading

```python
from tilemap_parser import (
    SpriteAnimationSet,
    AnimationPlayer,
)

anim_set = SpriteAnimationSet.load("path/to/anim.json")
player_anim = AnimationPlayer(anim_set, "idle")
```

### Update / Render Loop

```python
player_anim.update(dt_ms)              # advance animation
frame = player_anim.get_current_image() # get current frame Surface
screen.blit(frame, position)
```

### State Machine Integration Pattern

```python
class Player:
    def __init__(self):
        self.anim_set = SpriteAnimationSet.load("player.anim.json")
        self.anims = {
            "idle": AnimationPlayer(self.anim_set, "idle"),
            "walk": AnimationPlayer(self.anim_set, "walk"),
            "jump": AnimationPlayer(self.anim_set, "jump"),
        }
        self.current_state = "idle"

    def set_state(self, state):
        if state != self.current_state:
            self.anims[state].reset()
            self.current_state = state

    def update(self, dt_ms):
        self.anims[self.current_state].update(dt_ms)

    def render(self, screen, position):
        frame = self.anims[self.current_state].get_current_image()
        if frame:
            screen.blit(frame, position)
```

---

## 9. Particle System

### Loading from Map Nodes

```python
for emitter_node in data.particle_emitters:
    system = ParticleSystem(emitter_node.config)
    system.update(dt, *emitter_node.rect)
    system.draw(screen, *camera.offset, zoom=1.0)
```

### Manual Use

```python
from tilemap_parser import (
    ParticleSystem, ParticleSystemConfig, ParticleRenderer,
)

config = ParticleSystemConfig(
    name="smoke",
    emission_shape="point",
    particle_shape="circle",
    lifetime=1.0,
    speed=50.0,
    ...
)
system = ParticleSystem(config)
system.emit_burst(count=10, x=100, y=100, w=0, h=0)
system.update(dt, area_x, area_y, area_w, area_h)
system.draw(screen, offset_x, offset_y, zoom)
```

---

## 10. Y-Sort: Complete Reference

### Layer-Level

| Field | Type | Default | Description |
|---|---|---|---|
| `y_sort` | `bool` | `False` | Enable y-sort for this layer |
| `y_sort_origin` | `int` | `0` | Pixel offset from tile top for sort point |

**On disk (JSON):**
```json
{
  "name": "buildings",
  "type": "tile",
  "y_sort": true,
  "y_sort_origin": 16
}
```

**Effect:** When `y_sort=True`, each chunk's tiles are rendered in ascending Y order (bottom-most renders last/on-top). `y_sort_origin` shifts the comparison point — positive values push it down. Default `0` sorts by tile top, `tile_height` sorts by tile bottom.

### Object-Level (MapObject)

`y_sort_origin: Optional[int] = None` on `MapObject.__init__()`.

The renderer does **not** sort objects — the game is responsible. Recommended sort key:

```python
def obj_sort_y(obj):
    origin = obj.y_sort_origin if obj.y_sort_origin is not None else int(obj.surface.get_height())
    return obj.y + origin
```

### Player Integration Pattern

```python
# 1. Render tiles
renderer.render(screen, camera.offset)

# 2. Y-sort objects + player together
items = []
for obj in game_objects:
    sort_y = obj.y + (obj.y_sort_origin or obj.surface.get_height())
    items.append((sort_y, "object", obj))

player_sort_y = get_shape_aabb(player.x, player.y, player.collision_shape)[3]
items.append((player_sort_y, "player", player))

items.sort(key=lambda e: e[0])

for _, kind, data in items:
    if kind == "object":
        screen.blit(data.surface, (data.x - cam_x, data.y - cam_y))
    else:
        data.render(screen, (cam_x, cam_y))
```

---

## 11. Common Pitfalls & Rules

### DO

- **DO** use `load_map()` / `TilemapData.load()` to load maps — never construct manually
- **DO** use `get_shape_aabb()` for entity bounds — works for all shape types
- **DO** match `CollisionRunner.render_scale` to the map's `render_scale`
- **DO** warm up the renderer cache: `renderer.warm_cache()` after construction
- **DO** pass the map's `render_scale` when constructing `CollisionRunner.from_game_type()`
- **DO** use `ObjectCollisionManager.check_object()` for entity-vs-object collision
- **DO** check `skipped_tiles` in `LayerRenderStats` — non-zero means missing tileset surfaces

### DON'T

- **DON'T** modify `MapObject.x`/`MapObject.y` directly without collision resolution — use `ObjectCollisionManager` to resolve overlaps
- **DON'T** create `MapObject` instances manually — always use `load_map_objects()`
- **DON'T** assume tile-space coordinates are pixel coordinates — `render_scale` multiplies everything
- **DON'T** create `TileLayerRenderer` before `data.warm_cache()` is called (call `renderer.warm_cache()` after construction)
- **DON'T** expect `extra_objects` to y-sort automatically — the renderer blits them in caller order
- **DON'T** rely on `rect_vs_tilemap` — it's declared in `__all__` but **not implemented** in the current source

### Performance

- The renderer uses **chunk-based frustum culling** (32×32 chunks) — only tiles visible in the viewport are iterated
- **Variant caching** — each `(ttype, variant)` pair is cached once, scaled by `render_scale`
- `warm_cache()` pre-renders all variants and releases the reference to `data` (allowing garbage collection of tileset surfaces)
- **Object collision** (`ObjectCollisionManager`) uses uniform-grid spatial broadphase

---

## 12. Test Patterns

Tests use a `_SpySurface` subclass to verify blit order:

```python
class _SpySurface(pygame.Surface):
    def __init__(self, size):
        super().__init__(size)
        self.blit_calls: list[tuple[float, float]] = []

    def blit(self, source, dest, *args, **kwargs):
        if isinstance(dest, tuple):
            self.blit_calls.append((float(dest[0]), float(dest[1])))
        else:
            self.blit_calls.append((float(dest.x), float(dest.y)))
        return super().blit(source, dest, *args, **kwargs)
```

For collision tests, a `_ToastStub` pattern is used to capture toast events without a real UI.

---

## 13. TMX / Tiled Import

The parser supports Tiled `.tmx` files:

```python
from tilemap_parser import parse_map_file

parsed = parse_map_file("map.tmx")  # auto-detects .tmx extension
```

Supported features:
- CSV, Base64+zlib, Base64+gzip, and XML tile encoding
- External TSX tileset references
- Flip flags (horizontal, vertical, diagonal)
- Layer properties and tile properties
- `tilecount` auto-calculation from image dimensions when not specified

---

## 14. Version History Notes

- `render_scale` → all spatial data is pre-scaled during load
- `y_sort` → per-layer opt-in, not global
- `y_sort_origin` → pixel offset for sort comparison point
- `extra_objects` → blitted after all tiles in caller order (no z_index interleaving)
- `warm_cache()` sets `self.data = None` after caching — do not call `render()` after `warm_cache()` if you still need `data` for other purposes

---

## 15. Building a Docs Site

The documentation site should include:

1. **Quickstart** — minimal example loading a map, rendering tiles, adding a player
2. **Map Loading** — `load_map()`, `TilemapData`, `ParsedMap` structure
3. **Tile Rendering** — `TileLayerRenderer`, y-sort, extra_objects, animations
4. **Collision** — `CollisionRunner` (3 modes), `ObjectCollisionManager`, `check_collision`
5. **Objects** — `MapObject`, `load_map_objects`, collision data files
6. **Camera** — follow modes, bounds, shake
7. **Animation** — `SpriteAnimationSet`, `AnimationPlayer`
8. **Particles** — `ParticleSystem`, emitter nodes
9. **Parsed Data Reference** — all dataclass fields
10. **TMX Import** — Tiled compatibility
11. **Y-Sort Deep Dive** — how it works, `y_sort_origin`, player integration
12. **Common Pitfalls** — DO/DON'T list above

**Do NOT include** `examples/` content in the docs site (the platformer example is FSM-based and too advanced for reference documentation). Link to the `examples/` directory as a separate resource.

Also dont assume to use current webdocs/ its 0/10 ai looking miconfigured component site that neither looks good nor is good docs site
