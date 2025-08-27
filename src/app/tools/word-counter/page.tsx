"use client";

import { useState, useEffect } from "react";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  averageWordsPerSentence: number;
  averageCharactersPerWord: number;
  readingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    averageWordsPerSentence: 0,
    averageCharactersPerWord: 0,
    readingTime: 0,
  });

  const calculateStats = (inputText: string): TextStats => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, "").length;

    // Count words (split by whitespace and filter empty strings)
    const wordArray = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const words = inputText.trim() === "" ? 0 : wordArray.length;

    // Count sentences (split by sentence endings)
    const sentenceArray = inputText
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0);
    const sentences = inputText.trim() === "" ? 0 : sentenceArray.length;

    // Count paragraphs (split by double line breaks or single line breaks)
    const paragraphArray = inputText
      .split(/\n\s*\n|\n/)
      .filter((para) => para.trim().length > 0);
    const paragraphs = inputText.trim() === "" ? 0 : paragraphArray.length;

    // Calculate averages
    const averageWordsPerSentence =
      sentences > 0 ? Math.round((words / sentences) * 100) / 100 : 0;
    const averageCharactersPerWord =
      words > 0 ? Math.round((charactersNoSpaces / words) * 100) / 100 : 0;

    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTime = words > 0 ? Math.ceil(words / 200) : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      averageWordsPerSentence,
      averageCharactersPerWord,
      readingTime,
    };
  };

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const clearText = () => {
    setText("");
  };

  const loadSampleText = () => {
    const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
    setText(sampleText);
  };

  const copyStats = () => {
    const statsText = `Text Statistics:
Characters: ${stats.characters.toLocaleString()}
Characters (no spaces): ${stats.charactersNoSpaces.toLocaleString()}
Words: ${stats.words.toLocaleString()}
Sentences: ${stats.sentences.toLocaleString()}
Paragraphs: ${stats.paragraphs.toLocaleString()}
Average words per sentence: ${stats.averageWordsPerSentence}
Average characters per word: ${stats.averageCharactersPerWord}
Estimated reading time: ${stats.readingTime} minute${
      stats.readingTime !== 1 ? "s" : ""
    }`;

    navigator.clipboard
      .writeText(statsText)
      .then(() => {
        alert("Statistics copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy statistics");
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Word & Character Counter
          </h1>
          <p className="text-slate-600 text-lg">
            Analyze your text with detailed word count, character count, and
            readability statistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                Enter Your Text
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={loadSampleText}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Load Sample
                </button>
                <button
                  onClick={clearText}
                  className="text-sm text-slate-600 hover:text-slate-700 font-medium px-3 py-1 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here to see live statistics..."
              className="w-full h-96 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white resize-none text-base leading-relaxed"
            />

            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Live counting as you type</span>
              <span>
                {text.length > 0
                  ? `${text.length} characters`
                  : "No text entered"}
              </span>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Statistics</h3>
              {stats.words > 0 && (
                <button
                  onClick={copyStats}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Copy Stats
                </button>
              )}
            </div>

            {/* Main Stats Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stats.characters.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    Characters
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {stats.charactersNoSpaces.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    Characters (no spaces)
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {stats.words.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    Words
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {stats.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    Sentences
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-1">
                    {stats.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    Paragraphs
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            {stats.words > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 text-center">
                  Readability
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg. words/sentence:</span>
                    <span className="font-medium text-slate-800">
                      {stats.averageWordsPerSentence}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg. chars/word:</span>
                    <span className="font-medium text-slate-800">
                      {stats.averageCharactersPerWord}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3">
                    <span className="text-slate-600">Reading time:</span>
                    <span className="font-bold text-indigo-600">
                      {stats.readingTime} min
                      {stats.readingTime !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            📊 Usage Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              • <strong>SEO Content:</strong> Aim for 300+ words for blog posts
            </li>
            <li>
              • <strong>Social Media:</strong> Twitter: 280 chars, Facebook: 63
              chars optimal
            </li>
            <li>
              • <strong>Readability:</strong> 15-20 words per sentence is ideal
            </li>
            <li>
              • <strong>Academic Writing:</strong> Longer sentences (20-25
              words) are acceptable
            </li>
            <li>• Reading time is based on 200 words per minute average</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
