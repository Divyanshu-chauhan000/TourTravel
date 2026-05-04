import { useState } from "react";
import "../styles/contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    const { name, email, phone, subject, message } = form;

    const text = `Hello Flying Leader 👋

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`;

    window.open(
      `https://wa.me/9162849616984?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="fl-contact-app">
      <Navbar />

      <div className="contact-page">
        <h1>Let’s Plan Your Trip ✈️</h1>
        <p>Tell us your dream destination — we’ll handle the rest.</p>
        <h1>Conatct us for package customization too....</h1>

        <div className="contact-card">

          {/* LEFT */}
          <div className="form-section">
            <div className="row">
              <input name="name" placeholder="Full Name" onChange={handleChange}/>
              <input name="email" placeholder="Email" onChange={handleChange}/>
            </div>

            <div className="row">
              <input name="phone" placeholder="Phone" onChange={handleChange}/>
              <input name="subject" placeholder="Subject" onChange={handleChange}/>
            </div>

            <textarea
              name="message"
              placeholder="Tell us about your trip..."
              rows="5"
              onChange={handleChange}
            />

            <button onClick={sendWhatsApp}>
              🚀 Send on WhatsApp
            </button>
          </div>

          {/* RIGHT */}
          <div className="info-section">
            <div className="overlay">
              <h2>Travel With Us 🌍</h2>
              <p>Best deals • Easy booking • 24/7 support</p>

              <div className="info">
                <p>📞 +91 62849616984</p>
                <p>📧 admin@flyingleader.com</p>
                <p>📍 Haryana, India</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}