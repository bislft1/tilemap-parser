import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function QuickStart() {
  return (
    <>
      <Seo 
        title="Quick Start" 
        description="Minimal working example loading a map and rendering tiles with Pygame"
        path="/quickstart"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Quick Start</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        A minimal working example that loads a map and renders tiles to the screen.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Complete example</h2>
      
      <CodeBlock code={`from tilemap_parser import load_map, TileLayerRenderer
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# Load the map
data = load_map("path/to/map.json")

# Create and warm up the renderer
renderer = TileLayerRenderer(data)
renderer.warm_cache()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    screen.fill((0, 0, 0))
    
    # Render all visible tiles
    stats = renderer.render(screen, camera_offset=(0, 0))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Step by step</h2>
      
      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>1. Load the map</h3>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Use <code>load_map()</code> to parse the map file and load all tileset images:
      </p>
      
      <CodeBlock code={`from tilemap_parser import load_map

data = load_map("path/to/map.json")`} />
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        This returns a <code>TilemapData</code> instance containing parsed data, loaded surfaces, and resolved paths.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>2. Create the renderer</h3>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Create a <code>TileLayerRenderer</code> and call <code>warm_cache()</code> to pre-render tile variants:
      </p>
      
      <CodeBlock code={`from tilemap_parser import TileLayerRenderer

renderer = TileLayerRenderer(data)
renderer.warm_cache()  # Pre-renders all tile variants`} />

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>3. Render in the game loop</h3>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Call <code>render()</code> each frame with the camera offset:
      </p>
      
      <CodeBlock code={`stats = renderer.render(screen, camera_offset=(0, 0))

# stats contains:
# - drawn_tiles: number of tiles rendered this frame
# - skipped_tiles: tiles outside viewport or missing surfaces
# - visible_layers: number of layers that had visible tiles`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Adding a camera</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        For proper scrolling, use the <code>Camera</code> class:
      </p>
      
      <CodeBlock code={`from tilemap_parser import Camera

camera = Camera(viewport_width=800, viewport_height=600)
camera.follow(player)
camera.update(dt)

# In render call:
renderer.render(screen, camera.offset)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> Learn about <a href="#/map-loading" style={{ color: '#2563eb' }}>Map Loading</a> in detail, 
          or see <a href="#/tile-rendering" style={{ color: '#2563eb' }}>Tile Rendering</a> for y-sort and animated tiles.
        </p>
      </div>
    </>
  )
}
