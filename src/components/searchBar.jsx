import { useState, useRef, useEffect } from "react";

export default function SearchBar({ isDark }) {
  const [activeSection, setActiveSection] = useState(null);
  const wrapperRef = useRef(null);

  // SEARCH STATE

  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Close panels on outside click

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SEARCH HANDLER

  const handleSearch = () => {
    setActiveSection(null);

    const totalGuests =
      guests.adults +
      guests.children +
      guests.infants +
      guests.pets;

    console.log("SEARCH DATA:", {
      location,
      dates,
      guests,
      totalGuests,
    });

    alert(
      `Searching stays in ${
        location || "anywhere"
      } for ${totalGuests || "any number of"} guests`
    );
  };

  return (
    <div className="relative flex justify-center mt-6" ref={wrapperRef}>

      {/* SEARCH BAR */}

      <div
        className={`flex items-center rounded-full p-1 w-full max-w-225 ${
          isDark ? "bg-zinc-800" : "bg-gray-100"
        }`}
      >
        {/* WHERE */}

        <Section
          title="Where"
          subtitle={location || "Search destinations"}
          active={activeSection === "where"}
          onClick={() => setActiveSection("where")}
          isDark={isDark}
        />

        {/* WHEN */}

        <Section
          title="When"
          subtitle={dates || "Add dates"}
          active={activeSection === "when"}
          onClick={() => setActiveSection("when")}
          isDark={isDark}
        />

        {/* WHO */}

        <Section
          title="Who"
          subtitle={
            guests.adults +
              guests.children +
              guests.infants +
              guests.pets >
            0
              ? `${
                  guests.adults +
                  guests.children +
                  guests.infants +
                  guests.pets
                } guests`
              : "Add guests"
          }
          active={activeSection === "who"}
          onClick={() => setActiveSection("who")}
          isDark={isDark}
        />

        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          className="w-12 h-12 flex items-center justify-center bg-rose-500 text-white rounded-full text-lg hover:scale-105 transition"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* PANELS */}

      {activeSection === "where" && (
        <WherePanel
          isDark={isDark}
          setLocation={setLocation}
          close={() => setActiveSection(null)}
        />
      )}

      {activeSection === "when" && (
        <WhenPanel
          isDark={isDark}
          setDates={setDates}
          close={() => setActiveSection(null)}
        />
      )}

      {activeSection === "who" && (
        <WhoPanel
          isDark={isDark}
          guests={guests}
          setGuests={setGuests}
        />
      )}
    </div>
  );
}


//  SEARCH BAR SECTION 

function Section({ title, subtitle, active, onClick, isDark }) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 px-6 py-3 rounded-full cursor-pointer transition ${
        active
          ? isDark
            ? "bg-zinc-900 shadow"
            : "bg-white shadow"
          : isDark
          ? "hover:bg-zinc-700"
          : "hover:bg-gray-200"
      }`}
    >
      <p className="text-xs font-semibold">{title}</p>
      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
        {subtitle}
      </p>
    </div>
  );
}


// WHERE PANEL 

function WherePanel({ isDark, setLocation, close }) {
  const places = [
    "Guwahati, Assam",
    "New Delhi, Delhi",
    "North Goa, Goa",
    "Jaipur, Rajasthan",
    "Kolkata, West Bengal",
    "Puducherry, Puducherry",
    "South Goa, Goa",
  ];

  return (
    <Panel isDark={isDark} title="Suggested destinations">
      {places.map((place) => (
        <div
          key={place}
          onClick={() => {
            setLocation(place);
            close();
          }}
          className={`p-3 rounded-xl cursor-pointer transition ${
            isDark ? "hover:bg-zinc-800" : "hover:bg-gray-100"
          }`}
        >
          {place}
        </div>
      ))}
    </Panel>
  );
}

//  WHEN PANEL

function WhenPanel({ isDark, setDates, close }) {
  const options = [
    "This weekend",
    "Next week",
    "Next month",
    "Flexible dates",
  ];

  return (
    <Panel isDark={isDark} title="Select dates">
      {options.map((opt) => (
        <div
          key={opt}
          onClick={() => {
            setDates(opt);
            close();
          }}
          className={`p-3 rounded-xl cursor-pointer transition ${
            isDark ? "hover:bg-zinc-800" : "hover:bg-gray-100"
          }`}
        >
          {opt}
        </div>
      ))}
    </Panel>
  );
}

//  WHO PANEL

function WhoPanel({ isDark, guests, setGuests }) {
  const updateGuest = (type, delta) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const rows = [
    { key: "adults", label: "Adults", sub: "Ages 13 or above" },
    { key: "children", label: "Children", sub: "Ages 2–12" },
    { key: "infants", label: "Infants", sub: "Under 2" },
    { key: "pets", label: "Pets", sub: "Service animals allowed" },
  ];

  return (
    <Panel isDark={isDark} title="Guests">
      {rows.map((row) => (
        <div
          key={row.key}
          className="flex justify-between items-center py-3 border-b last:border-b-0"
        >
          <div>
            <p className="font-medium">{row.label}</p>
            <p className="text-sm text-gray-500">{row.sub}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateGuest(row.key, -1)}
              disabled={guests[row.key] === 0}
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                guests[row.key] === 0
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              −
            </button>

            <span className="w-4 text-center">
              {guests[row.key]}
            </span>

            <button
              onClick={() => updateGuest(row.key, 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </Panel>
  );
}

//  PANEL WRAPPER

function Panel({ title, children, isDark }) {
  return (
    <div
      className={`absolute top-full mt-4 w-full max-w-xl rounded-2xl p-5 shadow-xl z-40 ${
        isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
