import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function YSortGuide() {
  return (
    <>
      <Seo 
        title="Y-Sort Guide" 
        description="Complete guide to y-sort for tiles and objects with player integration"
        path="/y-sort-guide"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Y-Sort Guide</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        Y-sort enables the painter's algorithm for depth sorting. This guide covers both 
        layer-level and object-level y-sorting.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Layer-level y-sort</h2>
      
      <table style={{ width: '100%', marginBottom: 32, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #3f3f46', textAlign: 'left' }}>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Field</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Type</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Default</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Description</th>
          </tr>
        </thead>
        <tbody style={{ color: '#d4d4d8' }}>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>y_sort</code></td>
            <td style={{ padding: 8 }}><code>bool</code></td>
            <td style={{ padding: 8 }}><code>false</code></td>
            <td style={{ padding: 8 }}>Enable y-sort for this layer</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>y_sort_origin</code></td>
            <td style={{ padding: 8 }}><code>int</code></td>
            <td style={{ padding: 8 }}><code>0</code></td>
            <td style={{ padding: 8 }}>Pixel offset from tile top for sort point</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>JSON example</h3>
      
      <CodeBlock code={`{
  "name": "buildings",
  "type": "tile",
  "y_sort": true,
  "y_sort_origin": 16
}`} language="json" />

      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        When <code>y_sort=True</code>, each chunk's tiles are rendered in ascending Y order 
        (bottom-most renders last/on-top). The <code>y_sort_origin</code> shifts the comparison point:
      </p>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>Default <code>0</code>: sorts by tile top</li>
        <li style={{ marginBottom: 8 }}><code>tile_height</code>: sorts by tile bottom</li>
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
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Object-level y-sort</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        The renderer does NOT sort objects — the game is responsible. Recommended sort key:
      </p>
      
      <CodeBlock code={`def obj_sort_y(obj):
    origin = obj.y_sort_origin if obj.y_sort_origin is not None else int(obj.surface.get_height())
    return obj.y + origin`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Player integration pattern</h2>
      
      <CodeBlock code={`# 1. Render tiles
renderer.render(screen, camera.offset)

# 2. Y-sort objects + player together
items = []
for obj in game_objects:
    sort_y = obj.y + (obj.y_sort_origin or obj.surface.get_height())
    items.append((sort_y, "object", obj))

player_sort_y = get_shape_aabb(player.x, player.y, player.collision_shape)[3]
items.append((player_sort_y, "player", player))

items.sort(key=lambda e: e[0])

# 3. Render in sorted order
for _, kind, data in items:
    if kind == "object":
        screen.blit(data.surface, (data.x - cam_x, data.y - cam_y))
    else:
        data.render(screen, (cam_x, cam_y))`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/tmx-import" style={{ color: '#2563eb' }}>TMX Import</a> for Tiled compatibility.
        </p>
      </div>
    </>
  )
}
