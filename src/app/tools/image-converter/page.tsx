"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [outputFormat, setOutputFormat] = useState("png");
  const [quality, setQuality] = useState(0.9);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const supportedFormats = ["png", "jpeg", "webp"];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setError("");
        setConvertedImage("");
      } else {
        setError("Please select a valid image file");
      }
    }
  };

  const convertImage = async () => {
    if (!selectedFile) {
      setError("Please select an image file first");
      return;
    }

    setIsConverting(true);
    setError("");

    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error("Canvas not available");
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      // Load the image
      const img = new globalThis.Image();
      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Convert to desired format
        const mimeType = `image/${outputFormat}`;
        const dataUrl = canvas.toDataURL(mimeType, quality);
        setConvertedImage(dataUrl);
        setIsConverting(false);
      };

      img.onerror = () => {
        setError("Failed to load image");
        setIsConverting(false);
      };

      // Load image from file
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError("Failed to convert image. Please try again.");
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.download = `converted_${Date.now()}.${outputFormat}`;
    link.href = convertedImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setSelectedFile(null);
    setConvertedImage("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileSize = (dataUrl: string) => {
    const base64Data = dataUrl.split(",")[1];
    const byteLength = Math.round((base64Data.length * 3) / 4);
    if (byteLength < 1024) return `${byteLength} B`;
    if (byteLength < 1024 * 1024) return `${(byteLength / 1024).toFixed(1)} KB`;
    return `${(byteLength / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          🖼️ Image Converter
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert images between different formats (PNG, JPEG, WebP) with
          customizable quality settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Upload & Convert
          </h2>

          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Image File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="input-field"
              />
              {selectedFile && (
                <p className="text-sm text-slate-600 mt-2">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="input-field"
              >
                {supportedFormats.map((format) => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality Slider */}
            {(outputFormat === "jpeg" || outputFormat === "webp") && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Convert Button */}
            <button
              onClick={convertImage}
              disabled={!selectedFile || isConverting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Converting...
                </span>
              ) : (
                "Convert Image"
              )}
            </button>

            <button onClick={reset} className="w-full py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium">
              Reset
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Converted Image
          </h2>

          {convertedImage ? (
            <div className="space-y-6">
              <div className="text-center">
                <Image
                  src={convertedImage}
                  alt="Converted"
                  width={300}
                  height={200}
                  className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                  unoptimized
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Conversion Complete!
                </h3>
                <p className="text-sm text-green-700">
                  Format: {outputFormat.toUpperCase()} | Size:{" "}
                  {getFileSize(convertedImage)}
                </p>
              </div>

              <button
                onClick={downloadImage}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Converted Image</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-slate-500 text-lg">
                Upload an image and click &quot;Convert&quot; to see the result
                here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for conversion */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Info Section */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Supported Formats & Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Supported Input Formats
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• JPEG / JPG</li>
              <li>• PNG</li>
              <li>• WebP</li>
              <li>• GIF</li>
              <li>• BMP</li>
              <li>• TIFF</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Output Formats
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• PNG (lossless)</li>
              <li>• JPEG (adjustable quality)</li>
              <li>• WebP (modern format)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Quality adjustment</li>
              <li>• Instant preview</li>
              <li>• File size optimization</li>
              <li>• Batch conversion ready</li>
              <li>• No upload to servers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
