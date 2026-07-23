interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({
  code,
  language = "python",
  title,
}: CodeBlockProps) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-[#18181b] border border-zinc-800">
      {title && (
        <div className="flex items-center px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
          <span className="text-xs text-zinc-500 font-medium">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-zinc-300">{code}</code>
      </pre>
    </div>
  );
}
