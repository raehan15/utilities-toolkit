const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Tool Kit</h3>
            <p className="text-slate-400 leading-relaxed">
              Free online tools to simplify your daily tasks. Privacy-focused
              and always free to use.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Quick Tools</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/tools/bmi-calculator"
                  className="text-slate-400 hover:text-teal-400 transition-colors font-medium"
                >
                  BMI Calculator
                </a>
              </li>
              <li>
                <a
                  href="/tools/json-formatter"
                  className="text-slate-400 hover:text-teal-400 transition-colors font-medium"
                >
                  JSON Formatter
                </a>
              </li>
              <li>
                <a
                  href="/tools/color-palette-generator"
                  className="text-slate-400 hover:text-teal-400 transition-colors font-medium"
                >
                  Color Palette Generator
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Features</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center">
                <span className="text-teal-400 mr-2">✅</span> No registration
                required
              </li>
              <li className="flex items-center">
                <span className="text-teal-400 mr-2">✅</span> All processing
                happens locally
              </li>
              <li className="flex items-center">
                <span className="text-teal-400 mr-2">✅</span> Mobile-friendly
                design
              </li>
              <li className="flex items-center">
                <span className="text-teal-400 mr-2">✅</span> Fast and reliable
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-center">
          <p className="text-slate-400">
            &copy; 2025 Tool Kit. Made with{" "}
            <span className="text-red-400">❤️</span> for productivity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
