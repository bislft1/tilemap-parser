import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function TmxImport() {
  return (
    <>
      <Seo 
        title="TMX Import" 
        description="Tiled TMX file support with CSV, Base64, and XML encoding"
        path="/tmx-import"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>TMX Import</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The parser supports Tiled <code>.tmx</code> files with various encodings.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Usage</h2>
      
      <CodeBlock code={`from tilemap_parser import parse_map_file

parsed = parse_map_file("map.tmx")  # auto-detects .tmx extension`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Supported features</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>CSV, Base64+zlib, Base64+gzip, and XML tile encoding</li>
        <li style={{ marginBottom: 8 }}>External TSX tileset references</li>
        <li style={{ marginBottom: 8 }}>Flip flags (horizontal, vertical, diagonal)</li>
        <li style={{ marginBottom: 8 }}>Layer properties and tile properties</li>
        <li style={{ marginBottom: 8 }}><code>tilecount</code> auto-calculation from image dimensions when not specified</li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/common-pitfalls" style={{ color: '#2563eb' }}>Common Pitfalls</a> for DO's and DON'Ts.
        </p>
      </div>
    </>
  )
}
