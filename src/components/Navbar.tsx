"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { name: "BMI Calculator", href: "/tools/bmi-calculator" },
    { name: "YouTube Title Generator", href: "/tools/youtube-title-generator" },
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "Random Number Generator", href: "/tools/random-number-generator" },
    { name: "Color Palette Generator", href: "/tools/color-palette-generator" },
    { name: "Image to Base64 Converter", href: "/tools/image-to-base64" },
    { name: "Loan / EMI Calculator", href: "/tools/loan-emi-calculator" },
    { name: "Word Counter", href: "/tools/word-counter" },
    { name: "QR Code Generator", href: "/tools/qr-code-generator" },
    { name: "PDF Converter", href: "/tools/pdf-converter" },
    { name: "Image Converter", href: "/tools/image-converter" },
    { name: "Unit Converter", href: "/tools/unit-converter" },
    { name: "YouTube Downloader Guide", href: "/tools/youtube-downloader" },
    { name: "Base64 Converter", href: "/tools/base64-converter" },
  ];

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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-[var(--primary)] transition-colors font-medium"
            >
              Home
            </Link>
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
              <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[999] backdrop-blur-sm max-w-[90vw] transform translate-x-1/4">
                <div className="max-h-[60vh] overflow-y-auto py-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)] transition-colors border-b border-slate-50 last:border-b-0"
                    >
                      {tool.name}
                    </Link>
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
            <Link
              href="/"
              className="block py-2 text-slate-600 hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="mt-2">
              <p className="py-2 text-slate-900 font-medium">Tools</p>
              <div className="pl-4 border-l-2 border-slate-100 ml-2">
                {tools.map((tool) => (
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
