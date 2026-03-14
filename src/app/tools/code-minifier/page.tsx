"use client";

import { useState } from "react";

export default function CodeMinifier() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [codeType, setCodeType] = useState<"css" | "js">("css");
  const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

  const minifyCSS = (css: string): string => {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove whitespace around special characters
      .replace(/\s*([{}:;,>~+])\s*/g, "$1")
      // Remove whitespace at start/end
      .replace(/^\s+|\s+$/g, "")
      // Remove newlines
      .replace(/\n/g, "")
      // Remove multiple spaces
      .replace(/\s{2,}/g, " ")
      // Remove space before !important
      .replace(/\s+!important/g, "!important")
      // Remove trailing semicolons before }
      .replace(/;}/g, "}")
      // Remove units from zero values
      .replace(/(\s|:)0(px|em|rem|%|pt|pc|in|cm|mm|ex|ch|vw|vh|vmin|vmax)/g, "$10")
      // Trim
      .trim();
  };

  const minifyJS = (js: string): string => {
    // Basic JS minification (doesn't handle all edge cases)
    return js
      // Remove single-line comments (but not URLs like http://)
      .replace(/(?<![:\w])\/\/.*$/gm, "")
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove leading/trailing whitespace from lines
      .replace(/^\s+|\s+$/gm, "")
      // Remove empty lines
      .replace(/\n\s*\n/g, "\n")
      // Remove whitespace around operators
      .replace(/\s*([+\-*/%=<>!&|?:,;{}()[\]])\s*/g, "$1")
      // Add back space after keywords
      .replace(/(return|const|let|var|if|else|for|while|function|class|new|throw|catch|try|typeof|instanceof)([^\s\w])/g, "$1 $2")
      // Remove newlines
      .replace(/\n/g, "")
      // Remove multiple spaces
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const minify = () => {
    if (!inputCode.trim()) {
      alert("Please enter some code to minify");
      return;
    }

    const minified = codeType === "css" ? minifyCSS(inputCode) : minifyJS(inputCode);
    setOutputCode(minified);

    const originalSize = new Blob([inputCode]).size;
    const minifiedSize = new Blob([minified]).size;
    const savings = originalSize > 0 ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

    setStats({
      original: originalSize,
      minified: minifiedSize,
      savings,
    });
  };

  const beautifyCSS = (css: string): string => {
    let result = css
      // Add newline after { and ;
      .replace(/\{/g, " {\n  ")
      .replace(/;/g, ";\n  ")
      .replace(/}/g, "\n}\n\n")
      // Clean up extra spaces
      .replace(/\n\s*\n/g, "\n")
      .replace(/\s+$/gm, "")
      .trim();
    return result;
  };

  const beautifyJS = (js: string): string => {
    let indentLevel = 0;
    let result = "";
    let inString = false;
    let stringChar = "";

    for (let i = 0; i < js.length; i++) {
      const char = js[i];
      const prevChar = js[i - 1] || "";

      // Handle strings
      if ((char === '"' || char === "'" || char === "`") && prevChar !== "\\") {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      if (inString) {
        result += char;
        continue;
      }

      if (char === "{") {
        indentLevel++;
        result += " {\n" + "  ".repeat(indentLevel);
      } else if (char === "}") {
        indentLevel = Math.max(0, indentLevel - 1);
        result += "\n" + "  ".repeat(indentLevel) + "}\n" + "  ".repeat(indentLevel);
      } else if (char === ";") {
        result += ";\n" + "  ".repeat(indentLevel);
      } else {
        result += char;
      }
    }

    return result.replace(/\n\s*\n/g, "\n").trim();
  };

  const beautify = () => {
    if (!inputCode.trim()) {
      alert("Please enter some code to beautify");
      return;
    }

    const beautified = codeType === "css" ? beautifyCSS(inputCode) : beautifyJS(inputCode);
    setOutputCode(beautified);
    setStats({ original: 0, minified: 0, savings: 0 });
  };

  const copyOutput = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  const reset = () => {
    setInputCode("");
    setOutputCode("");
    setStats({ original: 0, minified: 0, savings: 0 });
  };

  const swapInputOutput = () => {
    setInputCode(outputCode);
    setOutputCode("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📦 Code Minifier
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Minify CSS and JavaScript code to reduce file size. Also includes a
          beautifier to format minified code.
        </p>
      </div>

      {/* Code Type Selector */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-slate-700">Code Type:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCodeType("css")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                codeType === "css"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setCodeType("js")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                codeType === "js"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              JavaScript
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Input Code</h2>
            <button
              onClick={reset}
              className="text-slate-500 hover:text-slate-700 text-sm font-medium"
            >
              Clear
            </button>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={`Paste your ${codeType.toUpperCase()} code here...`}
            className="w-full h-80 px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none font-mono text-sm text-slate-900 bg-white"
          />
          <div className="mt-2 text-sm text-slate-500">
            {inputCode.length} characters | {new Blob([inputCode]).size} bytes
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={minify}
              className="bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Minify
            </button>
            <button
              onClick={beautify}
              className="py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Beautify
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Output</h2>
            <div className="flex gap-2">
              {outputCode && (
                <>
                  <button
                    onClick={swapInputOutput}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    ⇄ Use as Input
                  </button>
                  <button
                    onClick={copyOutput}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Copy
                  </button>
                </>
              )}
            </div>
          </div>
          <textarea
            value={outputCode}
            readOnly
            placeholder="Minified/beautified code will appear here..."
            className="w-full h-80 px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 resize-none font-mono text-sm text-slate-900"
          />
          <div className="mt-2 text-sm text-slate-500">
            {outputCode.length} characters | {new Blob([outputCode]).size} bytes
          </div>

          {/* Stats */}
          {stats.savings > 0 && (
            <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <h3 className="font-medium text-teal-800 mb-2">Compression Results</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.original}</p>
                  <p className="text-xs text-slate-600">Original (bytes)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.minified}</p>
                  <p className="text-xs text-slate-600">Minified (bytes)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-600">{stats.savings}%</p>
                  <p className="text-xs text-slate-600">Saved</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          💡 Minification Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Why Minify?</h4>
            <ul className="space-y-1">
              <li>• Reduces file size for faster load times</li>
              <li>• Decreases bandwidth usage</li>
              <li>• Improves website performance scores</li>
              <li>• Required for production deployments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Notes</h4>
            <ul className="space-y-1">
              <li>• This is a basic minifier for demonstration</li>
              <li>• For production, use tools like Terser (JS) or cssnano (CSS)</li>
              <li>• Always test minified code before deployment</li>
              <li>• Keep original source files for debugging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
