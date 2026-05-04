import React from "react";
import "../styles/bookingform.css";

const BookingForm = () => {
  return (
    <div className="viz-booking-overlay">
      <div className="viz-booking-card">

        <div className="viz-booking-header">
          <h2>Complete Your Booking</h2>
          <p>Fill your details to proceed with your journey ✈️</p>
        </div>

        <div className="viz-booking-row">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
        </div>

        <div className="viz-booking-row">
          <input type="text" placeholder="Phone Number" />
          <input type="number" placeholder="No. of Travelers" />
        </div>

        <div className="viz-booking-row">
          <input type="date" />
          <select>
            <option>Select Package Type</option>
            <option>Solo Trip</option>
            <option>Family Trip</option>
            <option>Honeymoon</option>
            <option>Adventure Trip</option>
          </select>
        </div>

        <textarea
          className="viz-booking-note"
          placeholder="Special Requests (optional)..."
        />

        <div className="viz-booking-actions">
          <button className="viz-btn-primary">Continue to Payment</button>
          <button className="viz-btn-secondary">Cancel</button>
        </div>

        <p className="viz-booking-footer">
          🔒 Your data is safe & secure with us
        </p>

      </div>
    </div>
  );
};

export default BookingForm;