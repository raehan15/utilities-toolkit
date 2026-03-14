"use client";

import { useState } from "react";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [lastConversion, setLastConversion] = useState("");

  const conversions = [
    {
      name: "UPPERCASE",
      icon: "⬆️",
      description: "CONVERT ALL LETTERS TO UPPERCASE",
      action: (text: string) => text.toUpperCase(),
    },
    {
      name: "lowercase",
      icon: "⬇️",
      description: "convert all letters to lowercase",
      action: (text: string) => text.toLowerCase(),
    },
    {
      name: "Title Case",
      icon: "📝",
      description: "Capitalize The First Letter Of Each Word",
      action: (text: string) =>
        text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
    },
    {
      name: "Sentence case",
      icon: "📄",
      description: "Capitalize only the first letter of each sentence",
      action: (text: string) => {
        return text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      },
    },
    {
      name: "aLtErNaTiNg CaSe",
      icon: "🔀",
      description: "aLtErNaTe BeTwEeN uPpEr AnD lOwEr",
      action: (text: string) =>
        text
          .split("")
          .map((char, i) =>
            i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join(""),
    },
    {
      name: "InVeRsE cAsE",
      icon: "🔄",
      description: "sWAP uPPER AND lOWER cASE",
      action: (text: string) =>
        text
          .split("")
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join(""),
    },
    {
      name: "camelCase",
      icon: "🐫",
      description: "removeSpacesAndCapitalizeEachWord",
      action: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()),
    },
    {
      name: "PascalCase",
      icon: "🏛️",
      description: "RemoveSpacesAndCapitalizeAllWords",
      action: (text: string) =>
        text
          .toLowerCase()
          .split(/[^a-zA-Z0-9]+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(""),
    },
    {
      name: "snake_case",
      icon: "🐍",
      description: "replace_spaces_with_underscores",
      action: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/^_|_$/g, ""),
    },
    {
      name: "kebab-case",
      icon: "🍢",
      description: "replace-spaces-with-hyphens",
      action: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
    },
    {
      name: "CONSTANT_CASE",
      icon: "📌",
      description: "UPPERCASE_WITH_UNDERSCORES",
      action: (text: string) =>
        text
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, "_")
          .replace(/^_|_$/g, ""),
    },
    {
      name: "dot.case",
      icon: "⚫",
      description: "replace.spaces.with.dots",
      action: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, ".")
          .replace(/^\.|\.$/g, ""),
    },
  ];

  const convert = (action: (text: string) => string, name: string) => {
    if (!inputText.trim()) {
      alert("Please enter some text to convert");
      return;
    }
    setOutputText(action(inputText));
    setLastConversion(name);
  };

  const copyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      alert("Converted text copied to clipboard!");
    });
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  const reset = () => {
    setInputText("");
    setOutputText("");
    setLastConversion("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🔤 Text Case Converter
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert text between different cases instantly. Perfect for coding,
          writing, and formatting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Input Text</h2>
            <button
              onClick={reset}
              className="text-slate-500 hover:text-slate-700 text-sm font-medium"
            >
              Clear
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-40 px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none text-slate-900 bg-white"
          />
          <div className="mt-2 text-sm text-slate-500">
            {inputText.length} characters | {inputText.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        {/* Output */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Output {lastConversion && `(${lastConversion})`}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={swapTexts}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                title="Swap input and output"
              >
                ⇄ Swap
              </button>
              <button
                onClick={copyOutput}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder="Converted text will appear here..."
            className="w-full h-40 px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 resize-none text-slate-900"
          />
          <div className="mt-2 text-sm text-slate-500">
            {outputText.length} characters | {outputText.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Choose Conversion Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {conversions.map((conv) => (
            <button
              key={conv.name}
              onClick={() => convert(conv.action, conv.name)}
              className="p-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 hover:border-teal-300 rounded-lg transition-all text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{conv.icon}</span>
                <span className="font-medium text-teal-700 text-sm">
                  {conv.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{conv.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          💡 When to Use Each Case
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">camelCase</p>
            <p className="text-slate-600">JavaScript variables, function names</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">PascalCase</p>
            <p className="text-slate-600">Class names, React components</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">snake_case</p>
            <p className="text-slate-600">Python variables, database columns</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">kebab-case</p>
            <p className="text-slate-600">URLs, CSS classes, file names</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">CONSTANT_CASE</p>
            <p className="text-slate-600">Constants, environment variables</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="font-medium text-teal-700 mb-1">Title Case</p>
            <p className="text-slate-600">Headlines, titles, headers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
