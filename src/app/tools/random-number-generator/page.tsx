"use client";

import { useState } from "react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const generateNumber = () => {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);

    if (isNaN(minNum) || isNaN(maxNum)) {
      alert("Please enter valid numbers");
      return;
    }

    if (minNum >= maxNum) {
      alert("Minimum value must be less than maximum value");
      return;
    }

    const randomNum =
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    setResult(randomNum);
    setHistory((prev) => [randomNum, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const generateMultiple = () => {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);

    if (isNaN(minNum) || isNaN(maxNum)) {
      alert("Please enter valid numbers");
      return;
    }

    if (minNum >= maxNum) {
      alert("Minimum value must be less than maximum value");
      return;
    }

    const numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }

    setHistory((prev) => [...numbers, ...prev.slice(0, 5)]);
  };

  const reset = () => {
    setMin("");
    setMax("");
    setResult(null);
    setHistory([]);
  };

  const copyResult = () => {
    if (result === null) return;

    navigator.clipboard
      .writeText(result.toString())
      .then(() => {
        alert("Number copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy number");
      });
  };

  const setPreset = (minVal: string, maxVal: string) => {
    setMin(minVal);
    setMax(maxVal);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Random Number Generator
          </h1>
          <p className="text-gray-600">
            Generate random numbers within your specified range
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="min"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Minimum Value
              </label>
              <input
                type="number"
                id="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Enter minimum number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="max"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Maximum Value
              </label>
              <input
                type="number"
                id="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Enter maximum number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Quick presets:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPreset("1", "10")}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
              >
                1-10
              </button>
              <button
                onClick={() => setPreset("1", "100")}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
              >
                1-100
              </button>
              <button
                onClick={() => setPreset("1", "1000")}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
              >
                1-1000
              </button>
              <button
                onClick={() => setPreset("0", "1")}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
              >
                0-1 (Coin)
              </button>
              <button
                onClick={() => setPreset("1", "6")}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
              >
                1-6 (Dice)
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateNumber}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Generate Random Number
            </button>
            <button
              onClick={generateMultiple}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Generate 5 Numbers
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {result !== null && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Number
              </h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-5xl font-bold text-purple-600">
                  {result}
                </div>
                <button
                  onClick={copyResult}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Numbers
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {history.map((num, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg text-center font-medium text-gray-800 border border-gray-200"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🎯 Use Cases
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Random selection from a list (use 1 to list length)</li>
            <li>• Dice simulation (1-6) or custom dice (1-20)</li>
            <li>• Password generation seeds</li>
            <li>• Game development and testing</li>
            <li>• Statistical sampling and research</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
