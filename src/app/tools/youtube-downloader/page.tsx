"use client";

import { useState } from "react";
import Image from "next/image";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const validateYouTubeUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/(www\.)?youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
    ];
    return patterns.some((pattern) => pattern.test(url));
  };

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    const valid = validateYouTubeUrl(newUrl);
    setIsValidUrl(valid);

    if (valid) {
      const videoId = extractVideoId(newUrl);
      setVideoInfo({
        id: videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        title: "Video Title (Preview)",
        duration: "00:00",
      });
    } else {
      setVideoInfo(null);
    }
  };

  const downloadOptions = [
    {
      format: "MP3",
      quality: "320kbps",
      size: "~8MB",
      description: "High Quality Audio",
    },
    {
      format: "MP3",
      quality: "192kbps",
      size: "~5MB",
      description: "Standard Quality Audio",
    },
    {
      format: "MP3",
      quality: "128kbps",
      size: "~3MB",
      description: "Good Quality Audio",
    },
    {
      format: "MP4",
      quality: "1080p",
      size: "~50MB",
      description: "Full HD Video",
    },
    { format: "MP4", quality: "720p", size: "~25MB", description: "HD Video" },
    {
      format: "MP4",
      quality: "480p",
      size: "~15MB",
      description: "Standard Video",
    },
  ];

  const popularConverters = [
    {
      name: "yt-dlp",
      description: "Command-line tool",
      link: "https://github.com/yt-dlp/yt-dlp",
    },
    {
      name: "4K Video Downloader",
      description: "Desktop application",
      link: "https://www.4kdownload.com/",
    },
    {
      name: "JDownloader",
      description: "Multi-platform downloader",
      link: "https://jdownloader.org/",
    },
    {
      name: "youtube-dl",
      description: "Python-based tool",
      link: "https://youtube-dl.org/",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🎵 YouTube Downloader Guide
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Learn how to download YouTube videos and convert them to MP3 using
          reliable tools and methods.
        </p>
      </div>

      {/* Important Notice */}
      <div className="card p-6 mb-8 border-l-4 border-yellow-400 bg-yellow-50">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.118 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Important Legal Notice
            </h3>
            <p className="text-yellow-700 text-sm leading-relaxed">
              This tool provides information about YouTube downloading methods
              for educational purposes. Please respect copyright laws and
              YouTube&apos;s Terms of Service. Only download content you own or
              have permission to download.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* URL Input Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Video URL Analysis
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`input-field ${
                  isValidUrl
                    ? "border-green-300 bg-green-50"
                    : url
                    ? "border-red-300 bg-red-50"
                    : ""
                }`}
              />
              {url && (
                <p
                  className={`text-sm mt-2 ${
                    isValidUrl ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isValidUrl ? "✓ Valid YouTube URL" : "✗ Invalid YouTube URL"}
                </p>
              )}
            </div>

            {videoInfo && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">
                  Video Preview
                </h3>
                <div className="flex items-start space-x-4">
                  <Image
                    src={videoInfo.thumbnail}
                    alt="Thumbnail"
                    width={96}
                    height={72}
                    className="w-24 h-18 object-cover rounded"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMTIwIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjkwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw3MiA1NEw0OCA2OFY0MFoiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+";
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600">
                      Video ID: {videoInfo.id}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Preview mode - actual title would appear here
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isValidUrl && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Available Download Options
                </h3>
                {downloadOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-slate-800">
                          {option.format} - {option.quality}
                        </span>
                        <p className="text-sm text-slate-600">
                          {option.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">~{option.size}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1">
                          Select Format
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tools & Methods */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Recommended Tools
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Popular Download Tools
              </h3>
              <div className="space-y-3">
                {popularConverters.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {tool.description}
                        </p>
                      </div>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Browser Extensions
              </h3>
              <p className="text-sm text-blue-700">
                Several browser extensions can add download buttons directly to
                YouTube. Search for &quot;Video DownloadHelper&quot; or similar
                extensions in your browser&apos;s store.
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Command Line Method
              </h3>
              <p className="text-sm text-green-700 mb-2">
                For technical users, yt-dlp is the most reliable option:
              </p>
              <code className="block bg-green-100 p-2 rounded text-xs text-green-800">
                yt-dlp -x --audio-format mp3 &quot;VIDEO_URL&quot;
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* How-to Guide */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Step-by-Step Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Method 1: Using yt-dlp (Recommended)
            </h3>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span>
                  Install yt-dlp from the official website or package manager
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span>Open terminal/command prompt</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  3
                </span>
                <span>
                  Run: yt-dlp -x --audio-format mp3 &quot;YouTube_URL&quot;
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  4
                </span>
                <span>Wait for download and conversion to complete</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Method 2: Desktop Application
            </h3>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span>Download and install 4K Video Downloader</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span>Copy YouTube video URL</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  3
                </span>
                <span>Paste URL into the application</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                  4
                </span>
                <span>Select MP3 format and quality, then download</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Legal Information */}
      <div className="mt-8 card p-8 bg-gray-50 border-gray-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Legal Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              ✅ Allowed Uses
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Personal backup of your own uploaded videos</li>
              <li>• Content explicitly marked as Creative Commons</li>
              <li>• Educational use with proper attribution (fair use)</li>
              <li>• Content with explicit download permission</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              ❌ Prohibited Uses
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Downloading copyrighted music without permission</li>
              <li>• Commercial redistribution of downloaded content</li>
              <li>• Violating YouTube&apos;s Terms of Service</li>
              <li>• Downloading content for profit without licensing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
