"use client";

import { useState } from "react";

export default function TextToHashtags() {
  const [inputText, setInputText] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateHashtags = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to generate hashtags");
      return;
    }

    // Extract keywords and create hashtags
    const words = inputText
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .filter(
        (word) =>
          ![
            "the",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
            "is",
            "are",
            "was",
            "were",
            "be",
            "been",
            "being",
            "have",
            "has",
            "had",
            "do",
            "does",
            "did",
            "will",
            "would",
            "could",
            "should",
            "may",
            "might",
            "can",
            "this",
            "that",
            "these",
            "those",
          ].includes(word)
      );

    // Create hashtags from individual words
    const wordHashtags = Array.from(new Set(words))
      .slice(0, 8)
      .map((word) => `#${word}`);

    // Create compound hashtags
    const compoundHashtags = [];
    for (let i = 0; i < Math.min(words.length - 1, 6); i++) {
      compoundHashtags.push(`#${words[i]}${words[i + 1]}`);
    }

    // Add trending and generic hashtags based on context
    const contextualHashtags = getContextualHashtags(inputText.toLowerCase());

    const allHashtags = [
      ...wordHashtags,
      ...compoundHashtags,
      ...contextualHashtags,
    ];
    const uniqueHashtags = Array.from(new Set(allHashtags)).slice(0, 20);

    setHashtags(uniqueHashtags);
  };

  const getContextualHashtags = (text: string) => {
    const contextMap = {
      "food|cooking|recipe|kitchen|chef": [
        "#foodie",
        "#cooking",
        "#recipe",
        "#delicious",
        "#foodblogger",
        "#homemade",
      ],
      "travel|vacation|trip|explore|adventure": [
        "#travel",
        "#wanderlust",
        "#vacation",
        "#explore",
        "#adventure",
        "#travelgram",
      ],
      "fitness|workout|gym|exercise|health": [
        "#fitness",
        "#workout",
        "#healthy",
        "#motivation",
        "#fitfam",
        "#exercise",
      ],
      "business|work|entrepreneur|startup": [
        "#business",
        "#entrepreneur",
        "#startup",
        "#success",
        "#hustle",
        "#businessowner",
      ],
      "tech|technology|coding|software|developer": [
        "#tech",
        "#technology",
        "#coding",
        "#developer",
        "#software",
        "#innovation",
      ],
      "fashion|style|outfit|clothes|beauty": [
        "#fashion",
        "#style",
        "#ootd",
        "#beauty",
        "#fashionista",
        "#trendy",
      ],
      "photography|photo|camera|picture": [
        "#photography",
        "#photo",
        "#photographer",
        "#photooftheday",
        "#camera",
        "#picoftheday",
      ],
      "art|creative|design|artist|painting": [
        "#art",
        "#creative",
        "#design",
        "#artist",
        "#artwork",
        "#creativity",
      ],
      "music|song|artist|band|concert": [
        "#music",
        "#song",
        "#musician",
        "#concert",
        "#band",
        "#musiclover",
      ],
      "education|learning|student|study|school": [
        "#education",
        "#learning",
        "#student",
        "#knowledge",
        "#study",
        "#school",
      ],
    };

    const matched = [];
    for (const [pattern, tags] of Object.entries(contextMap)) {
      if (new RegExp(pattern, "i").test(text)) {
        matched.push(...tags.slice(0, 3));
      }
    }

    return matched;
  };

  const copyHashtag = (hashtag: string) => {
    navigator.clipboard
      .writeText(hashtag)
      .then(() => {
        alert(`${hashtag} copied to clipboard!`);
      })
      .catch(() => {
        alert("Failed to copy hashtag");
      });
  };

  const copyAllHashtags = () => {
    const hashtagText = hashtags.join(" ");
    navigator.clipboard
      .writeText(hashtagText)
      .then(() => {
        alert("All hashtags copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy hashtags");
      });
  };

  const reset = () => {
    setInputText("");
    setHashtags([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Text to Hashtags Generator
          </h1>
          <p className="text-slate-600 text-lg">
            Generate relevant hashtags from any text or topic to boost your
            social media reach
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label
              htmlFor="inputText"
              className="block text-sm font-bold text-slate-700 mb-3"
            >
              Enter Your Text or Topic
            </label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter any text, topic, or description (e.g., 'Delicious homemade pizza recipe with fresh ingredients')"
              className="w-full h-32 px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateHashtags}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Generate Hashtags
            </button>
            <button
              onClick={reset}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium text-lg"
            >
              Reset
            </button>
          </div>

          {hashtags.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">
                  Generated Hashtags ({hashtags.length})
                </h3>
                <button
                  onClick={copyAllHashtags}
                  className="text-purple-600 hover:text-purple-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Copy All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    onClick={() => copyHashtag(hashtag)}
                    className="bg-white text-purple-700 px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                  >
                    {hashtag}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-600">
                💡 Click any hashtag to copy it individually, or use &quot;Copy
                All&quot; to copy them all at once
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            #️⃣ Hashtag Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Use a mix of popular and niche hashtags for better reach</li>
            <li>• Research hashtag popularity on your target platform</li>
            <li>• Keep hashtags relevant to your content</li>
            <li>
              • Instagram: 5-10 hashtags, Twitter: 1-2 hashtags, LinkedIn: 3-5
              hashtags
            </li>
            <li>• Avoid overly generic hashtags like #love or #instagood</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
