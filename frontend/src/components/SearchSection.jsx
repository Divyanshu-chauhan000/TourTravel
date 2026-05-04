import React, { useState } from "react";
import toursData from "../data/toursData";
import "../styles/searchsection.css";

export default function SearchSection() {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState(toursData);

  const handleSearch = () => {
    const filtered = toursData.filter((tour) => {
      const price = Number(tour.price.replace(/₹|,/g, ""));

      const loc = location.trim().toLowerCase();

      const matchLocation = !loc
        ? true
        : tour.location.toLowerCase().includes(loc);

      const matchMin = !minPrice ? true : price >= Number(minPrice);
      const matchMax = !maxPrice ? true : price <= Number(maxPrice);

      return matchLocation && matchMin && matchMax;
    });

    setResults(filtered);
  };

  // ❌ FIX: duplicate remove (ye bug tha)
  const loopData = results;

  return (
    <div className="fl-wrapper">

      {/* SEARCH BAR */}
      <div className="fl-search">
        <input
          type="text"
          placeholder="Where to?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* SCROLL CARDS */}
      <div className="fl-marquee">
        <div className="fl-track">
          {loopData.map((tour, i) => (
            <div className="fl-card" key={i}>
              <img src={tour.img} alt={tour.title} />
              <div className="fl-content">
                <h4>{tour.title}</h4>
                <p>📍 {tour.location}</p>
                <span>{tour.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}