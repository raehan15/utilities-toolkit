"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function PDFConverter() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generatePDF = () => {
    if (!text.trim()) {
      setError("Please enter some text to convert to PDF");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const doc = new jsPDF();

      // Add title if provided
      if (title.trim()) {
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(title.trim(), 20, 30);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
      }

      // Split text into lines that fit the page width
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxLineWidth = pageWidth - margin * 2;

      const lines = doc.splitTextToSize(text, maxLineWidth);

      // Add text to PDF
      const startY = title.trim() ? 50 : 30;
      doc.text(lines, margin, startY);

      // Generate filename
      const filename = title.trim()
        ? `${title.trim().replace(/[^a-zA-Z0-9]/g, "_")}.pdf`
        : `document_${Date.now()}.pdf`;

      // Download the PDF
      doc.save(filename);
    } catch (err) {
      setError("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setText("");
    setTitle("");
    setError("");
  };

  const sampleTexts = [
    {
      title: "Business Letter",
      content: `Dear Sir/Madam,

I am writing to inquire about your services. We are a growing company looking for reliable partners to help us expand our operations.

Could you please provide us with more information about your offerings and pricing structure? We would appreciate the opportunity to discuss this further.

Thank you for your time and consideration.

Best regards,
John Smith
CEO, Example Company`,
    },
    {
      title: "Meeting Notes",
      content: `Meeting Notes - Project Review
Date: ${new Date().toLocaleDateString()}

Attendees:
- Team Lead
- Project Manager
- Developers

Agenda:
1. Review current progress
2. Discuss upcoming deadlines
3. Address any blockers

Action Items:
- Complete feature development by Friday
- Schedule client demo for next week
- Update project documentation`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📄 PDF Converter
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert your text content into professional PDF documents instantly.
          Perfect for reports, letters, and documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Create PDF Document
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Document Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Document Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text content here..."
                className="input-field h-64 resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generatePDF}
                disabled={isGenerating || !text.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                  "Generate PDF"
                )}
              </button>
              <button onClick={reset} className="py-3 px-6 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium">
                Reset
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sample Templates */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Quick Templates
          </h2>

          <div className="space-y-4">
            {sampleTexts.map((sample, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold text-slate-800 mb-2">
                  {sample.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                  {sample.content.substring(0, 100)}...
                </p>
                <button
                  onClick={() => {
                    setTitle(sample.title);
                    setText(sample.content);
                  }}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Use This Template
                </button>
              </div>
            ))}
          </div>

          {/* PDF Features */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              PDF Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Automatic text wrapping</li>
              <li>• Custom document titles</li>
              <li>• Professional formatting</li>
              <li>• Instant download</li>
              <li>• No file size limits</li>
              <li>• Privacy-focused (client-side only)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          About PDF Converter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Use Cases
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Create professional documents</li>
              <li>• Convert notes to PDF format</li>
              <li>• Generate reports and letters</li>
              <li>• Share formatted documents</li>
              <li>• Archive important text content</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Benefits
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Universal compatibility</li>
              <li>• Professional appearance</li>
              <li>• Easy to share and print</li>
              <li>• Preserves formatting</li>
              <li>• No software installation required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
