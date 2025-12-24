import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/searchBar";
import Card from "./components/Card";
import { parisHomes, londonHomes } from "./data";

export default function App() {
  const [theme, setTheme] = useState("light");

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-zinc-950 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar theme={theme} toggleTheme={() => setTheme(isDark ? "light" : "dark")} />

      <SearchBar isDark={isDark} />

      {/* PARIS */}

      <section className="max-w-300 mx-auto px-12 mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Popular homes in Paris
        </h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {parisHomes.map((home, index) => (
            <Card key={index} {...home} isDark={isDark} />
          ))}
        </div>
      </section>

      {/* LONDON */}
      
      <section className="max-w-300 mx-auto px-12 mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Stay in London
        </h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {londonHomes.map((home, index) => (
            <Card key={index} {...home} isDark={isDark} />
          ))}
        </div>
      </section>

      <footer
        className={`mt-16 py-6 text-center text-sm border-t ${
          isDark
            ? "text-gray-400 border-zinc-700"
            : "text-gray-500 border-gray-200"
        }`}
      >
        <p className="font-medium">Soham Das</p>
        <p className="mt-1">sohamdas2332005@gmail.com</p>
      </footer>
    </div>
  );
}
