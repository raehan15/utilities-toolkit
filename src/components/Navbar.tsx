"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const toolCategories = [
  {
    name: "Generators",
    tools: [
      { name: "YouTube Title Generator", href: "/tools/youtube-title-generator" },
      { name: "Random Number Generator", href: "/tools/random-number-generator" },
      { name: "Color Palette Generator", href: "/tools/color-palette-generator" },
      { name: "QR Code Generator", href: "/tools/qr-code-generator" },
    ],
  },
  {
    name: "Converters",
    tools: [
      { name: "Image to Base64", href: "/tools/image-to-base64" },
      { name: "PDF Converter", href: "/tools/pdf-converter" },
      { name: "Image Converter", href: "/tools/image-converter" },
      { name: "Unit Converter", href: "/tools/unit-converter" },
      { name: "Base64 Converter", href: "/tools/base64-converter" },
    ],
  },
  {
    name: "Calculators",
    tools: [
      { name: "BMI Calculator", href: "/tools/bmi-calculator" },
    ],
  },
  {
    name: "Text & Data",
    tools: [
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "Word Counter", href: "/tools/word-counter" },
      { name: "Text to Hashtags", href: "/tools/text-to-hashtags" },
    ],
  },
  {
    name: "Other",
    tools: [
      { name: "YouTube Guide", href: "/tools/youtube-downloader" },
    ],
  },
];

// Flatten all tools for search
const allTools = toolCategories.flatMap((cat) => cat.tools);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allTools.filter((tool) =>
      tool.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 backdrop-blur-sm bg-white/95 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-800 hover:text-[var(--primary)] transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-2xl">🛠️</span>
            <span>Tool Kit</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-64 px-4 py-2 pl-10 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              
              {/* Search Results Dropdown */}
              {isSearchFocused && filteredTools.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-lg shadow-xl z-[999] max-h-64 overflow-y-auto">
                  {filteredTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block px-4 py-3 text-sm text-slate-600 hover:bg-[rgba(14,165,164,0.08)] hover:text-[var(--primary)] transition-colors"
                      onClick={() => setSearchQuery("")}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
              {isSearchFocused && searchQuery && filteredTools.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-lg shadow-xl z-[999] p-4 text-sm text-slate-500">
                  No tools found
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-slate-600 hover:text-[var(--primary)] transition-colors font-medium"
            >
              Home
            </Link>
            
            {/* Categorized Tools Dropdown */}
            <div className="relative group">
              <button className="text-slate-600 hover:text-[var(--primary)] transition-colors flex items-center font-medium">
                Tools
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[999] backdrop-blur-sm transform translate-x-1/4">
                <div className="max-h-[70vh] overflow-y-auto py-2">
                  {toolCategories.map((category, idx) => (
                    <div key={category.name}>
                      {idx > 0 && <div className="border-t border-slate-100 my-2" />}
                      <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {category.name}
                      </p>
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-[rgba(14,165,164,0.08)] hover:text-[var(--primary)] transition-colors"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-[var(--primary)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-slate-50 text-slate-900 placeholder-slate-400"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Mobile Search Results */}
            {searchQuery && filteredTools.length > 0 && (
              <div className="mb-4 bg-slate-50 rounded-lg p-2">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-[var(--primary)]"
                    onClick={() => { setSearchQuery(""); setIsOpen(false); }}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/"
              className="block py-2 text-slate-600 hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categorized Tools */}
            <div className="mt-2">
              {toolCategories.map((category) => (
                <div key={category.name} className="mb-4">
                  <p className="py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {category.name}
                  </p>
                  <div className="pl-4 border-l-2 border-slate-100 ml-2">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="block py-2 text-slate-600 hover:text-[var(--primary)] transition-colors text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

