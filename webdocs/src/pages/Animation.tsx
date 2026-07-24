import Seo from '../components/Seo'
import CodeBlock from '../components/CodeBlock'

export default function Animation() {
  return (
    <>
      <Seo 
        title="Animation" 
        description="SpriteAnimationSet and AnimationPlayer for sprite animation"
        path="/animation"
      />
      
      <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>Animation</h1>
      
      <p style={{ fontSize: 16, color: '#a1a1aa', marginBottom: 32 }}>
        The animation system uses <code>SpriteAnimationSet</code> and <code>AnimationPlayer</code> 
        with a state machine pattern.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Loading animations</h2>
      
      <CodeBlock code={`from tilemap_parser import SpriteAnimationSet, AnimationPlayer

anim_set = SpriteAnimationSet.load("path/to/player.anim.json")
player_anim = AnimationPlayer(anim_set, "idle")`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>Update and render</h2>
      
      <CodeBlock code={`# In game loop
player_anim.update(dt_ms)
frame = player_anim.get_current_image()
screen.blit(frame, position)`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 48, marginBottom: 16 }}>State machine pattern</h2>
      
      <CodeBlock code={`class Player:
    def __init__(self):
        self.anim_set = SpriteAnimationSet.load("player.anim.json")
        self.anims = {
            "idle": AnimationPlayer(self.anim_set, "idle"),
            "walk": AnimationPlayer(self.anim_set, "walk"),
            "jump": AnimationPlayer(self.anim_set, "jump"),
        }
        self.current_state = "idle"

    def set_state(self, state):
        if state != self.current_state:
            self.anims[state].reset()
            self.current_state = state

    def update(self, dt_ms):
        self.anims[self.current_state].update(dt_ms)

    def render(self, screen, position):
        frame = self.anims[self.current_state].get_current_image()
        if frame:
            screen.blit(frame, position)`} />

      <div style={{ 
        background: '#27272a', 
        borderLeft: '3px solid #2563eb',
        padding: '16px 20px',
        margin: '32px 0',
        borderRadius: '0 6px 6px 0'
      }}>
        <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
          <strong>Next:</strong> See <a href="#/particles" style={{ color: '#2563eb' }}>Particles</a> for particle system.
        </p>
      </div>
    </>
  )
}
