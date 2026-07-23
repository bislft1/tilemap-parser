import { CodeBlock } from "../components/CodeBlock";

export function QuickStart() {
  return (
    <div id="main-content" className="space-y-12">
      <section>
        <h1 className="text-4xl font-semibold text-zinc-100 mb-4">
          Quick Start
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl">
          Load your first tilemap and render it in under 5 minutes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Prerequisites
        </h2>
        <p className="text-zinc-400 mb-4">
          Before starting, ensure you have:
        </p>
        <ul className="space-y-2 text-zinc-400">
          <li>• Python 3.10+ installed</li>
          <li>• pygame-ce installed (<code className="text-zinc-200">pip install pygame-ce</code>)</li>
          <li>• A tilemap-editor export (map.json) with associated tileset images</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Load a Map
        </h2>
        <p className="text-zinc-400 mb-4">
          Use <code className="text-zinc-200">load_map()</code> to parse your map JSON and load all tileset images:
        </p>
        <CodeBlock
          code={`from tilemap_parser import load_map

data = load_map("path/to/map.json", extra_search_base="assets/")`}
          language="python"
        />
        <p className="text-zinc-400 mt-4">
          The <code className="text-zinc-200">extra_search_base</code> parameter tells the loader where to find tileset images relative to the map file.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Create a Renderer
        </h2>
        <p className="text-zinc-400 mb-4">
          Initialize a <code className="text-zinc-200">TileLayerRenderer</code> with your loaded map data:
        </p>
        <CodeBlock
          code={`from tilemap_parser import TileLayerRenderer

renderer = TileLayerRenderer(data)
renderer.warm_cache()  # Pre-load tiles for smoother rendering`}
          language="python"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Render Loop
        </h2>
        <p className="text-zinc-400 mb-4">
          In your game loop, render visible tiles each frame:
        </p>
        <CodeBlock
          code={`import pygame
from tilemap_parser import Camera

# Setup
screen = pygame.display.set_mode((800, 600))
camera = Camera(viewport_width=800, viewport_height=600)

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Update camera to follow player
    camera.follow(player)
    camera.update(dt)
    
    # Render
    screen.fill((0, 0, 0))
    renderer.render(screen, camera.offset)
    pygame.display.flip()`}
          language="python"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Next Steps
        </h2>
        <ul className="space-y-2 text-zinc-400">
          <li>
            <a href="/collision" className="text-blue-600 hover:text-blue-500">
              Collision Guide
            </a> — Add tile-based collision detection and response
          </li>
          <li>
            <a href="/examples/full-game" className="text-blue-600 hover:text-blue-500">
              Full Demo
            </a> — See a complete working example with all features
          </li>
          <li>
            <a href="/api" className="text-blue-600 hover:text-blue-500">
              API Reference
            </a> — Explore all available classes and methods
          </li>
        </ul>
      </section>
    </div>
  );
}
