"use client";

import { useState } from "react";

export default function SlugGenerator() {
  const [inputText, setInputText] = useState("");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  const generateSlug = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to generate a slug");
      return;
    }

    let result = inputText.trim();

    // Convert to lowercase if enabled
    if (lowercase) {
      result = result.toLowerCase();
    }

    // Remove accents/diacritics
    result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Remove special characters except spaces
    if (removeNumbers) {
      result = result.replace(/[^a-zA-Z\s]/g, "");
    } else {
      result = result.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    // Replace multiple spaces with single space
    result = result.replace(/\s+/g, " ").trim();

    // Replace spaces with separator
    result = result.replace(/\s/g, separator);

    // Remove leading/trailing separators
    const sepRegex = new RegExp(`^[${separator}]+|[${separator}]+$`, "g");
    result = result.replace(sepRegex, "");

    // Remove consecutive separators
    const multiSepRegex = new RegExp(`[${separator}]+`, "g");
    result = result.replace(multiSepRegex, separator);

    // Apply max length if set
    if (maxLength > 0 && result.length > maxLength) {
      result = result.substring(0, maxLength);
      // Don't end with separator
      result = result.replace(new RegExp(`[${separator}]+$`), "");
    }

    setSlug(result);
  };

  const copySlug = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug).then(() => {
      alert("Slug copied to clipboard!");
    });
  };

  const reset = () => {
    setInputText("");
    setSlug("");
  };

  const examples = [
    "How to Build a Website in 2024",
    "10 Tips for Better SEO",
    "The Ultimate Guide to React.js",
    "What is Machine Learning?",
    "Best Practices for UX Design",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🔗 Slug Generator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert titles and text into URL-friendly slugs. Perfect for blog
          posts, product pages, and SEO-optimized URLs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Separator
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: "-", label: "Hyphen", symbol: "-" },
                  { value: "_", label: "Underscore", symbol: "_" },
                  { value: ".", label: "Dot", symbol: "." },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSeparator(opt.value)}
                    className={`p-3 text-sm rounded-lg border transition-colors flex items-center justify-between ${
                      separator === opt.value
                        ? "bg-teal-100 border-teal-500 text-teal-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">{opt.symbol}</code>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Length (0 = no limit)
              </label>
              <input
                type="number"
                min="0"
                max="200"
                value={maxLength}
                onChange={(e) => setMaxLength(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label htmlFor="lowercase" className="text-sm text-slate-700">
                  Convert to lowercase
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="removeNumbers"
                  checked={removeNumbers}
                  onChange={(e) => setRemoveNumbers(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label htmlFor="removeNumbers" className="text-sm text-slate-700">
                  Remove numbers
                </label>
              </div>
            </div>

            <button
              onClick={generateSlug}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Generate Slug
            </button>

            <button
              onClick={reset}
              className="w-full py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Input/Output */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Input Text</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your title or text here..."
              className="w-full h-24 px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none text-slate-900 bg-white"
            />
            
            {/* Example Titles */}
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                Try an example:
              </p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(example)}
                    className="px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-full hover:bg-teal-100 transition-colors"
                  >
                    {example.substring(0, 25)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Generated Slug</h2>
              {slug && (
                <button
                  onClick={copySlug}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Copy
                </button>
              )}
            </div>
            
            {slug ? (
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                  <code className="text-teal-800 text-lg font-mono break-all">
                    {slug}
                  </code>
                </div>
                <div className="text-sm text-slate-500">
                  Length: {slug.length} characters
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Example URL:</span>{" "}
                    <code className="text-slate-800">
                      https://example.com/blog/{slug}
                    </code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-slate-50 rounded-lg text-center">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-slate-500">
                  Enter text and click &quot;Generate Slug&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          💡 Slug Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <ul className="space-y-2">
            <li>• Keep slugs short and descriptive (3-5 words ideal)</li>
            <li>• Use hyphens (-) as word separators for SEO</li>
            <li>• Always use lowercase for consistency</li>
          </ul>
          <ul className="space-y-2">
            <li>• Remove stop words like &quot;a&quot;, &quot;the&quot;, &quot;and&quot;</li>
            <li>• Include target keywords when possible</li>
            <li>• Avoid changing slugs after publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
