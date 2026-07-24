import Seo from '../components/Seo'

export default function ApiReference() {
  return (
    <>
      <Seo 
        title="API Reference" 
        description="Complete API reference for tilemap-parser exported symbols"
        path="/api-reference"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>API Reference</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        Complete reference for all exported symbols from <code>tilemap_parser</code>.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Parser module</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code>load_map()</code> — Load map from JSON/TMX file</li>
        <li style={{ marginBottom: 8 }}><code>parse_map_file()</code> — Parse map file to ParsedMap dataclass</li>
        <li style={{ marginBottom: 8 }}><code>ParsedMap</code> — Typed dataclass for parsed map data</li>
        <li style={{ marginBottom: 8 }}><code>TilemapData</code> — Runtime map data with loaded surfaces</li>
        <li style={{ marginBottom: 8 }}><code>load_tileset_collision()</code> — Load collision data from JSON</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Runtime module</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code>TileLayerRenderer</code> — Render tile layers with y-sort support</li>
        <li style={{ marginBottom: 8 }}><code>load_map_objects()</code> — Load MapObject instances from object layers</li>
        <li style={{ marginBottom: 8 }}><code>MapObject</code> — Object layer entity with collision data</li>
        <li style={{ marginBottom: 8 }}><code>CollisionRunner</code> — Entity movement with tile collision</li>
        <li style={{ marginBottom: 8 }}><code>MovementMode</code> — SLIDE, PLATFORMER, RPG modes</li>
        <li style={{ marginBottom: 8 }}><code>ObjectCollisionManager</code> — Object-vs-object collision</li>
        <li style={{ marginBottom: 8 }}><code>Camera</code> — Camera with follow, bounds, shake</li>
        <li style={{ marginBottom: 8 }}><code>SpriteAnimationSet</code> — Load animation data</li>
        <li style={{ marginBottom: 8 }}><code>AnimationPlayer</code> — Play animations with state machine</li>
        <li style={{ marginBottom: 8 }}><code>ParticleSystem</code> — Particle system renderer</li>
        <li style={{ marginBottom: 8 }}><code>ParticleSystemConfig</code> — Manual particle configuration</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Utils module</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code>get_shape_aabb()</code> — Get world-space AABB for any collision shape</li>
        <li style={{ marginBottom: 8 }}><code>check_collision()</code> — Low-level shape-vs-shape collision</li>
        <li style={{ marginBottom: 8 }}><code>ICollidable</code> — Protocol for collision participants</li>
        <li style={{ marginBottom: 8 }}><code>ICollidableObject</code> — Protocol with layer/mask support</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Collision shapes</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><code>RectangleShape</code></li>
        <li style={{ marginBottom: 8 }}><code>CircleShape</code></li>
        <li style={{ marginBottom: 8 }}><code>CapsuleShape</code></li>
        <li style={{ marginBottom: 8 }}><code>CollisionPolygon</code></li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          For detailed usage examples, see the individual guide pages linked in the sidebar.
        </p>
      </div>
    </>
  )
}
