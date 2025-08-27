"use client";

import { useState, useRef } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!input.trim()) {
      setError("Please enter text or URL to generate QR code");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, input, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        // Also generate data URL for download
        const dataUrl = await QRCode.toDataURL(input, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(dataUrl);
      }
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      alert("QR code copied to clipboard!");
    } catch (err) {
      alert("Failed to copy QR code to clipboard");
    }
  };

  const presets = [
    { label: "Website URL", value: "https://example.com" },
    { label: "Wi-Fi Network", value: "WIFI:T:WPA;S:NetworkName;P:password;;" },
    { label: "Email", value: "mailto:someone@example.com" },
    { label: "Phone Number", value: "tel:+1234567890" },
    { label: "SMS", value: "sms:+1234567890?body=Hello" },
    { label: "WhatsApp", value: "https://wa.me/1234567890" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📱 QR Code Generator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate downloadable QR codes from any text or URL. Perfect for
          sharing links, contact information, Wi-Fi credentials, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Enter Text or URL
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Text or URL
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text, URL, or any content to generate QR code..."
                className="input-field h-32 resize-none"
              />
            </div>

            {/* Presets */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setInput(preset.value)}
                    className="p-3 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-left border border-blue-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateQRCode}
              disabled={isGenerating || !input.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
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
                  Generating...
                </span>
              ) : (
                "Generate QR Code"
              )}
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
            Generated QR Code
          </h2>

          <div className="space-y-6">
            {qrCodeUrl ? (
              <>
                <div className="text-center">
                  <canvas
                    ref={canvasRef}
                    className="mx-auto border-2 border-gray-200 rounded-lg shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={downloadQRCode}
                    className="btn-primary flex items-center justify-center space-x-2"
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
                    <span>Download</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary flex items-center justify-center space-x-2"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy</span>
                  </button>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">
                    <strong>QR Code generated successfully!</strong> You can
                    download it as a PNG image or copy it to your clipboard.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-slate-500 text-lg">
                  Enter text or URL and click &quot;Generate QR Code&quot; to
                  create your QR code
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          QR Code Types & Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Common Use Cases
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Website URLs and landing pages</li>
              <li>• Contact information (vCard)</li>
              <li>• Wi-Fi network credentials</li>
              <li>• Social media profiles</li>
              <li>• Email addresses</li>
              <li>• Phone numbers</li>
              <li>• SMS messages</li>
              <li>• WhatsApp links</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Tips for Better QR Codes
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Keep content concise for better scanning</li>
              <li>• Test with different QR code readers</li>
              <li>• Ensure sufficient contrast when printing</li>
              <li>• Add a quiet zone (white space) around the code</li>
              <li>• Use high-quality images for printing</li>
              <li>• Consider the scanning distance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
