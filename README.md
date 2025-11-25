# All-in-One Utilities 🛠️

A modern, responsive web application built with Next.js 14, TypeScript, and TailwindCSS that provides a collection of useful online tools.

## 🚀 Features

### Available Tools

1. **BMI Calculator** - Calculate Body Mass Index with health category information
2. **YouTube Title Generator** - Generate engaging YouTube titles from keywords
3. **JSON Formatter** - Format, minify, and validate JSON data
4. **Random Number Generator** - Generate random numbers within specified ranges
5. **Color Palette Generator** - Create beautiful color palettes from hex colors
6. **Image to Base64 Converter** - Convert images to Base64 encoded strings
7. **Loan/EMI Calculator** - Calculate monthly EMI and interest details
8. **Word Counter** - Count words, characters, sentences, and paragraphs
9. **QR Code Generator** - Generate downloadable QR codes from text or URLs

### Key Highlights

- ✅ **Privacy First**: All processing happens in your browser
- ✅ **No Backend Required**: Pure client-side functionality
- ✅ **Responsive Design**: Works perfectly on all devices
- ✅ **SEO Optimized**: Proper meta tags and structure
- ✅ **Modern UI**: Clean design with TailwindCSS
- ✅ **TypeScript**: Type-safe development

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd toolkit-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the 'out' directory to Netlify
```

## 🎨 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── tools/
│       ├── bmi-calculator/
│       ├── youtube-title-generator/
│       ├── json-formatter/
│       ├── random-number-generator/
│       └── color-palette-generator/
└── components/
    ├── Navbar.tsx
    └── Footer.tsx
```

## 🌟 Features in Detail

### BMI Calculator

- Calculate BMI from height (cm) and weight (kg)
- Health category classification
- Visual BMI chart reference

### YouTube Title Generator

- 15+ engaging title templates
- Keyword-based title generation
- Copy titles with one click

### JSON Formatter

- Format and prettify JSON
- Minify JSON for production
- Validate JSON syntax
- Syntax error highlighting

### Random Number Generator

- Custom min/max ranges
- Quick presets (dice, coin, etc.)
- Generate multiple numbers
- Number history tracking

### Color Palette Generator

- Generate palettes from hex colors
- Complementary and analogous colors
- Light/dark variations
- Click to copy color codes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!
