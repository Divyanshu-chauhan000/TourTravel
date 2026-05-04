// ========================= IMPORTS =========================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";

import travelImg from "../assets/travel.avif";

// ADD YOUR POSTER IMAGES IN ASSETS
import rallyPoster from "../assets/rallyPoster.jpg";
import manifestoPoster from "../assets/manifestoPoster.jpg";
import invitePoster from "../assets/invitePoster.jpg";

import "../styles/home.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toursData from "../data/toursData";

// ========================= HOME =========================
export default function Home() {
  const [activeMood, setActiveMood] = useState("");
  const navigate = useNavigate();

  const moods = [
    "Beach",
    "Mountain",
    "City Break",
    "Heritage",
    "Wild life",
    "Road Trip",
  ];

  return (
    <div className="fl-home-app">
      <Navbar />

      {/* ================= DISCLAIMER ================= */}
      <section
        style={{
          padding: "18px 20px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          borderBottom: "3px solid #facc15",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            Political & Social Issue Disclaimer
          </h2>

          <p
            style={{
              lineHeight: "1.7",
              color: "#dbeafe",
            }}
          >
            This website contains political and social awareness related
            content for informational purposes only.
          </p>

          <p
            style={{
              marginTop: "10px",
              color: "#fff",
            }}
          >
            <strong>Paid for by Gagan Chawla</strong>
          </p>

          <p style={{ color: "#dbeafe" }}>
            <strong>Address:</strong> Panchkula, Haryana &nbsp; | &nbsp;
            <strong>Phone:</strong> +91 7986063747
          </p>
        </div>
      </section>

      {/* ================= NEW POLITICAL HERO SECTION ================= */}
      <section className="political-hero">
        <div className="political-overlay"></div>

        <div className="political-content">
          {/* LEFT */}
          <div className="political-left">
            <span className="political-badge">
              Aam Aadmi Party • Ward No. 6
            </span>

            <h1>
              Panchkula Nagar Nigam Election 2026
            </h1>

            <h2>
              Support <span>Gagan Chawla Ji</span>
            </h2>

            <p>
              Join the movement for honest politics, better development,
              transparency, and stronger public support in Panchkula.
            </p>

            <div className="political-buttons">
              <button onClick={() => navigate("/contact")}>
                Join Campaign
              </button>

              <button
                className="outline-btn"
                onClick={() => navigate("/gallery")}
              >
                View Events
              </button>
            </div>

            {/* INFO CARDS */}
            <div className="political-info-grid">
              <div className="political-info-card">
                <h3>📍 Location</h3>
                <p>Ward No. 6, Sector 16, 17, 18 Panchkula</p>
              </div>

              <div className="political-info-card">
                <h3>📅 Election Year</h3>
                <p>2026 Municipal Campaign</p>
              </div>

              <div className="political-info-card">
                <h3>🤝 Mission</h3>
                <p>Development, Transparency & Public Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="political-right">
            <img src={invitePoster} alt="candidate" />
          </div>
        </div>
      </section>

      {/* ================= EVENT HIGHLIGHTS ================= */}
      <section className="event-section">
        <div className="event-header">
          <p>Campaign Highlights</p>
          <h2>Upcoming Political Events & Public Meetings</h2>
        </div>

        <div className="event-grid">
          {/* CARD 1 */}
          <div className="event-card">
            <img src={manifestoPoster} alt="manifesto" />

            <div className="event-content">
              <span>5 May 2026</span>

              <h3>Manifesto Launch Event</h3>

              <p>
                Senior leaders and supporters gathering for public manifesto
                release and press conference.
              </p>

              <button>Read More</button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="event-card">
            <img src={rallyPoster} alt="rally" />

            <div className="event-content">
              <span>7 May 2026</span>

              <h3>Massive Public Rally</h3>

              <p>
                Punjab leaders and supporters joining together to address
                citizens and support the campaign.
              </p>

              <button>Explore Rally</button>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="event-card">
            <img src={invitePoster} alt="door campaign" />

            <div className="event-content">
              <span>Door-to-Door Campaign</span>

              <h3>Public Interaction Drive</h3>

              <p>
                Meet local residents directly and discuss development,
                transparency, and public welfare.
              </p>

              <button>Join Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXISTING HERO ================= */}
      <section className="fl-home-hero">
        <div className="fl-home-hero-text">
          <p className="fl-home-hero-tag">
            Curated Travel Experiences
          </p>

          <h1>
            Discover the world <br />
            <span>your way</span>
          </h1>

          <p className="fl-home-hero-subtext">
            Handpicked destinations, seamless booking, and unforgettable
            journeys.
          </p>

          <div className="fl-home-hero-actions">
            <Link to="/tour" className="btn primary home-btn">
              Explore Trips
            </Link>

            <Link to="/contact" className="btn secondary home-btn">
              Customized Package
            </Link>
          </div>
        </div>

        <div className="fl-home-hero-image-style">
          <img src={travelImg} alt="travel" />
        </div>
      </section>

      {/* SEARCH */}
      <SearchSection />

      {/* POPULAR */}
      <section className="fl-home-section">
        <h2>Popular Now</h2>

        <div className="fl-home-grid">
          {toursData.map((tour) => (
            <Link
              key={tour.id}
              to={`/tour/${tour.id}`}
              className="fl-home-card"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              {tour.location}
            </Link>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="fl-home-section">
        <h2>Top Destinations</h2>

        <div className="fl-home-grid">
          {toursData.slice(0, 6).map((tour) => (
            <div
              key={tour.id}
              className="fl-home-dest"
              onClick={() => navigate(`/tour/${tour.id}`)}
              style={{
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img
                src={tour.img}
                alt={tour.location}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <h4 style={{ marginTop: "10px" }}>
                {tour.location}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="fl-home-section fl-home-grid">
        <div className="fl-home-feature">
          💎
          <h3>Curated Quality</h3>
          <p>Only trips we’d take ourselves.</p>
        </div>

        <div className="fl-home-feature">
          🧭
          <h3>Easy Planning</h3>
          <p>Simple itineraries & bookings.</p>
        </div>

        <div className="fl-home-feature">
          💰
          <h3>Honest Pricing</h3>
          <p>No hidden charges.</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="fl-home-section">
        <h2>Gallery</h2>

        <div className="fl-home-gallery">
          <img src="https://images.unsplash.com/photo-1528127269322-539801943592" />
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080" />
        </div>
      </section>

      {/* CTA */}
      <section className="fl-home-cta">
        <h2>Start your journey today</h2>

        <button onClick={() => navigate("/gallery")}>
          Get Started
        </button>
      </section>

      {/* MOODS */}
      <section
        style={{
          padding: "60px 80px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "23px",
            marginBottom: "25px",
          }}
        >
          Pick a Mood
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {moods.map((item) => {
            const isActive = activeMood === item;

            return (
              <button
                key={item}
                onClick={() => setActiveMood(item)}
                style={{
                  padding: "12px 22px",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "0.3s",
                  background: isActive ? "#ff6b6b" : "#fff",
                  color: isActive ? "#fff" : "#000",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}