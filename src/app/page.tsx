import ToolSelector from "@/components/ToolSelector";

const toolCategories = [
  {
    name: "Generators",
    tools: [
      {
        name: "YouTube Title Generator",
        href: "/tools/youtube-title-generator",
        description: "Create attention-grabbing titles",
        icon: "🎥",
      },
      {
        name: "Random Number Generator",
        href: "/tools/random-number-generator",
        description: "Random numbers and presets",
        icon: "🎲",
      },
      {
        name: "Color Palette Generator",
        href: "/tools/color-palette-generator",
        description: "Create palettes from hex colors",
        icon: "🎨",
      },
      {
        name: "QR Code Generator",
        href: "/tools/qr-code-generator",
        description: "Create downloadable QR codes",
        icon: "📱",
      },
    ],
  },
  {
    name: "Converters",
    tools: [
      {
        name: "Image to Base64",
        href: "/tools/image-to-base64",
        description: "Convert images to Base64 strings",
        icon: "🖼️",
      },
      {
        name: "PDF Converter",
        href: "/tools/pdf-converter",
        description: "Export text to PDF locally",
        icon: "📄",
      },
      {
        name: "Image Converter",
        href: "/tools/image-converter",
        description: "PNG/JPEG/WebP conversion",
        icon: "🔄",
      },
      {
        name: "Unit Converter",
        href: "/tools/unit-converter",
        description: "Length, weight, temp and more",
        icon: "📏",
      },
      {
        name: "Base64 Converter",
        href: "/tools/base64-converter",
        description: "Encode/decode Base64 text",
        icon: "🔐",
      },
    ],
  },
  {
    name: "Calculators",
    tools: [
      {
        name: "BMI Calculator",
        href: "/tools/bmi-calculator",
        description: "Body Mass Index and health category",
        icon: "🏥",
      },
    ],
  },
  {
    name: "Text & Data Tools",
    tools: [
      {
        name: "JSON Formatter",
        href: "/tools/json-formatter",
        description: "Format, minify and validate JSON",
        icon: "📝",
      },
      {
        name: "Word Counter",
        href: "/tools/word-counter",
        description: "Live word & character counts",
        icon: "📊",
      },
      {
        name: "Text to Hashtags",
        href: "/tools/text-to-hashtags",
        description: "Generate hashtags from text",
        icon: "#️⃣",
      },
    ],
  },
  {
    name: "Other",
    tools: [
      {
        name: "YouTube Guide",
        href: "/tools/youtube-downloader",
        description: "Guide: downloader tools & methods",
        icon: "🎵",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold gradient-text mb-4">
          Tool Kit — Utilities
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A curated collection of browser-first utilities. Quick, private, and
          easy to use — pick a tool below.
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quick Launcher</h2>
            <p className="text-sm text-slate-500">
              Hover a card to preview; click to open the tool.
            </p>
          </div>
        </div>

        <ToolSelector categories={toolCategories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">🔒 Privacy-first</h3>
          <p className="text-sm text-slate-500">
            Most tools run entirely in your browser. No files are uploaded
            unless explicitly requested.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">⚡ Performance</h3>
          <p className="text-sm text-slate-500">
            Lightweight, fast, and optimized for developer workflows.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">♿ Accessibility</h3>
          <p className="text-sm text-slate-500">
            High-contrast text, keyboard friendly controls, and clear focus
            styles.
          </p>
        </div>
      </div>
    </div>
  );
}

