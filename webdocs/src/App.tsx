import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import Sidebar from './components/Sidebar'
import SearchModal from './components/SearchModal'
import Home from './pages/Home'
import Installation from './pages/Installation'
import QuickStart from './pages/QuickStart'
import MapLoading from './pages/MapLoading'
import TileRendering from './pages/TileRendering'
import ObjectLayers from './pages/ObjectLayers'
import Collision from './pages/Collision'
import CollisionRunner from './pages/CollisionRunner'
import Camera from './pages/Camera'
import Animation from './pages/Animation'
import Particles from './pages/Particles'
import YSortGuide from './pages/YSortGuide'
import TmxImport from './pages/TmxImport'
import CommonPitfalls from './pages/CommonPitfalls'
import ApiReference from './pages/ApiReference'

const PAGES: Record<string, ComponentType<any>> = {
  '/': Home,
  '/installation': Installation,
  '/quickstart': QuickStart,
  '/map-loading': MapLoading,
  '/tile-rendering': TileRendering,
  '/object-layers': ObjectLayers,
  '/collision': Collision,
  '/collision-runner': CollisionRunner,
  '/camera': Camera,
  '/animation': Animation,
  '/particles': Particles,
  '/y-sort-guide': YSortGuide,
  '/tmx-import': TmxImport,
  '/common-pitfalls': CommonPitfalls,
  '/api-reference': ApiReference,
}

export default function App() {
  const [currentPath, setCurrentPath] = useState('/')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1) || '/'
    if (PAGES[hash]) {
      setCurrentPath(hash)
    }
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/'
      if (PAGES[hash]) {
        setCurrentPath(hash)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const CurrentPage = PAGES[currentPath] || Home

  return (
    <>
      <div style={{
        display: 'flex',
        minHeight: '100vh',
      }}>
        <Sidebar 
          currentPath={currentPath} 
          onNavigate={path => {
            window.location.hash = path
            setCurrentPath(path)
          }} 
        />
        
        <main 
          id="main-content"
          style={{
            flex: 1,
            maxWidth: 896,
            padding: '48px 64px',
          }}
        >
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '10px 12px',
              background: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: 6,
              color: '#71717a',
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 32,
              textAlign: 'left',
            }}
          >
            <span>Search documentation...</span>
            <span style={{ marginLeft: 'auto', fontSize: 12 }}>⌘K</span>
          </button>
          
          <article>
            <CurrentPage />
          </article>
          
          <footer style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid #27272a',
            fontSize: 13,
            color: '#71717a',
          }}>
            <p>tilemap-parser documentation. Built for clarity.</p>
          </footer>
        </main>
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  )
}
