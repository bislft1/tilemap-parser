import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Camera() {
  return (
    <>
      <Seo 
        title="Camera" 
        description="Camera with follow, bounds, shake, and deadzone modes"
        path="/camera"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Camera</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The <code>Camera</code> class provides smooth following, bounds clamping, and screen shake.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Basic usage</h2>
      
      <CodeBlock code={`from tilemap_parser import Camera

camera = Camera(
    viewport_width=800,
    viewport_height=600,
    mode="centered",  # or "deadzone"
)

camera.follow(player)
camera.update(dt)

# Use camera.offset for rendering
renderer.render(screen, camera.offset)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Features</h2>
      
      <ul style={{ marginBottom: 32, paddingLeft: 20, color: '#d4d4d8' }}>
        <li style={{ marginBottom: 8 }}><strong>Modes:</strong> <code>"centered"</code> (always center on target) or <code>"deadzone"</code> (move only when target leaves dead zone)</li>
        <li style={{ marginBottom: 8 }}><strong>Lerp smoothing:</strong> <code>camera.lerp_speed = 4.0</code></li>
        <li style={{ marginBottom: 8 }}><strong>Bounds clamping:</strong> <code>camera.bounds = Rect(0, 0, map_w, map_h)</code></li>
        <li style={{ marginBottom: 8 }}><strong>Screen shake:</strong> <code>camera.shake(duration=0.5, intensity=5.0)</code></li>
      </ul>

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/animation" style={{ color: '#2563eb' }}>Animation</a> for sprite animation system.
        </p>
      </div>
    </>
  )
}
