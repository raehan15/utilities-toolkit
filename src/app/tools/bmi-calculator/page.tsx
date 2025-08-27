"use client";

import { useState } from "react";
import { Metadata } from "next";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    description: string;
  } | null>(null);

  const calculateBMI = () => {
    const heightM = parseFloat(height) / 100; // Convert cm to m
    const weightKg = parseFloat(weight);

    if (!heightM || !weightKg || heightM <= 0 || weightKg <= 0) {
      alert("Please enter valid height and weight values");
      return;
    }

    const bmi = weightKg / (heightM * heightM);
    let category = "";
    let description = "";

    if (bmi < 18.5) {
      category = "Underweight";
      description =
        "You may need to gain some weight. Consult with a healthcare professional for personalized advice.";
    } else if (bmi < 25) {
      category = "Normal weight";
      description =
        "You have a healthy weight for your height. Keep up the good work with a balanced diet and regular exercise.";
    } else if (bmi < 30) {
      category = "Overweight";
      description =
        "You may benefit from losing some weight. Consider adopting a healthier diet and increasing physical activity.";
    } else {
      category = "Obese";
      description =
        "It is recommended to consult with a healthcare professional for a personalized weight management plan.";
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
    });
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-600";
      case "Normal weight":
        return "text-green-600";
      case "Overweight":
        return "text-orange-600";
      case "Obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            BMI Calculator
          </h1>
          <p className="text-slate-600 text-lg">
            Calculate your Body Mass Index and understand your health category
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-bold text-slate-700 mb-3"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in centimeters"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white text-lg"
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-bold text-slate-700 mb-3"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kilograms"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Calculate BMI
            </button>
            <button
              onClick={reset}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium text-lg"
            >
              Reset
            </button>
          </div>

          {result && (
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Result
              </h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {result.bmi}
                </div>
                <div
                  className={`text-xl font-semibold ${getCategoryColor(
                    result.category
                  )}`}
                >
                  {result.category}
                </div>
              </div>
              <p className="text-gray-700 text-center">{result.description}</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            BMI Categories
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Underweight:</span>
              <span className="text-blue-600 font-medium">Below 18.5</span>
            </div>
            <div className="flex justify-between">
              <span>Normal weight:</span>
              <span className="text-green-600 font-medium">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between">
              <span>Overweight:</span>
              <span className="text-orange-600 font-medium">25.0 - 29.9</span>
            </div>
            <div className="flex justify-between">
              <span>Obese:</span>
              <span className="text-red-600 font-medium">30.0 and above</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
