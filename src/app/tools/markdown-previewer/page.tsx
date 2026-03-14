"use client";

import { useState } from "react";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Previewer

This is a **live preview** of your markdown content.

## Features
- Real-time preview
- Supports common markdown syntax
- Copy rendered HTML

### Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

- Unordered item
- Another item

### Links and Images
[Visit GitHub](https://github.com)

### Blockquote
> This is a blockquote. It can span multiple lines and is great for highlighting important information.

### Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

---

*Italic text* and **bold text** and ***bold italic***
`);

  const parseMarkdown = (text: string): string => {
    let html = text;

    // Escape HTML
    html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>'
    );

    // Inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-slate-100 text-teal-700 px-1.5 py-0.5 rounded text-sm">$1</code>'
    );

    // Headers
    html = html.replace(
      /^### (.*$)/gm,
      '<h3 class="text-xl font-bold text-slate-800 mt-6 mb-3">$1</h3>'
    );
    html = html.replace(
      /^## (.*$)/gm,
      '<h2 class="text-2xl font-bold text-slate-800 mt-8 mb-4">$1</h2>'
    );
    html = html.replace(
      /^# (.*$)/gm,
      '<h1 class="text-3xl font-bold text-teal-700 mt-8 mb-4">$1</h1>'
    );

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Blockquotes
    html = html.replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-teal-500 pl-4 py-2 my-4 bg-teal-50 text-slate-700 italic">$1</blockquote>'
    );

    // Horizontal rule
    html = html.replace(
      /^---$/gm,
      '<hr class="border-t-2 border-slate-200 my-6" />'
    );

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content.split("|").map((cell: string) => cell.trim());
      if (cells.every((cell: string) => /^[-:]+$/.test(cell))) {
        return "";
      }
      const cellsHtml = cells
        .map((cell: string) => `<td class="border border-slate-200 px-4 py-2">${cell}</td>`)
        .join("");
      return `<tr>${cellsHtml}</tr>`;
    });
    html = html.replace(
      /(<tr>[\s\S]*?<\/tr>)+/g,
      '<table class="w-full border-collapse border border-slate-200 my-4">$&</table>'
    );

    // Unordered lists
    html = html.replace(
      /^- (.*$)/gm,
      '<li class="ml-6 list-disc text-slate-700">$1</li>'
    );

    // Ordered lists
    html = html.replace(
      /^\d+\. (.*$)/gm,
      '<li class="ml-6 list-decimal text-slate-700">$1</li>'
    );

    // Wrap consecutive list items
    html = html.replace(
      /(<li class="ml-6 list-disc[^>]*>.*<\/li>\n?)+/g,
      '<ul class="my-4">$&</ul>'
    );
    html = html.replace(
      /(<li class="ml-6 list-decimal[^>]*>.*<\/li>\n?)+/g,
      '<ol class="my-4">$&</ol>'
    );

    // Paragraphs
    html = html
      .split("\n\n")
      .map((block) => {
        if (
          block.startsWith("<") ||
          block.trim() === "" ||
          block.startsWith("```")
        ) {
          return block;
        }
        return `<p class="text-slate-700 my-3 leading-relaxed">${block}</p>`;
      })
      .join("\n");

    // Line breaks
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  const copyHtml = () => {
    const html = parseMarkdown(markdown);
    navigator.clipboard.writeText(html).then(() => {
      alert("HTML copied to clipboard!");
    });
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      alert("Markdown copied to clipboard!");
    });
  };

  const reset = () => {
    setMarkdown("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📝 Markdown Previewer
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Write markdown and see it rendered in real-time. Perfect for README
          files, documentation, and blog posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Markdown Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={copyMarkdown}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Copy MD
              </button>
              <button
                onClick={reset}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
            className="w-full h-[500px] px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm resize-none text-slate-900 bg-white"
          />
        </div>

        {/* Preview */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Live Preview</h2>
            <button
              onClick={copyHtml}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              Copy HTML
            </button>
          </div>
          <div
            className="h-[500px] overflow-y-auto px-4 py-3 border-2 border-slate-200 rounded-lg bg-white prose max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          📖 Markdown Syntax Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700"># Heading 1</p>
            <p className="text-slate-600">Large heading</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">**bold**</p>
            <p className="text-slate-600">Bold text</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">*italic*</p>
            <p className="text-slate-600">Italic text</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">[text](url)</p>
            <p className="text-slate-600">Link</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">`code`</p>
            <p className="text-slate-600">Inline code</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">- item</p>
            <p className="text-slate-600">Unordered list</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">1. item</p>
            <p className="text-slate-600">Ordered list</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-mono text-teal-700">&gt; quote</p>
            <p className="text-slate-600">Blockquote</p>
          </div>
        </div>
      </div>
    </div>
  );
}
