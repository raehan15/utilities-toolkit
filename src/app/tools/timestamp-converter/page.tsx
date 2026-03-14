"use client";

import { useState, useEffect } from "react";

export default function TimestampConverter() {
  const [unixTimestamp, setUnixTimestamp] = useState("");
  const [humanDate, setHumanDate] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [timezone, setTimezone] = useState("local");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
    
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (timestamp: number): string => {
    if (!isMounted) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const unixToHuman = () => {
    if (!unixTimestamp.trim()) {
      alert("Please enter a Unix timestamp");
      return;
    }

    const ts = parseInt(unixTimestamp);
    if (isNaN(ts)) {
      alert("Please enter a valid number");
      return;
    }

    // Handle seconds vs milliseconds
    const date = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
    
    if (timezone === "utc") {
      setHumanDate(date.toISOString());
    } else {
      setHumanDate(date.toLocaleString());
    }
  };

  const humanToUnix = () => {
    if (!humanDate.trim()) {
      alert("Please enter a date/time");
      return;
    }

    const date = new Date(humanDate);
    if (isNaN(date.getTime())) {
      alert("Please enter a valid date format");
      return;
    }

    setUnixTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setUnixTimestamp(now.toString());
    const date = new Date();
    setHumanDate(timezone === "utc" ? date.toISOString() : date.toLocaleString());
  };

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const reset = () => {
    setUnixTimestamp("");
    setHumanDate("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          ⏱️ Timestamp Converter
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert between Unix timestamps and human-readable dates. Essential
          for debugging, logging, and API development.
        </p>
      </div>

      {/* Current Time */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Current Unix Timestamp</p>
            <div className="flex items-center gap-3">
              <code className="text-3xl font-bold text-teal-600">
                {isMounted ? currentTimestamp : "Loading..."}
              </code>
              {isMounted && (
                <button
                  onClick={() => copyValue(currentTimestamp.toString())}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Copy
                </button>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 mb-1">Human Readable (Local)</p>
            <p className="text-lg text-slate-800">
              {isMounted ? formatDate(currentTimestamp) : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unix to Human */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Unix → Human Readable
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Unix Timestamp
              </label>
              <input
                type="text"
                value={unixTimestamp}
                onChange={(e) => setUnixTimestamp(e.target.value)}
                placeholder="e.g., 1704067200"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Timezone
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimezone("local")}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                    timezone === "local"
                      ? "bg-teal-100 border-teal-500 text-teal-700"
                      : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setTimezone("utc")}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                    timezone === "utc"
                      ? "bg-teal-100 border-teal-500 text-teal-700"
                      : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  UTC
                </button>
              </div>
            </div>

            <button
              onClick={unixToHuman}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Convert to Date
            </button>

            {humanDate && unixTimestamp && (
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-slate-600 mb-1">Result:</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">{humanDate}</p>
                  <button
                    onClick={() => copyValue(humanDate)}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Human to Unix */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Human Readable → Unix
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date/Time
              </label>
              <input
                type="text"
                value={humanDate}
                onChange={(e) => setHumanDate(e.target.value)}
                placeholder="e.g., 2024-01-01 00:00:00"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-1">
                Supports ISO 8601, RFC 2822, and common date formats
              </p>
            </div>

            <button
              onClick={humanToUnix}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Convert to Unix
            </button>

            <button
              onClick={setNow}
              className="w-full py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Use Current Time
            </button>

            <button
              onClick={reset}
              className="w-full py-3 px-6 border-2 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          📅 Common Timestamps
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Y2K", ts: 946684800 },
            { label: "2020", ts: 1577836800 },
            { label: "2025", ts: 1735689600 },
            { label: "2030", ts: 1893456000 },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-teal-50 p-3 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors"
              onClick={() => setUnixTimestamp(item.ts.toString())}
            >
              <p className="font-medium text-teal-700">{item.label}</p>
              <code className="text-xs text-slate-600">{item.ts}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
