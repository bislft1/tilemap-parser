import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function CollisionRunner() {
  return (
    <>
      <Seo 
        title="CollisionRunner" 
        description="Entity movement with tile collision in SLIDE, PLATFORMER, and RPG modes"
        path="/collision-runner"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>CollisionRunner</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        <code>CollisionRunner</code> handles entity movement with tile collision for different game types.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Setup</h2>
      
      <CodeBlock code={`from tilemap_parser import CollisionRunner, MovementMode

runner = CollisionRunner(
    tile_size=(16, 16),
    mode=MovementMode.SLIDE,
    render_scale=2.0,  # Must match the map's render_scale
)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>RPG mode</h2>
      
      <CodeBlock code={`# Grid-snapping movement
result = runner.move_rpg(
    entity,
    tileset_collision,
    tile_map,
    dx=1,  # grid units
    dy=0,
)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Slide mode</h2>
      
      <CodeBlock code={`# Top-down sliding movement
result = runner.move_and_slide(
    entity,
    tileset_collision,
    tile_map,
    dx=3.0,  # pixels per frame
    dy=0,
)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Platformer mode</h2>
      
      <CodeBlock code={`# Platformer with gravity and jumping
result = runner.move_platformer(
    entity,
    tileset_collision,
    tile_map,
    dt=1/60,
    input_x=1.0,
    jump_pressed=False,
)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/camera" style={{ color: '#2563eb' }}>Camera</a> for following entities.
        </p>
      </div>
    </>
  )
}
