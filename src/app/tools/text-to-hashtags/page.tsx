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

    const text = inputText.toLowerCase();

    // 1. Extract meaningful keywords (not just individual words)
    const keywords = extractKeywords(text);

    // 2. Get contextual hashtags based on content analysis
    const contextualHashtags = getContextualHashtags(text);

    // 3. Generate strategic hashtags
    const strategicHashtags = generateStrategicHashtags(keywords, text);

    // 4. Get trending/popular hashtags for the topic
    const trendingHashtags = getTrendingHashtags(text);

    // 5. Create branded/unique hashtags
    const brandedHashtags = createBrandedHashtags(keywords);

    // Combine and prioritize hashtags
    const allHashtags = [
      ...strategicHashtags.slice(0, 6), // Most important - strategic
      ...contextualHashtags.slice(0, 5), // Contextual relevance
      ...trendingHashtags.slice(0, 4), // Popular/trending
      ...brandedHashtags.slice(0, 3), // Unique combinations
      ...keywords.slice(0, 4).map((k) => `#${k.replace(/\s+/g, "")}`), // Clean keywords
    ];

    // Remove duplicates and limit to 25 hashtags
    const uniqueHashtags = Array.from(new Set(allHashtags))
      .filter((tag) => tag.length > 2 && tag.length < 30)
      .slice(0, 25);

    setHashtags(uniqueHashtags);
  };

  const extractKeywords = (text: string) => {
    // Enhanced stopwords list
    const stopwords = new Set([
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
      "a",
      "an",
      "as",
      "if",
      "then",
      "than",
      "when",
      "where",
      "why",
      "how",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "no",
      "nor",
      "not",
      "only",
      "own",
      "same",
      "so",
      "very",
      "just",
      "now",
      "get",
      "got",
      "make",
    ]);

    // Extract phrases and important words
    const words = text
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopwords.has(word));

    // Find important phrases (2-3 word combinations)
    const phrases = [];
    for (let i = 0; i < words.length - 1; i++) {
      const twoWord = `${words[i]} ${words[i + 1]}`;
      if (isImportantPhrase(twoWord)) {
        phrases.push(twoWord);
      }

      if (i < words.length - 2) {
        const threeWord = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        if (isImportantPhrase(threeWord)) {
          phrases.push(threeWord);
        }
      }
    }

    // Combine single words and phrases, prioritize by importance
    const allKeywords = [...phrases, ...words];
    return Array.from(new Set(allKeywords)).slice(0, 10);
  };

  const isImportantPhrase = (phrase: string) => {
    // Check if phrase contains important keywords or patterns
    const importantPatterns = [
      /\w+(ing|ed|er|est|ly)\s+\w+/, // Action words + noun
      /\w+\s+(tips|guide|tutorial|review|recipe|workout|style)/,
      /\w+\s+(photography|design|art|music|fitness|travel|food)/,
      /(best|top|amazing|incredible|perfect|ultimate|essential)\s+\w+/,
      /\w+\s+(challenge|inspiration|motivation|goals|success)/,
    ];

    return importantPatterns.some((pattern) =>
      pattern.test(phrase.toLowerCase())
    );
  };

  const generateStrategicHashtags = (
    keywords: string[],
    text: string
  ): string[] => {
    const strategic: string[] = [];

    // Create strategic combinations
    keywords.forEach((keyword) => {
      const cleanKeyword = keyword.replace(/\s+/g, "");

      // Add base keyword
      strategic.push(`#${cleanKeyword}`);

      // Add strategic suffixes based on context
      if (
        text.includes("tip") ||
        text.includes("advice") ||
        text.includes("how")
      ) {
        strategic.push(`#${cleanKeyword}tips`);
        strategic.push(`#${cleanKeyword}advice`);
      }

      if (
        text.includes("love") ||
        text.includes("passion") ||
        text.includes("enjoy")
      ) {
        strategic.push(`#${cleanKeyword}love`);
        strategic.push(`#${cleanKeyword}passion`);
      }

      if (
        text.includes("daily") ||
        text.includes("everyday") ||
        text.includes("routine")
      ) {
        strategic.push(`#daily${cleanKeyword}`);
        strategic.push(`#${cleanKeyword}daily`);
      }

      if (text.includes("inspiration") || text.includes("motivat")) {
        strategic.push(`#${cleanKeyword}inspiration`);
        strategic.push(`#${cleanKeyword}motivation`);
      }
    });

    return strategic;
  };

  const getTrendingHashtags = (text: string): string[] => {
    // Current trending hashtags by category
    const trendingMap = {
      "lifestyle|life|daily|routine": [
        "#lifestyle",
        "#dailyvibes",
        "#lifehacks",
        "#mindfulness",
        "#selfcare",
        "#positivevibes",
        "#inspiration",
        "#motivation",
        "#goals2024",
      ],
      "food|cooking|recipe|delicious|eat": [
        "#foodie",
        "#foodporn",
        "#yummy",
        "#delicious",
        "#homemade",
        "#foodblogger",
        "#instafood",
        "#tasty",
        "#cooking",
        "#recipe",
      ],
      "fitness|workout|gym|health|exercise": [
        "#fitness",
        "#workout",
        "#fitnessjourney",
        "#healthylifestyle",
        "#fitfam",
        "#gymlife",
        "#strength",
        "#cardio",
        "#wellness",
        "#fitspo",
      ],
      "travel|vacation|adventure|explore": [
        "#travel",
        "#wanderlust",
        "#vacation",
        "#adventure",
        "#explore",
        "#travelgram",
        "#instatravel",
        "#backpacking",
        "#roadtrip",
        "#getaway",
      ],
      "business|work|entrepreneur|success": [
        "#entrepreneur",
        "#business",
        "#success",
        "#hustle",
        "#mindset",
        "#businessowner",
        "#startup",
        "#leadership",
        "#productivity",
        "#growth",
      ],
      "tech|technology|coding|software|digital": [
        "#tech",
        "#technology",
        "#coding",
        "#programming",
        "#software",
        "#innovation",
        "#digital",
        "#ai",
        "#startup",
        "#developer",
      ],
      "art|creative|design|photography": [
        "#art",
        "#creative",
        "#design",
        "#artist",
        "#photography",
        "#creativity",
        "#artoftheday",
        "#instaart",
        "#artistic",
        "#visual",
      ],
      "fashion|style|outfit|beauty": [
        "#fashion",
        "#style",
        "#ootd",
        "#fashionista",
        "#beauty",
        "#trendy",
        "#styleinspo",
        "#fashionblogger",
        "#outfit",
        "#chic",
      ],
      "education|learning|study|knowledge": [
        "#education",
        "#learning",
        "#knowledge",
        "#study",
        "#growth",
        "#skills",
        "#development",
        "#training",
        "#wisdom",
        "#learneveryday",
      ],
    };

    const trending = [];
    for (const [pattern, tags] of Object.entries(trendingMap)) {
      if (new RegExp(pattern, "i").test(text)) {
        trending.push(...tags.slice(0, 4));
      }
    }

    // Add universal trending hashtags
    trending.push("#viral", "#trending", "#discover", "#explore", "#community");

    return trending;
  };

  const createBrandedHashtags = (keywords: string[]): string[] => {
    const branded: string[] = [];
    const prefixes = ["my", "daily", "love", "best", "amazing", "perfect"];
    const suffixes = [
      "life",
      "vibes",
      "goals",
      "journey",
      "experience",
      "story",
    ];

    keywords.slice(0, 3).forEach((keyword) => {
      const cleanKeyword = keyword.replace(/\s+/g, "");

      // Add some branded combinations
      prefixes.slice(0, 2).forEach((prefix) => {
        branded.push(`#${prefix}${cleanKeyword}`);
      });

      suffixes.slice(0, 2).forEach((suffix) => {
        branded.push(`#${cleanKeyword}${suffix}`);
      });
    });

    return branded;
  };

  const getContextualHashtags = (text: string): string[] => {
    const contextMap: Record<string, string[]> = {
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

    const matched: string[] = [];
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
