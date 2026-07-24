interface CodeBlockProps {
  code: string
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre style={{
      background: '#18181b',
      padding: '1rem',
      borderRadius: 6,
      overflowX: 'auto',
      margin: '1rem 0',
      border: '1px solid #27272a',
    }}>
      <code style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        lineHeight: 1.6,
        color: '#e4e4e7',
      }}>
        {code.trim()}
      </code>
    </pre>
  )
}
