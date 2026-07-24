import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function MapLoading() {
  return (
    <>
      <Seo 
        title="Map Loading" 
        description="Load maps with load_map(). Returns TilemapData with parsed data, surfaces, and nodes."
        path="/map-loading"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Map Loading</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The <code>load_map()</code> function is the main entry point for loading Tiled maps.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Basic usage</h2>
      
      <CodeBlock code={`from tilemap_parser import load_map
from pathlib import Path

data = load_map("path/to/map.json", extra_search_base=Path("assets/"))`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>What load_map() does</h2>
      
      <ol style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>Calls <code>parse_map_file(path)</code> → <code>ParsedMap</code> (typed dataclasses)</li>
        <li style={{ marginBottom: 8 }}>Loads each tileset image via <code>pygame.image.load()</code></li>
        <li style={{ marginBottom: 8 }}>Searches for sidecar <code>&lt;map_stem&gt;.nodes.json</code> for node data</li>
        <li style={{ marginBottom: 8 }}>Normalizes <code>.ttype</code> fields from string paths to integer tileset indices</li>
        <li style={{ marginBottom: 8 }}>Returns a <code>TilemapData</code> instance</li>
      </ol>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>TilemapData properties</h2>
      
      <table style={{ width: '100%', marginBottom: 32, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #3f3f46', textAlign: 'left' }}>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Property</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Type</th>
            <th style={{ padding: 8, color: '#a1a1aa', fontWeight: 500 }}>Description</th>
          </tr>
        </thead>
        <tbody style={{ color: '#d4d4d8' }}>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>parsed</code></td>
            <td style={{ padding: 8 }}><code>ParsedMap</code></td>
            <td style={{ padding: 8 }}>Full parsed map (metadata, layers, tilesets)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>surfaces</code></td>
            <td style={{ padding: 8 }}><code>List[Surface]</code></td>
            <td style={{ padding: 8 }}>Loaded tileset surfaces, indexed parallel to tilesets</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>resolved_paths</code></td>
            <td style={{ padding: 8 }}><code>List[Path]</code></td>
            <td style={{ padding: 8 }}>Resolved file paths for each tileset</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>tile_size</code></td>
            <td style={{ padding: 8 }}><code>(int, int)</code></td>
            <td style={{ padding: 8 }}><code>(tile_width, tile_height)</code></td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>render_scale</code></td>
            <td style={{ padding: 8 }}><code>float</code></td>
            <td style={{ padding: 8 }}>Visual scale factor applied to all spatial data</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>area_nodes</code></td>
            <td style={{ padding: 8 }}><code>List[AreaNode]</code></td>
            <td style={{ padding: 8 }}>Parsed area zones for triggers/events</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #27272a' }}>
            <td style={{ padding: 8 }}><code>particle_emitters</code></td>
            <td style={{ padding: 8 }}><code>List[ParticleEmitterNode]</code></td>
            <td style={{ padding: 8 }}>Parsed particle emitters</td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #ef4444',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>DON'T:</strong> Manually construct <code>TilemapData</code> — always use <code>load_map()</code> or <code>TilemapData.load()</code>.
        </p>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Alternative: TilemapData.load()</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        If you already have a <code>ParsedMap</code>, you can use the class method directly:
      </p>
      
      <CodeBlock code={`from tilemap_parser import parse_map_file, TilemapData

parsed = parse_map_file("path/to/map.json")
data = TilemapData.load(parsed, base_path=Path("assets/"))`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/tile-rendering" style={{ color: '#2563eb' }}>Tile Rendering</a> for how to render the loaded map.
        </p>
      </div>
    </>
  )
}
