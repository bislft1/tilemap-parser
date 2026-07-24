import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Particles() {
  return (
    <>
      <Seo 
        title="Particles" 
        description="ParticleSystem for particle effects from map emitters or manual configs"
        path="/particles"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Particles</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The particle system supports loading from map-defined emitters or manual configuration.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Loading from map nodes</h2>
      
      <CodeBlock code={`for emitter_node in data.particle_emitters:
    system = ParticleSystem(emitter_node.config)
    system.update(dt, *emitter_node.rect)
    system.draw(screen, *camera.offset, zoom=1.0)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Manual usage</h2>
      
      <CodeBlock code={`from tilemap_parser import ParticleSystem, ParticleSystemConfig

config = ParticleSystemConfig(
    name="smoke",
    emission_shape="point",
    particle_shape="circle",
    lifetime=1.0,
    speed=50.0,
)

system = ParticleSystem(config)
system.emit_burst(count=10, x=100, y=100, w=0, h=0)
system.update(dt, area_x, area_y, area_w, area_h)
system.draw(screen, offset_x, offset_y, zoom)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/y-sort-guide" style={{ color: '#2563eb' }}>Y-Sort Guide</a> for depth sorting.
        </p>
      </div>
    </>
  )
}
