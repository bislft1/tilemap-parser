import { getNavItemsBySection } from '../lib/nav-config'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

export default function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const sections = getNavItemsBySection()

  return (
    <nav style={{ width: 256, flexShrink: 0 }}>
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: '1px solid #27272a',
        marginBottom: 16
      }}>
        <a href="/" style={{ 
          fontSize: 18, 
          fontWeight: 600, 
          color: '#e4e4e7',
          textDecoration: 'none'
        }}>
          tilemap-parser
        </a>
        <div style={{ fontSize: 12, color: '#71717a', marginTop: 4 }}>
          Documentation
        </div>
      </div>
      
      <div style={{ padding: '0 12px' }}>
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName} style={{ marginBottom: 24 }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: '#71717a', 
              textTransform: 'uppercase',
              letterSpacing: 0.05,
              padding: '0 8px',
              marginBottom: 8
            }}>
              {sectionName}
            </div>
            <ul style={{ listStyle: 'none' }}>
              {items.map(item => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={e => {
                      e.preventDefault()
                      onNavigate(item.path)
                    }}
                    style={{
                      display: 'block',
                      padding: '6px 8px',
                      borderRadius: 4,
                      color: currentPath === item.path ? '#e4e4e7' : '#a1a1aa',
                      backgroundColor: currentPath === item.path ? '#27272a' : 'transparent',
                      textDecoration: 'none',
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
