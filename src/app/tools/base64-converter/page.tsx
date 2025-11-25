"use client";

import { useState } from "react";

export default function Base64Converter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const encodeBase64 = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (err) {
      throw new Error("Failed to encode text");
    }
  };

  const decodeBase64 = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (err) {
      throw new Error("Invalid Base64 string");
    }
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      setError("Please enter some text to convert");
      setOutputText("");
      return;
    }

    setError("");

    try {
      if (mode === "encode") {
        const encoded = encodeBase64(inputText);
        setOutputText(encoded);
      } else {
        const decoded = decodeBase64(inputText);
        setOutputText(decoded);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
      setOutputText("");
    }
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInputText("");
    setOutputText("");
    setError("");
  };

  const copyOutput = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert(
        `${mode === "encode" ? "Encoded" : "Decoded"} text copied to clipboard!`
      );
    }
  };

  const swapInputOutput = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText("");
      setMode(mode === "encode" ? "decode" : "encode");
      setError("");
    }
  };

  const reset = () => {
    setInputText("");
    setOutputText("");
    setError("");
  };

  const examples = {
    encode: [
      { input: "Hello World!", output: "SGVsbG8gV29ybGQh" },
      { input: "Base64 Encoding", output: "QmFzZTY0IEVuY29kaW5n" },
      { input: "https://example.com", output: "aHR0cHM6Ly9leGFtcGxlLmNvbQ==" },
    ],
    decode: [
      { input: "SGVsbG8gV29ybGQh", output: "Hello World!" },
      { input: "QmFzZTY0IERlY29kaW5n", output: "Base64 Decoding" },
      { input: "aHR0cHM6Ly9leGFtcGxlLmNvbQ==", output: "https://example.com" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🔐 Base64 Encoder/Decoder
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Encode text to Base64 or decode Base64 strings back to readable text.
          Perfect for data encoding, URL encoding, and API integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Converter Section */}
        <div className="card p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleModeChange("encode")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  mode === "encode"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => handleModeChange("decode")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  mode === "decode"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Enter text to convert to Base64..."
                    : "Enter Base64 string to decode..."
                }
                className="input-field h-32 resize-y font-mono text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button onClick={handleConvert} className="btn-primary flex-1">
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </button>

              {outputText && (
                <button
                  onClick={swapInputOutput}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Swap input and output"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              )}

              <button onClick={reset} className="btn-secondary">
                Reset
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {outputText && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {mode === "encode" ? "Base64 Encoded" : "Decoded Text"}
                  </label>
                  <div className="relative">
                    <textarea
                      value={outputText}
                      readOnly
                      className="input-field h-32 resize-y font-mono text-sm bg-gray-50"
                    />
                    <button
                      onClick={copyOutput}
                      className="absolute top-2 right-2 p-2 bg-white hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    {mode === "encode" ? "Encoding" : "Decoding"} Complete!
                  </h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>Original length: {inputText.length} characters</p>
                    <p>Result length: {outputText.length} characters</p>
                    {mode === "encode" && (
                      <p>
                        Size increase:{" "}
                        {(
                          ((outputText.length - inputText.length) /
                            inputText.length) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Examples & Info */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Examples & Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {mode === "encode" ? "Encoding" : "Decoding"} Examples
              </h3>
              <div className="space-y-3">
                {examples[mode].map((example, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {mode === "encode" ? "Text:" : "Base64:"}
                        </span>
                        <p className="font-mono text-sm text-gray-800 break-all">
                          {example.input}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {mode === "encode" ? "Base64:" : "Text:"}
                        </span>
                        <p className="font-mono text-sm text-gray-800 break-all">
                          {example.output}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setInputText(example.input)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                    >
                      Try This Example
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                About Base64
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  Base64 is a binary-to-text encoding scheme that represents
                  binary data in ASCII format by translating it into a radix-64
                  representation.
                </p>
                <p>
                  It uses 64 characters: A-Z, a-z, 0-9, +, and / (with = for
                  padding).
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Common Use Cases
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  • Encoding binary data for transmission over text protocols
                </li>
                <li>• Embedding images in CSS or HTML (data URLs)</li>
                <li>• API authentication tokens</li>
                <li>• Email attachments (MIME)</li>
                <li>• Storing binary data in JSON or XML</li>
                <li>• URL-safe data encoding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Technical Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Character Set
            </h3>
            <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg">
              <p>A-Z (26 chars)</p>
              <p>a-z (26 chars)</p>
              <p>0-9 (10 chars)</p>
              <p>+ and / (2 chars)</p>
              <p>= (padding)</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Encoding Process
            </h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li>1. Convert text to binary</li>
              <li>2. Group into 6-bit chunks</li>
              <li>3. Map to Base64 alphabet</li>
              <li>4. Add padding if needed</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Size Impact
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• Base64 increases size by ~33%</p>
              <p>• 3 bytes → 4 characters</p>
              <p>• Good for small to medium data</p>
              <p>• Not efficient for large files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
