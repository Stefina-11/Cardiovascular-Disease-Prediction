"use client";

import { useState } from "react";
import { CardioFormData } from "../types";

const energeticQuotes = [
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "It always seems impossible until it's done. – Nelson Mandela",
];

const healthTips = [
  "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
  "Engage in regular physical activity for at least 30 minutes most days of the week.",
  "Maintain a healthy weight to reduce strain on your heart.",
  "Get enough sleep, aiming for 7-9 hours per night.",
  "Manage stress through relaxation techniques like meditation or yoga.",
  "Limit processed foods, sugary drinks, and unhealthy fats.",
  "Stay hydrated by drinking plenty of water throughout the day.",
  "Regular check-ups with your doctor are crucial for early detection and prevention.",
];

const goodViews = [
  "https://images.unsplash.com/photo-1501854140801-50d00698b723?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1469474968028-5672ee0edcb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1475924156734-41762ae1371f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1903&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 font-sans">
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Cardiovascular Disease Prediction
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="age"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age (years)
            </label>
          </div>

          {/* Gender */}
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="" className="bg-gray-700">Select Gender</option>
              <option value={1} className="bg-gray-700">Female</option>
              <option value={2} className="bg-gray-700">Male</option>
            </select>
            <label
              htmlFor="gender"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Gender
            </label>
          </div>

          {/* Height */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="height"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Height (cm)
            </label>
          </div>

          {/* Weight */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="weight"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Weight (kg)
            </label>
          </div>

          {/* Systolic Blood Pressure */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="ap_hi"
              name="ap_hi"
              value={formData.ap_hi}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="ap_hi"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Systolic Blood Pressure (mmHg)
            </label>
          </div>

          {/* Diastolic Blood Pressure */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              id="ap_lo"
              name="ap_lo"
              value={formData.ap_lo}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="ap_lo"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Diastolic Blood Pressure (mmHg)
            </label>
          </div>

          {/* Cholesterol Level */}
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="cholesterol"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="" className="bg-gray-700">Select Cholesterol Level</option>
              <option value={1} className="bg-gray-700">Normal</option>
              <option value={2} className="bg-gray-700">Above normal</option>
              <option value={3} className="bg-gray-700">Well above normal</option>
            </select>
            <label
              htmlFor="cholesterol"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cholesterol Level
            </label>
          </div>

          {/* Glucose Level */}
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="gluc"
              name="gluc"
              value={formData.gluc}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="" className="bg-gray-700">Select Glucose Level</option>
              <option value={1} className="bg-gray-700">Normal</option>
              <option value={2} className="bg-gray-700">Above normal</option>
              <option value={3} className="bg-gray-700">Well above normal</option>
            </select>
            <label
              htmlFor="gluc"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Glucose Level
            </label>
          </div>

          {/* Smoking Habit */}
          <div className="relative z-0 w-full mb-6 group col-span-full md:col-span-1">
            <label className="text-sm text-gray-400 dark:text-gray-400">Smoking Habit:</label>
            <div className="flex items-center mt-2 space-x-4">
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
          </div>

          {/* Alcohol Consumption */}
          <div className="relative z-0 w-full mb-6 group col-span-full md:col-span-1">
            <label className="text-sm text-gray-400 dark:text-gray-400">Alcohol Consumption:</label>
            <div className="flex items-center mt-2 space-x-4">
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
          </div>

          {/* Physical Activity */}
          <div className="relative z-0 w-full mb-6 group col-span-full md:col-span-1">
            <label className="text-sm text-gray-400 dark:text-gray-400">Physical Activity:</label>
            <div className="flex items-center mt-2 space-x-4">
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
          </div>

          <button
            type="submit"
            className="col-span-full w-full py-3 px-5 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>
        </form>

        {predictionResult !== null && (
          <div className="mt-8 text-center text-2xl font-bold p-4 rounded-lg bg-gray-700 bg-opacity-50">
            {predictionResult === 1 ? (
              <div className="text-red-400">
                <p className="text-red-400 animate-pulse text-3xl mb-4">High Risk of Cardiovascular Disease 💔</p>
                <p className="text-xl mb-2">Stay strong! Here's some motivation:</p>
                <p className="italic text-lg">"{energeticQuotes[Math.floor(Math.random() * energeticQuotes.length)]}"</p>
              </div>
            ) : (
              <div className="text-green-400">
                <p className="text-green-400 animate-pulse text-3xl mb-4">Low Risk of Cardiovascular Disease ❤️</p>
                <p className="text-xl mb-2">Great news! Keep up the good work. Here are some health tips and a beautiful view:</p>
                <p className="text-lg mb-2">{healthTips[Math.floor(Math.random() * healthTips.length)]}</p>
                <img
                  src={goodViews[Math.floor(Math.random() * goodViews.length)]}
                  alt="Beautiful view"
                  className="mt-4 rounded-lg shadow-md max-h-60 w-full object-cover"
                />
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-red-500 p-4 rounded-lg bg-gray-700 bg-opacity-50">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
