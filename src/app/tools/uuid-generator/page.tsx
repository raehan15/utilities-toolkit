"use client";

import { useState } from "react";

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<"standard" | "uppercase" | "no-dashes">("standard");

  const generateUUID = (): string => {
    // Generate UUID v4
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    switch (format) {
      case "uppercase":
        return uuid.toUpperCase();
      case "no-dashes":
        return uuid.replace(/-/g, "");
      default:
        return uuid;
    }
  };

  const generate = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
  };

  const copyUUID = (uuid: string) => {
    navigator.clipboard.writeText(uuid).then(() => {
      alert("UUID copied to clipboard!");
    });
  };

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n")).then(() => {
      alert("All UUIDs copied to clipboard!");
    });
  };

  const reset = () => {
    setUuids([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🔑 UUID Generator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate random UUIDs (Universally Unique Identifiers) for your
          applications, databases, and APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of UUIDs: {count}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Format
              </label>
              <div className="space-y-2">
                {[
                  { value: "standard", label: "Standard", example: "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789" },
                  { value: "uppercase", label: "Uppercase", example: "A1B2C3D4-E5F6-4789-A012-B3C4D5E6F789" },
                  { value: "no-dashes", label: "No Dashes", example: "a1b2c3d4e5f64789a012b3c4d5e6f789" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFormat(opt.value as typeof format)}
                    className={`w-full p-3 text-left text-sm rounded-lg border transition-colors ${
                      format === opt.value
                        ? "bg-teal-100 border-teal-500 text-teal-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                    }`}
                  >
                    <div className="font-medium">{opt.label}</div>
                    <code className="text-xs text-slate-500 break-all">{opt.example.substring(0, 20)}...</code>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Generate UUIDs
            </button>

            <button
              onClick={reset}
              className="w-full py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Generated UUIDs {uuids.length > 0 && `(${uuids.length})`}
            </h2>
            {uuids.length > 0 && (
              <button
                onClick={copyAll}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Copy All
              </button>
            )}
          </div>

          {uuids.length > 0 ? (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-teal-50 hover:border-teal-200 transition-colors group"
                >
                  <code className="text-sm text-slate-800 font-mono break-all">
                    {uuid}
                  </code>
                  <button
                    onClick={() => copyUUID(uuid)}
                    className="ml-3 text-teal-600 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-center text-slate-500">
                <div className="text-5xl mb-4">🔑</div>
                <p>Click &quot;Generate UUIDs&quot; to create random identifiers</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          📚 About UUIDs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <h4 className="font-medium text-slate-800 mb-2">What is a UUID?</h4>
            <p>
              A UUID (Universally Unique Identifier) is a 128-bit number used to
              uniquely identify information. This generator creates UUID version 4,
              which uses random numbers.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Common Use Cases</h4>
            <ul className="space-y-1">
              <li>• Database primary keys</li>
              <li>• Session identifiers</li>
              <li>• API keys and tokens</li>
              <li>• File naming and tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
