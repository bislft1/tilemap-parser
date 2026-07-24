import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Home() {
  return (
    <>
      <Seo 
        title="Introduction" 
        description="tilemap-parser is a Python library for parsing Tiled maps and rendering tilemaps with Pygame"
        path="/"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>tilemap-parser</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        A Python library for parsing Tiled maps and rendering tilemaps with Pygame. 
        Provides typed dataclasses, runtime rendering, collision systems, animation, particles, and more.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>What it does</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><strong>Parse</strong> Tiled JSON/TMX files into typed dataclasses</li>
        <li style={{ marginBottom: 8 }}><strong>Load</strong> tileset images and resolve paths automatically</li>
        <li style={{ marginBottom: 8 }}><strong>Render</strong> tiles with y-sort support and animated tiles</li>
        <li style={{ marginBottom: 8 }}><strong>Handle collision</strong> with tile-based and object-vs-object systems</li>
        <li style={{ marginBottom: 8 }}><strong>Support cameras</strong> with follow, bounds, shake, and deadzone modes</li>
        <li style={{ marginBottom: 8 }}><strong>Play animations</strong> via state machine pattern</li>
        <li style={{ marginBottom: 8 }}><strong>Render particles</strong> from map-defined emitters or manual configs</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Minimal example</h2>
      
      <CodeBlock code={`from tilemap_parser import load_map, TileLayerRenderer
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))

# Load map
data = load_map("path/to/map.json")

# Create renderer
renderer = TileLayerRenderer(data)
renderer.warm_cache()

clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    screen.fill((0, 0, 0))
    
    # Render tiles
    renderer.render(screen, camera_offset=(0, 0))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Architecture</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        The library is organized into three main modules:
      </p>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code style={{ color: '#2563eb' }}>parser/</code> — Parsing JSON/TMX into typed dataclasses</li>
        <li style={{ marginBottom: 8 }}><code style={{ color: '#2563eb' }}>runtime/</code> — Runtime classes for rendering, collision, camera, animation (advanced use)</li>
        <li style={{ marginBottom: 8 }}><code style={{ color: '#2563eb' }}>utils/</code> — Pure collision math functions (advanced use)</li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Note:</strong> The <code>runtime/</code> and <code>utils/</code> modules are for advanced use cases. 
          Most users only need <code>load_map()</code>, <code>TileLayerRenderer</code>, and <code>CollisionRunner</code>.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Data flow</h2>
      
      <CodeBlock code={`map.json → parse_map_file() → ParsedMap (typed dataclasses)
                            ↓
                 TilemapData.load() loads images, resolves paths
                            ↓
                 TileLayerRenderer (renders tiles)
                 load_map_objects() (loads objects)
                 CollisionRunner (movement & collision)`} language="text" />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Next steps</h2>
      
      <p style={{ color: '#d4d4d8' }}>
        Continue to <a href="#/installation" style={{ color: '#2563eb' }}>Installation</a> to get started, 
        or jump to <a href="#/quickstart" style={{ color: '#2563eb' }}>Quick Start</a> for a minimal working example.
      </p>
    </>
  )
}
