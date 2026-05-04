import React from "react";
import "../styles/gallery.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Gallery() {

    const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  ];
  return (
    <div className="fl-gallery-app">
       <Navbar/>
      {/* HERO SECTION */}
      <div
        className="hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="hero-overlay">
          <p className="breadcrumb">Flying Leader • gallery</p>

          <h1>Memories from our journeys</h1>

          <p>
            Moments captured across tours and celebrations.
          </p>
        </div>
      </div>


        <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="card" key={index}>
            <img src={img} alt="travel" height={'20px'} width={'20px'}/>
          </div>
        ))}
      </div>
<Footer/>
    </div>
  );
}