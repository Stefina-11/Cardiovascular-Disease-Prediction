"use client";

import { useState } from "react";
import { CardioFormData } from "../types";

export default function Home() {
  const [formData, setFormData] = useState<CardioFormData>({
    age: 0,
    gender: 0,
    height: 0,
    weight: 0,
    ap_hi: 0,
    ap_lo: 0,
    cholesterol: 0,
    gluc: 0,
    smoke: 0,
    alco: 0,
    active: 0,
  });

  const [predictionResult, setPredictionResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) : parseInt(value),
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data.prediction);
    } catch (err: any) {
      setError(err.message || "An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Cardiovascular Disease Prediction
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-300">
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value={1}>Female</option>
              <option value={2}>Male</option>
            </select>
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="height" className="block text-sm font-medium text-gray-300">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="ap_hi" className="block text-sm font-medium text-gray-300">
              Systolic Blood Pressure (mmHg)
            </label>
            <input
              type="number"
              id="ap_hi"
              name="ap_hi"
              value={formData.ap_hi}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="ap_lo" className="block text-sm font-medium text-gray-300">
              Diastolic Blood Pressure (mmHg)
            </label>
            <input
              type="number"
              id="ap_lo"
              name="ap_lo"
              value={formData.ap_lo}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-300">
              Cholesterol Level
            </label>
            <select
              id="cholesterol"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Cholesterol Level</option>
              <option value={1}>Normal</option>
              <option value={2}>Above normal</option>
              <option value={3}>Well above normal</option>
            </select>
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4">
            <label htmlFor="gluc" className="block text-sm font-medium text-gray-300">
              Glucose Level
            </label>
            <select
              id="gluc"
              name="gluc"
              value={formData.gluc}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Glucose Level</option>
              <option value={1}>Normal</option>
              <option value={2}>Above normal</option>
              <option value={3}>Well above normal</option>
            </select>
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-300">Smoking Habit:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="smoke-yes"
                name="smoke"
                value={1}
                checked={formData.smoke === 1}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="smoke-yes" className="ml-2 text-sm text-gray-300">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="smoke-no"
                name="smoke"
                value={0}
                checked={formData.smoke === 0}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="smoke-no" className="ml-2 text-sm text-gray-300">
                No
              </label>
            </div>
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-300">Alcohol Consumption:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="alco-yes"
                name="alco"
                value={1}
                checked={formData.alco === 1}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="alco-yes" className="ml-2 text-sm text-gray-300">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="alco-no"
                name="alco"
                value={0}
                checked={formData.alco === 0}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="alco-no" className="ml-2 text-sm text-gray-300">
                No
              </label>
            </div>
          </div>

          <div className="border border-gray-600 rounded-md p-4 mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-300">Physical Activity:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="active-yes"
                name="active"
                value={1}
                checked={formData.active === 1}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="active-yes" className="ml-2 text-sm text-gray-300">
                Active
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="active-no"
                name="active"
                value={0}
                checked={formData.active === 0}
                onChange={handleRadioChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700"
              />
              <label htmlFor="active-no" className="ml-2 text-sm text-gray-300">
                Inactive
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>
        </form>

        {predictionResult !== null && (
          <div className="col-span-2 mt-6 text-center text-xl font-semibold">
            {predictionResult === 1 ? (
              <p className="text-red-500">High Risk of Cardiovascular Disease 💔</p>
            ) : (
              <p className="text-green-500">Low Risk of Cardiovascular Disease ❤️</p>
            )}
          </div>
        )}

        {error && (
          <div className="col-span-2 mt-6 text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
