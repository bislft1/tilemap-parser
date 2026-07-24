import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Collision() {
  return (
    <>
      <Seo 
        title="Collision Overview" 
        description="Tile collision with CollisionRunner and object-vs-object collision"
        path="/collision"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Collision Overview</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The collision system has two parts: tile-based collision via <code>CollisionRunner</code> 
        and object-vs-object collision via <code>ObjectCollisionManager</code>.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Tile collision</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Use <code>CollisionRunner</code> for entity movement with tile collision:
      </p>
      
      <CodeBlock code={`from tilemap_parser import CollisionRunner, MovementMode

runner = CollisionRunner(
    tile_size=(16, 16),
    mode=MovementMode.SLIDE,  # or PLATFORMER, RPG
    render_scale=2.0,
)`} />

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Movement modes</h3>
      
      <table style={{ width: '100%', marginBottom: 32, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #3f3f46', textAlign: 'left' }}>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Mode</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Use case</th>
          </tr>
        </thead>
        <tbody style={{ color: '#d4d4d8' }}>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>SLIDE</code></td>
            <td style={{ padding: 8 }}>Top-down, slide along walls</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>PLATFORMER</code></td>
            <td style={{ padding: 8 }}>Platformer with gravity, jumping, step-up</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>RPG</code></td>
            <td style={{ padding: 8 }}>Grid-snapping top-down</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Object collision</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        Use <code>ObjectCollisionManager</code> for entity-vs-entity collision:
      </p>
      
      <CodeBlock code={`from tilemap_parser import ObjectCollisionManager

manager = ObjectCollisionManager()
manager.add_object(my_object)

# Check collision against player
hits = manager.check_object(player)
for hit in hits:
    player.x -= hit.normal[0] * hit.depth
    player.y -= hit.normal[1] * hit.depth`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Setting up tile collision</h2>
      
      <CodeBlock code={`from tilemap_parser import load_tileset_collision

tileset_collision = load_tileset_collision("path/to/Atlas.collision.json")
tile_map = data.build_tile_map(use_gids=True)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/collision-runner" style={{ color: '#2563eb' }}>CollisionRunner</a> for detailed movement API.
        </p>
      </div>
    </>
  )
}
