import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function TileRendering() {
  return (
    <>
      <Seo 
        title="Tile Rendering" 
        description="TileLayerRenderer with y-sort, extra_objects, and animated tiles"
        path="/tile-rendering"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Tile Rendering</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The <code>TileLayerRenderer</code> class handles rendering tile layers with support for y-sort, 
        extra objects, and animated tiles.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Basic usage</h2>
      
      <CodeBlock code={`from tilemap_parser import TileLayerRenderer

renderer = TileLayerRenderer(data)
renderer.warm_cache()

# In game loop:
stats = renderer.render(screen, camera.offset)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Full render signature</h2>
      
      <CodeBlock code={`def render(
    self,
    target: Surface,
    camera_xy: tuple[float, float] = (0, 0),
    viewport_size: tuple[int, int] | None = None,
    *,
    extra_objects: Sequence | None = None,
    current_time_ms: float | None = None,
) -> LayerRenderStats`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Y-Sort</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        When a layer has <code>y_sort=True</code>, tiles within each chunk are sorted by their pixel Y coordinate:
      </p>
      
      <CodeBlock code={`sorted(chunk, key=lambda p: p[1] * eff_h + y_sort_origin)`} />

      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>Tile Y = <code>grid_row * tile_height</code></li>
        <li style={{ marginBottom: 8 }}><code>y_sort_origin</code> = per-layer pixel offset (default 0 = top of tile)</li>
        <li style={{ marginBottom: 8 }}>Setting <code>y_sort_origin = tile_height</code> sorts by bottom of tile</li>
        <li style={{ marginBottom: 8 }}>Higher Y renders on top (painter's algorithm)</li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Note:</strong> Only layers with <code>y_sort=True</code> are y-sorted. Non-y-sorted layers preserve their natural chunk order.
          Y-sort is opt-in, not global. See <a href="#/y-sort-guide" style={{ color: '#2563eb' }}>Y-Sort Guide</a> for complete details.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Extra Objects</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Pass renderable game entities to blit after all tile layers:
      </p>
      
      <CodeBlock code={`stats = renderer.render(screen, camera.offset, extra_objects=my_objects)`} />

      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Extra objects follow this protocol:
      </p>
      
      <CodeBlock code={`class ExtraObject(Protocol):
    surface: Surface | None
    x: float
    y: float
    # optional: z_index: int (default 0, NOT USED for ordering)
    # optional: y_sort_origin: int | None (default None)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #ef4444',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Important:</strong> Extra objects are blitted in caller order — they do NOT interleave with tile layers 
          and do NOT auto y-sort. The game is responsible for sorting objects + player together if needed.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Animated Tiles</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Tileset animation metadata is read from the map JSON. Supports two modes:
      </p>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code>"default"</code> — all tiles of the same type animate in sync</li>
        <li style={{ marginBottom: 8 }}><code>"random_start_times"</code> — each tile's animation phase is seeded by its (x, y, ttype) hash</li>
      </ul>

      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Pass <code>current_time_ms</code> to animate tiles:
      </p>
      
      <CodeBlock code={`import pygame

clock = pygame.time.Clock()
start_time = pygame.time.get_ticks()

while running:
    current_time = pygame.time.get_ticks() - start_time
    stats = renderer.render(screen, camera.offset, current_time_ms=current_time)
    clock.tick(60)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Layer ordering</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Tiles render in layer <code>z_index</code> order (ascending). Within each layer:
      </p>
      
      <ol style={{ paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>Chunk-by-chunk (32×32 chunks for frustum culling)</li>
        <li style={{ marginBottom: 8 }}>Within each chunk: original insertion order (unless y_sort enabled)</li>
        <li style={{ marginBottom: 8 }}>If y_sort: sorted by pixel Y coordinate</li>
      </ol>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Render stats</h2>
      
      <CodeBlock code={`stats = renderer.render(screen, camera.offset)

print(f"Drawn: {stats.drawn_tiles}")
print(f"Skipped: {stats.skipped_tiles}")
print(f"Visible layers: {stats.visible_layers}")`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> Learn about <a href="#/object-layers" style={{ color: '#2563eb' }}>Object Layers</a> for loading map objects with collision data.
        </p>
      </div>
    </>
  )
}
