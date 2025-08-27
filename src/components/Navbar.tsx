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
    { name: "Text to Hashtags Generator", href: "/tools/text-to-hashtags" },
    { name: "Image to Base64 Converter", href: "/tools/image-to-base64" },
    { name: "Loan / EMI Calculator", href: "/tools/loan-emi-calculator" },
    { name: "Word Counter", href: "/tools/word-counter" },
    { name: "QR Code Generator", href: "/tools/qr-code-generator" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            🛠️ Utilities
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-slate-700 hover:text-blue-600 transition-colors flex items-center font-medium">
                Tools
                <svg
                  className="w-4 h-4 ml-1"
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
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-blue-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm max-w-[90vw] -translate-x-1/2">
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl border-b border-slate-100 last:border-b-0"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="mt-2">
              <p className="py-2 text-gray-900 font-medium">Tools</p>
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
