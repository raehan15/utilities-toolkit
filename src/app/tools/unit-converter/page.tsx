"use client";

import { useState } from "react";

type ConversionCategory = {
  name: string;
  units: { [key: string]: { name: string; factor: number } };
  baseUnit: string;
};

const conversionCategories: { [key: string]: ConversionCategory } = {
  length: {
    name: "Length",
    baseUnit: "m",
    units: {
      mm: { name: "Millimeters", factor: 0.001 },
      cm: { name: "Centimeters", factor: 0.01 },
      m: { name: "Meters", factor: 1 },
      km: { name: "Kilometers", factor: 1000 },
      in: { name: "Inches", factor: 0.0254 },
      ft: { name: "Feet", factor: 0.3048 },
      yd: { name: "Yards", factor: 0.9144 },
      mi: { name: "Miles", factor: 1609.34 },
    },
  },
  weight: {
    name: "Weight",
    baseUnit: "kg",
    units: {
      mg: { name: "Milligrams", factor: 0.000001 },
      g: { name: "Grams", factor: 0.001 },
      kg: { name: "Kilograms", factor: 1 },
      oz: { name: "Ounces", factor: 0.0283495 },
      lb: { name: "Pounds", factor: 0.453592 },
      ton: { name: "Metric Tons", factor: 1000 },
    },
  },
  temperature: {
    name: "Temperature",
    baseUnit: "K",
    units: {
      C: { name: "Celsius", factor: 1 },
      F: { name: "Fahrenheit", factor: 1 },
      K: { name: "Kelvin", factor: 1 },
    },
  },
  area: {
    name: "Area",
    baseUnit: "m2",
    units: {
      mm2: { name: "Square Millimeters", factor: 0.000001 },
      cm2: { name: "Square Centimeters", factor: 0.0001 },
      m2: { name: "Square Meters", factor: 1 },
      km2: { name: "Square Kilometers", factor: 1000000 },
      in2: { name: "Square Inches", factor: 0.00064516 },
      ft2: { name: "Square Feet", factor: 0.092903 },
      ac: { name: "Acres", factor: 4046.86 },
    },
  },
  volume: {
    name: "Volume",
    baseUnit: "L",
    units: {
      ml: { name: "Milliliters", factor: 0.001 },
      L: { name: "Liters", factor: 1 },
      gal: { name: "Gallons (US)", factor: 3.78541 },
      qt: { name: "Quarts", factor: 0.946353 },
      pt: { name: "Pints", factor: 0.473176 },
      cup: { name: "Cups", factor: 0.236588 },
      floz: { name: "Fluid Ounces", factor: 0.0295735 },
    },
  },
  speed: {
    name: "Speed",
    baseUnit: "ms",
    units: {
      ms: { name: "Meters/Second", factor: 1 },
      kmh: { name: "Kilometers/Hour", factor: 0.277778 },
      mph: { name: "Miles/Hour", factor: 0.44704 },
      kn: { name: "Knots", factor: 0.514444 },
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const convertValue = (
    value: number,
    from: string,
    to: string,
    cat: string
  ) => {
    const categoryData = conversionCategories[cat];

    if (cat === "temperature") {
      return convertTemperature(value, from, to);
    }

    // Convert to base unit first, then to target unit
    const baseValue = value * categoryData.units[from].factor;
    const convertedValue = baseValue / categoryData.units[to].factor;

    return convertedValue;
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius = value;

    // Convert to Celsius first
    if (from === "F") {
      celsius = ((value - 32) * 5) / 9;
    } else if (from === "K") {
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === "F") {
      return (celsius * 9) / 5 + 32;
    } else if (to === "K") {
      return celsius + 273.15;
    }

    return celsius;
  };

  const handleConvert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setResult("");
      return;
    }

    const convertedValue = convertValue(numValue, fromUnit, toUnit, category);
    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue("");
    setResult("");
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result && inputValue) {
      setInputValue(result);
      const numValue = parseFloat(result);
      const convertedValue = convertValue(numValue, toUnit, fromUnit, category);
      setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ""));
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Result copied to clipboard!");
    }
  };

  const commonConversions = [
    {
      from: "1",
      fromUnit: "m",
      to: "3.28084",
      toUnit: "ft",
      category: "length",
    },
    {
      from: "1",
      fromUnit: "kg",
      to: "2.20462",
      toUnit: "lb",
      category: "weight",
    },
    {
      from: "0",
      fromUnit: "C",
      to: "32",
      toUnit: "F",
      category: "temperature",
    },
    {
      from: "1",
      fromUnit: "L",
      to: "0.264172",
      toUnit: "gal",
      category: "volume",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          📏 Unit Converter
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Convert between different units of measurement including length,
          weight, temperature, area, volume, and speed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Converter Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Convert Units
          </h2>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Conversion Category
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input-field"
              >
                {Object.entries(conversionCategories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Value */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Value to Convert
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value) {
                    const numValue = parseFloat(e.target.value);
                    if (!isNaN(numValue)) {
                      const convertedValue = convertValue(
                        numValue,
                        fromUnit,
                        toUnit,
                        category
                      );
                      setResult(
                        convertedValue.toFixed(6).replace(/\.?0+$/, "")
                      );
                    }
                  } else {
                    setResult("");
                  }
                }}
                placeholder="Enter value..."
                className="input-field"
              />
            </div>

            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  handleConvert();
                }}
                className="input-field"
              >
                {Object.entries(conversionCategories[category].units).map(
                  ([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({key})
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                title="Swap units"
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  handleConvert();
                }}
                className="input-field"
              >
                {Object.entries(conversionCategories[category].units).map(
                  ([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({key})
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Result */}
            {result && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-700">Result:</p>
                    <p className="text-2xl font-bold text-green-800">
                      {result} {toUnit}
                    </p>
                  </div>
                  <button
                    onClick={copyResult}
                    className="text-green-600 hover:text-green-700 p-2"
                    title="Copy result"
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
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Conversions */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Quick Reference
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Common Conversions
              </h3>
              <div className="space-y-2">
                {commonConversions.map((conv, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">
                        {conv.from} {conv.fromUnit}
                      </span>
                      {" = "}
                      <span className="font-semibold">
                        {conv.to} {conv.toUnit}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Supported Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(conversionCategories).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key)}
                    className={`p-3 text-sm rounded-lg transition-colors ${
                      category === key
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Results update automatically as you type</li>
                <li>• Use the swap button to reverse conversion</li>
                <li>• Click copy to copy result to clipboard</li>
                <li>• All conversions are accurate to 6 decimal places</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Units Reference */}
      <div className="mt-12 card p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Units Reference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(conversionCategories).map(([key, cat]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                {cat.name}
              </h3>
              <ul className="space-y-1 text-sm text-slate-600">
                {Object.entries(cat.units).map(([unitKey, unit]) => (
                  <li key={unitKey}>
                    {unitKey} - {unit.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
