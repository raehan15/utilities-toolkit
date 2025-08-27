"use client";

import { useState } from "react";

export default function YouTubeTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const titleTemplates = [
    "How to {topic} in 2024 (Step by Step Guide)",
    "The Ultimate {topic} Tutorial for Beginners",
    "5 Secrets About {topic} That Will Blow Your Mind",
    "{topic} Explained in Under 10 Minutes",
    "Why {topic} is EVERYWHERE Right Now",
    "The Truth About {topic} That Nobody Tells You",
    "I Tried {topic} for 30 Days - Here's What Happened",
    "The Complete {topic} Guide (Everything You Need to Know)",
    "{topic} vs Everyone Else: Which is Better?",
    "Beginners Guide to {topic} - Start Here!",
    "The Dark Side of {topic} (What They Don't Want You to Know)",
    "{topic} Mistakes That Are Costing You Time & Money",
    "From Zero to Hero: My {topic} Journey",
    "The Science Behind {topic} Explained",
    "{topic} Hacks That Actually Work",
  ];

  const generateTitles = () => {
    if (!topic.trim()) {
      alert("Please enter a video topic");
      return;
    }

    const shuffled = [...titleTemplates].sort(() => 0.5 - Math.random());
    const selectedTemplates = shuffled.slice(0, 5);

    const generatedTitles = selectedTemplates.map((template) =>
      template.replace(/{topic}/g, topic.trim())
    );

    setTitles(generatedTitles);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard
      .writeText(title)
      .then(() => {
        alert("Title copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy title");
      });
  };

  const reset = () => {
    setTopic("");
    setTitles([]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            YouTube Title Generator
          </h1>
          <p className="text-gray-600">
            Generate engaging YouTube titles that attract viewers and boost your
            channel
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Video Topic or Keyword
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video topic (e.g., 'cooking', 'gaming', 'fitness')"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && generateTitles()}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateTitles}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Generate Titles
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {titles.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Titles
              </h3>
              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-gray-800 flex-1 leading-relaxed">
                        {title}
                      </p>
                      <button
                        onClick={() => copyTitle(title)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 Title Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Use numbers and specific timeframes (e.g., &quot;5 Tips&quot;,
              &quot;in 2024&quot;)
            </li>
            <li>
              • Include emotional triggers (Ultimate, Secret, Truth, Mistake)
            </li>
            <li>• Keep titles under 60 characters for better visibility</li>
            <li>• Use brackets or parentheses for additional context</li>
            <li>• Test different variations to see what works best</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
