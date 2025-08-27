import Link from "next/link";

const tools = [
  {
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index and get health category information",
    href: "/tools/bmi-calculator",
    icon: "🏥",
  },
  {
    name: "YouTube Title Generator",
    description: "Generate engaging YouTube titles for your video content",
    href: "/tools/youtube-title-generator",
    icon: "🎥",
  },
  {
    name: "JSON Formatter",
    description: "Format and prettify your JSON data with syntax highlighting",
    href: "/tools/json-formatter",
    icon: "📝",
  },
  {
    name: "Random Number Generator",
    description: "Generate random numbers within your specified range",
    href: "/tools/random-number-generator",
    icon: "🎲",
  },
  {
    name: "Color Palette Generator",
    description: "Create beautiful color palettes from a base hex color",
    href: "/tools/color-palette-generator",
    icon: "🎨",
  },
  {
    name: "Text to Hashtags Generator",
    description: "Generate relevant hashtags from any text or topic",
    href: "/tools/text-to-hashtags",
    icon: "#️⃣",
  },
  {
    name: "Image to Base64 Converter",
    description: "Convert images to Base64 encoded strings instantly",
    href: "/tools/image-to-base64",
    icon: "🖼️",
  },
  {
    name: "Loan / EMI Calculator",
    description: "Calculate monthly EMI, total interest, and repayment details",
    href: "/tools/loan-emi-calculator",
    icon: "💰",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs",
    href: "/tools/word-counter",
    icon: "📊",
  },
  {
    name: "QR Code Generator",
    description: "Generate downloadable QR codes from text or URLs",
    href: "/tools/qr-code-generator",
    icon: "📱",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
          All-in-One Utilities
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A collection of powerful online tools designed to boost your
          productivity. All processing happens locally in your browser - your
          data stays private and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-12">
          Why Choose Our Tools?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-100">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-slate-800 mb-3 text-lg">
              Privacy First
            </h3>
            <p className="text-slate-600 leading-relaxed">
              All processing happens in your browser. No data is sent to our
              servers.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-yellow-100">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-slate-800 mb-3 text-lg">
              Fast & Reliable
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Instant results with no loading times or server delays.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-purple-100">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="font-bold text-slate-800 mb-3 text-lg">
              Always Free
            </h3>
            <p className="text-slate-600 leading-relaxed">
              No subscriptions, no hidden fees. Use all tools completely free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
