"use client";

import { useState, useMemo } from "react";

interface Match {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState(
    "The quick brown fox jumps over the lazy dog.\nEmail: test@example.com\nPhone: 123-456-7890"
  );
  const [replaceWith, setReplaceWith] = useState("");

  const flagOptions = [
    { value: "g", label: "Global", description: "Find all matches" },
    { value: "i", label: "Case Insensitive", description: "Ignore case" },
    { value: "m", label: "Multiline", description: "^ and $ match line breaks" },
    { value: "s", label: "Dotall", description: ". matches newlines" },
  ];

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  const { matches, error, highlightedText, replacedText } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null, highlightedText: testString, replacedText: "" };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: Match[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          allMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      // Create highlighted text
      let highlighted = testString;
      let offset = 0;
      allMatches.forEach((m) => {
        const before = highlighted.substring(0, m.index + offset);
        const match = highlighted.substring(m.index + offset, m.index + offset + m.text.length);
        const after = highlighted.substring(m.index + offset + m.text.length);
        const replacement = `<mark class="bg-teal-200 text-teal-900 px-0.5 rounded">${match}</mark>`;
        highlighted = before + replacement + after;
        offset += replacement.length - match.length;
      });

      // Create replaced text
      const replaced = replaceWith ? testString.replace(regex, replaceWith) : "";

      return { matches: allMatches, error: null, highlightedText: highlighted, replacedText: replaced };
    } catch (e) {
      return {
        matches: [],
        error: (e as Error).message,
        highlightedText: testString,
        replacedText: "",
      };
    }
  }, [pattern, flags, testString, replaceWith]);

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`).then(() => {
      alert("Regex pattern copied!");
    });
  };

  const presets = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { label: "Phone", pattern: "\\d{3}[-.]?\\d{3}[-.]?\\d{4}" },
    { label: "URL", pattern: "https?://[\\w.-]+(?:/[\\w.-]*)*" },
    { label: "IPv4", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🔍 Regex Tester
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Test and debug regular expressions in real-time. See matches
          highlighted and capture groups extracted.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pattern Input */}
        <div className="lg:col-span-3 card p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Regular Expression
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-lg">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-slate-900"
                />
                <span className="text-slate-400 text-lg">/</span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-16 px-3 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-slate-900 text-center"
                />
                <button
                  onClick={copyPattern}
                  className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Copy
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">⚠️ {error}</p>
              )}
            </div>
          </div>

          {/* Flags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {flagOptions.map((flag) => (
              <button
                key={flag.value}
                onClick={() => toggleFlag(flag.value)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  flags.includes(flag.value)
                    ? "bg-teal-100 border-teal-500 text-teal-700"
                    : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                }`}
                title={flag.description}
              >
                {flag.label} ({flag.value})
              </button>
            ))}
          </div>

          {/* Presets */}
          <div className="mt-4">
            <span className="text-sm text-slate-600 mr-2">Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setPattern(preset.pattern)}
                className="mr-2 px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-full hover:bg-teal-100 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Test String */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Test String</h2>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-40 px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none font-mono text-sm text-slate-900"
          />

          <h3 className="text-lg font-medium text-slate-800 mt-6 mb-3">
            Highlighted Matches
          </h3>
          <div
            className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-sm whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>

        {/* Results */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Matches ({matches.length})
          </h2>
          
          {matches.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-3 bg-teal-50 rounded-lg border border-teal-200"
                >
                  <div className="flex justify-between items-start">
                    <code className="text-sm text-teal-800 font-medium break-all">
                      {match.text}
                    </code>
                    <span className="text-xs text-slate-500 ml-2 shrink-0">
                      @{match.index}
                    </span>
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-2 text-xs text-slate-600">
                      Groups: {match.groups.map((g, i) => (
                        <code key={i} className="mx-1 bg-slate-100 px-1 rounded">
                          ${i + 1}: {g}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-slate-50 rounded-lg text-center text-slate-500">
              {pattern ? "No matches found" : "Enter a pattern to find matches"}
            </div>
          )}

          {/* Replace */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Replace With
            </label>
            <input
              type="text"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              placeholder="Replacement string..."
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm text-slate-900"
            />
            {replacedText && (
              <div className="mt-2 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-xs text-slate-600 mb-1">Result:</p>
                <code className="text-sm text-slate-800 whitespace-pre-wrap break-all">
                  {replacedText}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
