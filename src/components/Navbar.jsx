import { useState } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("Homes");
  const [showLogin, setShowLogin] = useState(false);

  const tabs = ["Homes", "Experiences", "Services"];

  return (
    <>
       {/* Navbar  */}
       
      <nav
        className={`flex items-center justify-between px-12 py-4 border-b sticky top-0 z-50 ${
          isDark
            ? "bg-zinc-900 border-zinc-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <img src="/images/airbnb-logo.png" alt="Airbnb" className="h-15 w- auto" />

        {/* CENTER TABS */}

        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm pb-1 transition ${
                activeTab === tab
                  ? isDark
                    ? "border-b-2 border-white"
                    : "border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className={`px-4 py-2 text-sm rounded-full ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-gray-100"
            }`}
          >
            Become a host
          </button>

          <button onClick={toggleTheme} className="text-xl">
            {isDark ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
          </button>
        </div>
      </nav>

      {/* LOGIN MODAL */}

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLogin(false)}
          />

          <div
            className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${
              isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Log in</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg outline-none ${
                  isDark ? "bg-zinc-800" : "bg-gray-100"
                }`}
              />
              <input
                type="password"
                placeholder="Password"
                className={`w-full p-3 rounded-lg outline-none ${
                  isDark ? "bg-zinc-800" : "bg-gray-100"
                }`}
              />
              <button className="w-full bg-rose-500 text-white py-3 rounded-xl">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
