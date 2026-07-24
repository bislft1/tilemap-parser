import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Installation() {
  return (
    <>
      <Seo 
        title="Installation" 
        description="Install tilemap-parser via pip. Requires Python 3.8+ and pygame."
        path="/installation"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Installation</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        Install tilemap-parser from PyPI. Requires Python 3.8 or higher.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Requirements</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}>Python 3.8+</li>
        <li style={{ marginBottom: 8 }}>pygame 2.x</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Install from PyPI</h2>
      
      <CodeBlock code={`pip install tilemap-parser`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Verify installation</h2>
      
      <CodeBlock code={`python -c "from tilemap_parser import load_map; print('OK')"`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Development installation</h2>
      
      <p style={{ marginBottom: 16, color: '#d4d4d8' }}>
        To install from source for development:
      </p>
      
      <CodeBlock code={`git clone https://github.com/pyrobros/tilemap-parser.git
cd tilemap-parser
pip install -e .`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> Continue to <a href="#/quickstart" style={{ color: '#2563eb' }}>Quick Start</a> for a minimal working example.
        </p>
      </div>
    </>
  )
}
