import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function CommonPitfalls() {
  return (
    <>
      <Seo 
        title="Common Pitfalls" 
        description="DO's and DON'Ts for using tilemap-parser correctly"
        path="/common-pitfalls"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Common Pitfalls</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        Essential rules and patterns to avoid common mistakes.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>DO</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> use <code>load_map()</code> / <code>TilemapData.load()</code> to load maps — never construct manually</li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> use <code>get_shape_aabb()</code> for entity bounds — works for all shape types</li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> match <code>CollisionRunner.render_scale</code> to the map's <code>render_scale</code></li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> warm up the renderer cache: <code>renderer.warm_cache()</code> after construction</li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> pass the map's <code>render_scale</code> when constructing <code>CollisionRunner.from_game_type()</code></li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> use <code>ObjectCollisionManager.check_object()</code> for entity-vs-object collision</li>
        <li style={{ marginBottom: 8 }}><strong>DO</strong> check <code>skipped_tiles</code> in <code>LayerRenderStats</code> — non-zero means missing tileset surfaces</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>DON'T</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> modify <code>MapObject.x</code>/<code>MapObject.y</code> directly without collision resolution</li>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> create <code>MapObject</code> instances manually — always use <code>load_map_objects()</code></li>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> assume tile-space coordinates are pixel coordinates — <code>render_scale</code> multiplies everything</li>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> create <code>TileLayerRenderer</code> before <code>data.warm_cache()</code> is called</li>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> expect <code>extra_objects</code> to y-sort automatically — the renderer blits them in caller order</li>
        <li style={{ marginBottom: 8 }}><strong>DON'T</strong> rely on <code>rect_vs_tilemap</code> — it's declared in <code>__all__</code> but not implemented</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Correct AABB usage</h2>
      
      <CodeBlock code={`# ❌ WRONG — assumes rectangle, ignores offset
entity_rect = Rect(entity.x, entity.y, 32, 32)

# ✅ CORRECT — uses get_shape_aabb
from tilemap_parser import get_shape_aabb
left, top, right, bottom = get_shape_aabb(
    entity.x, 
    entity.y, 
    entity.collision_shape
)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Performance notes</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>The renderer uses <strong>chunk-based frustum culling</strong> (32×32 chunks)</li>
        <li style={{ marginBottom: 8 }}><strong>Variant caching</strong> — each (ttype, variant) pair is cached once</li>
        <li style={{ marginBottom: 8 }}><code>warm_cache()</code> pre-renders all variants and releases the reference to <code>data</code></li>
        <li style={{ marginBottom: 8 }}><strong>Object collision</strong> uses uniform-grid spatial broadphase</li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/api-reference" style={{ color: '#2563eb' }}>API Reference</a> for complete symbol documentation.
        </p>
      </div>
    </>
  )
}
