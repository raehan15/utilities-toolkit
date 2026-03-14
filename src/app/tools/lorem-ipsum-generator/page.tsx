"use client";

import { useState } from "react";

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [generatedText, setGeneratedText] = useState("");
  const [startWithLorem, setStartWithLorem] = useState(true);

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "vivamus", "lacus",
    "vel", "augue", "laoreet", "rutrum", "faucibus", "auctor", "nullam", "quidem",
    "etiam", "praesent", "luctus", "interdum", "posuere", "cubilia", "curae",
    "donec", "velit", "justo", "fringilla", "vitae", "eleifend", "massa", "sagittis",
    "semper", "eget", "dui", "nunc", "mattis", "enim", "nam", "mauris", "congue",
    "nisi", "porta", "lobortis", "suspendisse", "potenti", "cras", "pharetra",
    "pellentesque", "habitant", "morbi", "tristique", "senectus", "netus", "turpis",
    "egestas", "pretium", "aenean", "imperdiet", "diam", "venenatis", "placerat",
    "tortor", "condimentum", "neque", "sapien", "ornare", "rhoncus", "tellus",
    "molestie", "arcu", "fermentum", "iaculis", "urna", "porttitor", "odio"
  ];

  const generateParagraph = (wordCount: number, isFirst: boolean): string => {
    const words: string[] = [];
    
    if (isFirst && startWithLorem) {
      words.push("Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit.");
      wordCount -= 8;
    }

    while (words.length < wordCount + (isFirst && startWithLorem ? 8 : 0)) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      
      // Capitalize first word of sentence
      if (words.length === 0 || words[words.length - 1].endsWith(".")) {
        words.push(randomWord.charAt(0).toUpperCase() + randomWord.slice(1));
      } else {
        words.push(randomWord);
      }

      // Add punctuation
      if (words.length > 5 && Math.random() < 0.1) {
        words[words.length - 1] += ".";
      } else if (Math.random() < 0.15) {
        words[words.length - 1] += ",";
      }
    }

    // Ensure paragraph ends with period
    let paragraph = words.join(" ");
    if (!paragraph.endsWith(".")) {
      paragraph = paragraph.replace(/[,]$/, "") + ".";
    }

    return paragraph;
  };

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(generateParagraph(wordsPerParagraph, i === 0));
    }
    setGeneratedText(result.join("\n\n"));
  };

  const copyText = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText).then(() => {
      alert("Lorem ipsum text copied to clipboard!");
    });
  };

  const copyHtml = () => {
    if (!generatedText) return;
    const html = generatedText
      .split("\n\n")
      .map((p) => `<p>${p}</p>`)
      .join("\n");
    navigator.clipboard.writeText(html).then(() => {
      alert("HTML paragraphs copied to clipboard!");
    });
  };

  const reset = () => {
    setGeneratedText("");
    setParagraphs(3);
    setWordsPerParagraph(50);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📜 Lorem Ipsum Generator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate placeholder text for your designs, mockups, and layouts.
          Customize the length and format to fit your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Paragraphs: {paragraphs}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Words per Paragraph: {wordsPerParagraph}
              </label>
              <input
                type="range"
                min="20"
                max="150"
                step="10"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>20</span>
                <span>150</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="startWithLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <label htmlFor="startWithLorem" className="text-sm text-slate-700">
                Start with &quot;Lorem ipsum dolor sit amet...&quot;
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Generate Lorem Ipsum
            </button>

            <button
              onClick={reset}
              className="w-full py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {/* Quick Stats */}
          {generatedText && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">Statistics</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p>Paragraphs: {generatedText.split("\n\n").length}</p>
                <p>Words: {generatedText.split(/\s+/).length}</p>
                <p>Characters: {generatedText.length}</p>
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Generated Text</h2>
            {generatedText && (
              <div className="flex gap-2">
                <button
                  onClick={copyText}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Copy Text
                </button>
                <button
                  onClick={copyHtml}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Copy HTML
                </button>
              </div>
            )}
          </div>

          {generatedText ? (
            <div className="h-[400px] overflow-y-auto p-4 bg-slate-50 rounded-lg border border-slate-200">
              {generatedText.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-slate-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-center text-slate-500">
                <div className="text-5xl mb-4">📜</div>
                <p>Click &quot;Generate Lorem Ipsum&quot; to create placeholder text</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          📚 About Lorem Ipsum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <h4 className="font-medium text-slate-800 mb-2">What is Lorem Ipsum?</h4>
            <p>
              Lorem Ipsum is placeholder text commonly used in the printing and
              typesetting industry. It has been the industry&apos;s standard dummy
              text since the 1500s.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Why use it?</h4>
            <p>
              It helps designers and developers focus on visual elements without
              being distracted by readable content. The text has a natural
              distribution of letters, making it look like real text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
