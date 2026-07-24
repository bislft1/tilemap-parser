export interface NavItem {
  path: string
  label: string
  section?: string
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Introduction', section: 'Getting Started' },
  { path: '/installation', label: 'Installation', section: 'Getting Started' },
  { path: '/quickstart', label: 'Quick Start', section: 'Getting Started' },
  
  { path: '/map-loading', label: 'Map Loading', section: 'Core Concepts' },
  { path: '/tile-rendering', label: 'Tile Rendering', section: 'Core Concepts' },
  { path: '/object-layers', label: 'Object Layers', section: 'Core Concepts' },
  
  { path: '/collision', label: 'Collision Overview', section: 'Collision' },
  { path: '/collision-runner', label: 'CollisionRunner', section: 'Collision' },
  
  { path: '/camera', label: 'Camera', section: 'Runtime' },
  { path: '/animation', label: 'Animation', section: 'Runtime' },
  { path: '/particles', label: 'Particles', section: 'Runtime' },
  
  { path: '/y-sort-guide', label: 'Y-Sort Guide', section: 'Guides' },
  { path: '/tmx-import', label: 'TMX Import', section: 'Guides' },
  { path: '/common-pitfalls', label: 'Common Pitfalls', section: 'Guides' },
  
  { path: '/api-reference', label: 'API Reference', section: 'Reference' },
]

export function getNavItemsBySection(): Record<string, NavItem[]> {
  const result: Record<string, NavItem[]> = {}
  for (const item of NAV_ITEMS) {
    const section = item.section || 'Other'
    if (!result[section]) {
      result[section] = []
    }
    result[section].push(item)
  }
  return result
}
