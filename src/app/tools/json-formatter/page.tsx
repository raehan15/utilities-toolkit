"use client";

import { useState } from "react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to format");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
    }
  };

  const validateJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to validate");
      return;
    }

    try {
      JSON.parse(input);
      setError("");
      setOutput("✅ Valid JSON!");
    } catch (err) {
      setError("❌ Invalid JSON format.");
      setOutput("");
    }
  };

  const copyOutput = () => {
    if (!output) return;

    navigator.clipboard
      .writeText(output)
      .then(() => {
        alert("JSON copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy JSON");
      });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadSample = () => {
    const sampleJSON = {
      name: "John Doe",
      age: 30,
      city: "New York",
      hobbies: ["reading", "swimming", "coding"],
      address: {
        street: "123 Main St",
        zipCode: "10001",
        coordinates: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      isActive: true,
      balance: 2500.5,
    };
    setInput(JSON.stringify(sampleJSON));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            JSON Formatter
          </h1>
          <p className="text-slate-600 text-lg">
            Format, minify, and validate your JSON data with syntax highlighting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Input JSON</h3>
              <button
                onClick={loadSample}
                className="text-sm text-green-600 hover:text-green-700 font-medium px-3 py-1 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm resize-none transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                Formatted Output
              </h3>
              {output && (
                <button
                  onClick={copyOutput}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Copy Result
                </button>
              )}
            </div>
            <div className="relative">
              <pre className="w-full h-96 p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm overflow-auto whitespace-pre-wrap">
                {output || "Formatted JSON will appear here..."}
              </pre>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={formatJSON}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            Format & Prettify
          </button>
          <button
            onClick={minifyJSON}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            Minify
          </button>
          <button
            onClick={validateJSON}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-8 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            Validate
          </button>
          <button
            onClick={clearAll}
            className="bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 px-8 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            Clear All
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 JSON Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Use double quotes for strings (not single quotes)</li>
            <li>• Property names must be in double quotes</li>
            <li>• No trailing commas allowed in JSON</li>
            <li>• Comments are not allowed in pure JSON</li>
            <li>• Use the validate button to check your JSON syntax</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
