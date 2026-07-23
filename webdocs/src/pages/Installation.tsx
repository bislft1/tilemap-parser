import { CodeBlock } from "../components/CodeBlock";

export function Installation() {
  return (
    <div id="main-content" className="space-y-12">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-semibold text-zinc-100 mb-4">
          Installation
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl">
          Install tilemap-parser from PyPI to load tilemap-editor exports in your Python game project.
        </p>
      </section>

      {/* Quick Install */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Quick Install
        </h2>
        <p className="text-zinc-400 mb-4">Install via pip:</p>
        <CodeBlock
          code="pip install tilemap-parser"
          language="bash"
        />
      </section>

      {/* Requirements */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Requirements
        </h2>
        <ul className="space-y-3 text-zinc-400">
          <li><strong className="text-zinc-200">Python 3.10+</strong> — type hints and modern syntax</li>
          <li><strong className="text-zinc-200">pygame-ce 2.5+</strong> — community edition with enhanced features</li>
        </ul>
      </section>

      {/* Installation Methods */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Installation Methods
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium text-zinc-200 mb-3">From PyPI</h3>
            <p className="text-zinc-400 mb-4">
              The standard installation method:
            </p>
            <CodeBlock code="pip install tilemap-parser" language="bash" />
          </div>

          <div>
            <h3 className="text-xl font-medium text-zinc-200 mb-3">With Dependencies</h3>
            <p className="text-zinc-400 mb-4">
              Install both tilemap-parser and pygame-ce:
            </p>
            <CodeBlock
              code="pip install tilemap-parser pygame-ce>=2.5"
              language="bash"
            />
          </div>

          <div>
            <h3 className="text-xl font-medium text-zinc-200 mb-3">Development Installation</h3>
            <p className="text-zinc-400 mb-4">
              For contributing or development, install from source:
            </p>
            <CodeBlock
              code={`git clone https://github.com/FluffyBrudy/tilemap-parser.git
cd tilemap-parser
pip install -e .
pip install -e ".[dev]"`}
              language="bash"
            />
          </div>
        </div>
      </section>

      {/* Verify Installation */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Verify Installation
        </h2>
        <p className="text-zinc-400 mb-4">
          Test your installation:
        </p>
        <CodeBlock
          code={`import tilemap_parser

# Check version
print(tilemap_parser.__version__)

# Try importing main components
from tilemap_parser import load_map, SpriteAnimationSet, CollisionRunner
print("Installation successful!")`}
          language="python"
        />
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Next Steps
        </h2>
        <ul className="space-y-2 text-zinc-400">
          <li>
            <a href="/quickstart" className="text-blue-600 hover:text-blue-500">
              Quick Start
            </a> — Load your first map in 5 minutes
          </li>
          <li>
            <a href="/examples/full-game" className="text-blue-600 hover:text-blue-500">
              Examples
            </a> — Run focused examples or a complete demo
          </li>
          <li>
            <a href="/api" className="text-blue-600 hover:text-blue-500">
              API Reference
            </a> — Detailed documentation for all public classes and functions
          </li>
        </ul>
      </section>
    </div>
  );
}
