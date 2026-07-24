export interface SearchResult {
  path: string
  title: string
  content: string
  section?: string
}

const SEARCH_INDEX: SearchResult[] = [
  {
    path: '/',
    title: 'Introduction',
    content: 'tilemap-parser is a Python library for parsing Tiled maps and rendering tilemaps with Pygame. It provides typed dataclasses, runtime rendering, collision systems, and more.',
    section: 'Getting Started'
  },
  {
    path: '/installation',
    title: 'Installation',
    content: 'Install tilemap-parser via pip: pip install tilemap-parser. Requires Python 3.8+ and pygame.',
    section: 'Getting Started'
  },
  {
    path: '/quickstart',
    title: 'Quick Start',
    content: 'Load a map with load_map(), create a TileLayerRenderer, and render tiles to screen. Minimal example included.',
    section: 'Getting Started'
  },
  {
    path: '/map-loading',
    title: 'Map Loading',
    content: 'Use load_map() to parse map files. Returns TilemapData with parsed data, surfaces, resolved paths, area_nodes, and particle_emitters.',
    section: 'Core Concepts'
  },
  {
    path: '/tile-rendering',
    title: 'Tile Rendering',
    content: 'TileLayerRenderer renders tile layers with y-sort support, extra_objects for game entities, and animated tiles. Supports chunk-based frustum culling.',
    section: 'Core Concepts'
  },
  {
    path: '/object-layers',
    title: 'Object Layers',
    content: 'load_map_objects() loads MapObject instances from object layers. Each object has x, y, surface, collision_shape, collision_layer, collision_mask, and y_sort_origin.',
    section: 'Core Concepts'
  },
  {
    path: '/collision',
    title: 'Collision Overview',
    content: 'Collision system includes CollisionRunner for tile collision (SLIDE, PLATFORMER, RPG modes) and ObjectCollisionManager for object-vs-object collision.',
    section: 'Collision'
  },
  {
    path: '/collision-runner',
    title: 'CollisionRunner',
    content: 'CollisionRunner handles entity movement with tile collision. Modes: SLIDE for top-down sliding, PLATFORMER for platformers with gravity, RPG for grid-snapping.',
    section: 'Collision'
  },
  {
    path: '/camera',
    title: 'Camera',
    content: 'Camera class provides follow functionality with centered or deadzone modes, bounds clamping, lerp smoothing, and screen shake.',
    section: 'Runtime'
  },
  {
    path: '/animation',
    title: 'Animation',
    content: 'SpriteAnimationSet loads animation JSONs. AnimationPlayer manages state machine pattern for playing animations with update() and get_current_image().',
    section: 'Runtime'
  },
  {
    path: '/particles',
    title: 'Particles',
    content: 'ParticleSystem loads from particle_emitters in map data or manual ParticleSystemConfig. Supports various emission shapes and particle types.',
    section: 'Runtime'
  },
  {
    path: '/y-sort-guide',
    title: 'Y-Sort Guide',
    content: 'Y-sort enables painter algorithm for depth sorting. Layer-level: y_sort boolean and y_sort_origin pixel offset. Object-level: game sorts objects + player by y + y_sort_origin.',
    section: 'Guides'
  },
  {
    path: '/tmx-import',
    title: 'TMX Import',
    content: 'Parser supports Tiled .tmx files with CSV, Base64+zlib, Base64+gzip, and XML encoding. External TSX references, flip flags, and layer properties supported.',
    section: 'Guides'
  },
  {
    path: '/common-pitfalls',
    title: 'Common Pitfalls',
    content: 'DO use load_map(), get_shape_aabb(), match render_scale. DONT modify MapObject.x/y directly, assume tile-space equals pixel-space, or expect extra_objects to auto y-sort.',
    section: 'Guides'
  },
  {
    path: '/api-reference',
    title: 'API Reference',
    content: 'Complete API reference for all exported symbols including parser, runtime, and utils modules.',
    section: 'Reference'
  }
]

export function search(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  
  return SEARCH_INDEX.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.content.toLowerCase().includes(q) ||
    (item.section && item.section.toLowerCase().includes(q))
  ).slice(0, 10)
}
