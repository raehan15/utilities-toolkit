"use client";

import { useState } from "react";

interface Color {
  hex: string;
  name: string;
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#0EA5A4");
  const [palette, setPalette] = useState<Color[]>([]);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generatePalette = () => {
    if (!baseColor.match(/^#[0-9A-F]{6}$/i)) {
      alert("Please enter a valid hex color (e.g., #FF5733)");
      return;
    }

    const [h, s, l] = hexToHsl(baseColor);
    const colors: Color[] = [];

    // Base color
    colors.push({
      hex: baseColor.toUpperCase(),
      name: "Base Color",
    });

    // Lighter shade
    colors.push({
      hex: hslToHex(h, s, Math.min(l + 20, 90)).toUpperCase(),
      name: "Light",
    });

    // Darker shade
    colors.push({
      hex: hslToHex(h, s, Math.max(l - 20, 10)).toUpperCase(),
      name: "Dark",
    });

    // Complementary color
    colors.push({
      hex: hslToHex((h + 180) % 360, s, l).toUpperCase(),
      name: "Complementary",
    });

    // Analogous color
    colors.push({
      hex: hslToHex((h + 30) % 360, s, l).toUpperCase(),
      name: "Analogous",
    });

    setPalette(colors);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard
      .writeText(hex)
      .then(() => {
        alert(`${hex} copied to clipboard!`);
      })
      .catch(() => {
        alert("Failed to copy color");
      });
  };

  const copyPalette = () => {
    const paletteText = palette
      .map((color) => `${color.name}: ${color.hex}`)
      .join("\n");
    navigator.clipboard
      .writeText(paletteText)
      .then(() => {
        alert("Full palette copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy palette");
      });
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#FF7F7F",
      "#FFB6C1",
      "#87CEEB",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBaseColor(randomColor);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Color Palette Generator
          </h1>
          <p className="text-gray-600">
            Create beautiful color palettes from any base hex color
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label
                htmlFor="baseColor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Base Hex Color
              </label>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg border border-gray-300 shadow-sm"
                  style={{ backgroundColor: baseColor }}
                ></div>
                <input
                  type="text"
                  id="baseColor"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  placeholder="#0EA5A4"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={getRandomColor}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Random
              </button>
              <button
                onClick={generatePalette}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Generate Palette
              </button>
            </div>
          </div>

          {palette.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Generated Palette
                </h3>
                <button
                  onClick={copyPalette}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  Copy All Colors
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  >
                    <div
                      className="h-24 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex)}
                    ></div>
                    <div className="p-3 text-center">
                      <p className="font-medium text-gray-900 text-sm mb-1">
                        {color.name}
                      </p>
                      <p
                        className="text-xs font-mono text-gray-600 cursor-pointer hover:text-teal-600"
                        onClick={() => copyColor(color.hex)}
                      >
                        {color.hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-5 gap-2">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="h-3 cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex)}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🎨 Color Theory
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • <strong>Base:</strong> Your starting color
              </li>
              <li>
                • <strong>Light/Dark:</strong> Tints and shades of the base
              </li>
              <li>
                • <strong>Complementary:</strong> Opposite on color wheel
              </li>
              <li>
                • <strong>Analogous:</strong> Adjacent on color wheel
              </li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Usage Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Click any color to copy its hex code</li>
              <li>• Use complementary colors for high contrast</li>
              <li>• Analogous colors create harmony</li>
              <li>• Light/dark variants for UI elements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
