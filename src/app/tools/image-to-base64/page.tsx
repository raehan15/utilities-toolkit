"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageToBase64() {
  const [base64Result, setBase64Result] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setLoading(true);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64Result(result);
      setImagePreview(result);
      setLoading(false);
    };

    reader.onerror = () => {
      alert("Error reading file");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const copyBase64 = () => {
    navigator.clipboard
      .writeText(base64Result)
      .then(() => {
        alert("Base64 string copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy Base64 string");
      });
  };

  const copyBase64Only = () => {
    const base64Only = base64Result.split(",")[1]; // Remove data:image/...;base64, prefix
    navigator.clipboard
      .writeText(base64Only)
      .then(() => {
        alert("Base64 string (without data URI prefix) copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy Base64 string");
      });
  };

  const downloadAsText = () => {
    const blob = new Blob([base64Result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_base64.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setBase64Result("");
    setImagePreview("");
    setFileName("");
    setFileSize("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Image to Base64 Converter
          </h1>
          <p className="text-slate-600 text-lg">
            Convert images to Base64 encoded strings for web development and
            data embedding
          </p>
        </div>

        <div className="space-y-8">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!imagePreview && (
              <div>
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Upload an Image
                </h3>
                <p className="text-slate-600 mb-4">
                  Supports JPG, PNG, GIF, WebP, and other image formats
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Maximum file size: 10MB
                </p>
                <button
                  onClick={triggerFileSelect}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-8 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
                >
                  Choose Image
                </button>
              </div>
            )}

            {imagePreview && (
              <div>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="max-w-full max-h-64 mx-auto mb-4 rounded-lg shadow-md object-contain"
                  unoptimized
                />
                <div className="text-sm text-slate-600 mb-4">
                  <p>
                    <strong>File:</strong> {fileName}
                  </p>
                  <p>
                    <strong>Size:</strong> {fileSize}
                  </p>
                </div>
                <button
                  onClick={triggerFileSelect}
                  className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Choose Different Image
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Converting image...</p>
            </div>
          )}

          {base64Result && !loading && (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={copyBase64}
                  className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Copy Full Data URI
                </button>
                <button
                  onClick={copyBase64Only}
                  className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Copy Base64 Only
                </button>
                <button
                  onClick={downloadAsText}
                  className="bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Download as .txt
                </button>
                <button
                  onClick={reset}
                  className="bg-slate-600 text-white py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Base64 Output */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Base64 Output
                </h3>
                <div className="relative">
                  <textarea
                    value={base64Result}
                    readOnly
                    className="w-full h-40 p-4 border-2 border-slate-200 rounded-lg font-mono text-xs bg-white resize-none"
                    placeholder="Base64 encoded string will appear here..."
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">
                      {base64Result.length.toLocaleString()} characters
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            🖼️ Usage Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              • <strong>Full Data URI:</strong> Include this directly in
              HTML/CSS (src=&quot;data:image/...base64,...&quot;)
            </li>
            <li>
              • <strong>Base64 Only:</strong> Just the encoded string for APIs
              or databases
            </li>
            <li>
              • Base64 images are larger than original files (~33% increase)
            </li>
            <li>• Perfect for embedding small images directly in code</li>
            <li>• Useful for email templates and offline applications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
