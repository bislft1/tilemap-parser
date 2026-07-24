import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function ObjectLayers() {
  return (
    <>
      <Seo 
        title="Object Layers" 
        description="Load MapObject instances from object layers with collision data"
        path="/object-layers"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Object Layers</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        Object layers contain entities like NPCs, items, and triggers. Use <code>load_map_objects()</code> to load them.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Loading objects</h2>
      
      <CodeBlock code={`from tilemap_parser import load_map_objects

objects = load_map_objects(data, "path/to/collision/")`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>MapObject fields</h2>
      
      <table style={{ width: '100%', marginBottom: 32, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #3f3f46', textAlign: 'left' }}>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Field</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Type</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Description</th>
          </tr>
        </thead>
        <tbody style={{ color: '#d4d4d8' }}>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>x</code></td>
            <td style={{ padding: 8 }}><code>float</code></td>
            <td style={{ padding: 8 }}>World X (pre-scaled by render_scale)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>y</code></td>
            <td style={{ padding: 8 }}><code>float</code></td>
            <td style={{ padding: 8 }}>World Y (pre-scaled by render_scale)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>surface</code></td>
            <td style={{ padding: 8 }}><code>Surface</code></td>
            <td style={{ padding: 8 }}>Rendered sprite (pre-scaled)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>collision_shape</code></td>
            <td style={{ padding: 8 }}><code>CollisionPolygon</code></td>
            <td style={{ padding: 8 }}>Primary collision shape</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>collision_shapes</code></td>
            <td style={{ padding: 8 }}><code>List[CollisionPolygon]</code></td>
            <td style={{ padding: 8 }}>All shapes for multi-shape regions</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>collision_layer</code></td>
            <td style={{ padding: 8 }}><code>int</code></td>
            <td style={{ padding: 8 }}>Physics layer bitmask</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>collision_mask</code></td>
            <td style={{ padding: 8 }}><code>int</code></td>
            <td style={{ padding: 8 }}>Physics mask bitmask</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>y_sort_origin</code></td>
            <td style={{ padding: 8 }}><code>Optional[int]</code></td>
            <td style={{ padding: 8 }}>Y-sort offset (default None = use surface height)</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Y-Sort origin for objects</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        In game code, objects are typically y-sorted against the player:
      </p>
      
      <CodeBlock code={`sort_y = obj.y + (obj.y_sort_origin if obj.y_sort_origin is not None else obj.surface.get_height())`} language="python" />

      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><strong>Default</strong> (<code>y_sort_origin = None</code>): sort by bottom of sprite</li>
        <li style={{ marginBottom: 8 }}><strong>Set to <code>height // 2</code></strong>: sort by center (useful for tall buildings)</li>
        <li style={{ marginBottom: 8 }}><strong>Set to 0</strong>: sort by top of sprite</li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #ef4444',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Important:</strong> <code>load_map_objects()</code> skips objects that have no matching 
          <code>&lt;tileset&gt;.object_collision.json</code> file or whose region has no collision shapes.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Rendering objects</h2>
      
      <CodeBlock code={`for obj in objects:
    screen.blit(obj.surface, (obj.x - camera_x, obj.y - camera_y))`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/collision" style={{ color: '#2563eb' }}>Collision Overview</a> for handling collisions between objects.
        </p>
      </div>
    </>
  )
}
