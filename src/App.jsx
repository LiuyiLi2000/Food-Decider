import React from "react";
import FoodPicker from "./components/FoodPicker";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-10 drop-shadow-sm">
        🍱 Food Decider
      </h1>

      {/* 三个可爱panel */}
      <FoodPicker />

      <footer className="mt-10 text-gray-500 text-sm">
        Made with ❤️ by Liuyi
      </footer>
    </div>
  );
}

export default App;

