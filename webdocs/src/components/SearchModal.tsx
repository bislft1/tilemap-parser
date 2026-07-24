import { useState, useEffect } from 'react'
import { search } from '../lib/search-index'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(search(query))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    setResults(search(query))
  }, [query])

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#27272a',
          borderRadius: 8,
          width: '100%',
          maxWidth: 560,
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: 16, borderBottom: '1px solid #3f3f46' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documentation..."
            autoFocus
            style={{
              width: '100%',
              background: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: 6,
              padding: '10px 12px',
              color: '#e4e4e7',
              fontSize: 16,
              outline: 'none',
            }}
          />
        </div>
        
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {results.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#71717a' }}>
              {query ? 'No results found' : 'Type to search...'}
            </div>
          ) : (
            results.map(result => (
              <a
                key={result.path}
                href={result.path}
                onClick={onClose}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderBottom: '1px solid #27272a',
                  color: '#e4e4e7',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{result.title}</div>
                <div style={{ fontSize: 13, color: '#a1a1aa' }}>
                  {result.content.slice(0, 120)}{result.content.length > 120 ? '...' : ''}
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
