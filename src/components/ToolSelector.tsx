"use client";

import Link from "next/link";
import React from "react";

type Tool = { name: string; href: string; description: string; icon?: string };

export default function ToolSelector({ tools }: { tools: Tool[] }) {
  return (
    <div>
      <div className="tool-selector">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="tool-card"
            aria-label={tool.name}
          >
            <div className="icon" aria-hidden>
              {tool.icon || "🔧"}
            </div>
            <div className="meta">
              <div className="title">{tool.name}</div>
              <div className="desc">{tool.description}</div>
            </div>
            <div className="text-slate-400">→</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-500">
        Tip: Hover any card to preview. Click to open the tool. No data is
        uploaded — everything runs in your browser when possible.
      </div>
    </div>
  );
}
