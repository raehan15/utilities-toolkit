"use client";

import Link from "next/link";
import React from "react";

type Tool = { name: string; href: string; description: string; icon?: string };
type Category = { name: string; tools: Tool[] };

export default function ToolSelector({ categories }: { categories: Category[] }) {
  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full"></span>
            {category.name}
          </h3>
          <div className="tool-selector">
            {category.tools.map((tool) => (
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
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 text-sm text-slate-500">
        Tip: Hover any card to preview. Click to open the tool. No data is
        uploaded — everything runs in your browser when possible.
      </div>
    </div>
  );
}

