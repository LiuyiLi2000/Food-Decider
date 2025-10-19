import React, { useState } from "react";
import { motion } from "framer-motion";

function CategoryPanel({ title, emoji, color, items, choice, onDecide }) {
  // 添加点击后闪光动画状态
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    onDecide(); // 通知父组件更新随机项
    setFlash(true);
    setTimeout(() => setFlash(false), 500); // 0.5 秒后恢复
  };

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${color} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between text-center transition-transform hover:scale-105 ${
        flash ? "ring-4 ring-pink-300" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-2">
        {emoji} {title}
      </h2>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-full shadow-md mt-4 mb-4 transition-colors"
      >
        🎲 Pick One
      </motion.button>

      {choice ? (
        <motion.p
          key={choice}
          className="text-xl font-medium text-orange-700 mt-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {choice}
        </motion.p>
      ) : (
        <p className="text-gray-500 italic">Click to decide!</p>
      )}

      {/* ✨ 可爱闪光动画层 */}
      {flash && (
        <motion.div
          className="absolute inset-0 bg-white/50 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}

export default function FoodPicker() {
  const foodItems = [
    "🍣 Sushi",
    "🍜 Ramen",
    "🍔 Burger",
    "🥟 Dumplings",
    "🍕 Pizza",
    "🥗 Salad",
    "🍤 Tempura",
    "🌮 Tacos",
    "🍛 Curry Rice",
  ];

  const dessertItems = [
    "🍦 Ice Cream",
    "🧁 Cupcake",
    "🍩 Donut",
    "🍮 Pudding",
    "🍫 Chocolate",
    "🍓 Strawberry Tart",
    "🧇 Waffles",
    "🥞 Pancakes",
    "🍪 Cookies",
  ];

  const drinkItems = [
    "🍵 Matcha Latte",
    "☕ Coffee",
    "🧋 Bubble Tea",
    "🍷 Red Wine",
    "🍺 Beer",
    "🍹 Mojito",
    "🥂 Champagne",
    "🍶 Sake",
    "🍸 Cocktail",
  ];

  const [choices, setChoices] = useState({
    food: null,
    dessert: null,
    drink: null,
  });

  // 单个决定
  const decideOne = (type, items) => {
    const random = items[Math.floor(Math.random() * items.length)];
    setChoices((prev) => ({ ...prev, [type]: random }));
  };

  // 一键决定所有
  const decideAll = () => {
    setChoices({
      food: foodItems[Math.floor(Math.random() * foodItems.length)],
      dessert: dessertItems[Math.floor(Math.random() * dessertItems.length)],
      drink: drinkItems[Math.floor(Math.random() * drinkItems.length)],
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* 三个卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <CategoryPanel
          title="Main Dish"
          emoji="🍛"
          color="from-orange-100 to-pink-50"
          items={foodItems}
          choice={choices.food}
          onDecide={() => decideOne("food", foodItems)}
        />
        <CategoryPanel
          title="Dessert"
          emoji="🍰"
          color="from-pink-100 to-rose-50"
          items={dessertItems}
          choice={choices.dessert}
          onDecide={() => decideOne("dessert", dessertItems)}
        />
        <CategoryPanel
          title="Drink"
          emoji="🍸"
          color="from-blue-100 to-cyan-50"
          items={drinkItems}
          choice={choices.drink}
          onDecide={() => decideOne("drink", drinkItems)}
        />
      </div>

      {/* 一键决定全部按钮 */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={decideAll}
        className="mt-8 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform"
      >
        🎲 Decide All
      </motion.button>
    </div>
  );
}
