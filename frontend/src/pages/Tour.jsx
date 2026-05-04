import "../styles/tour.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import tours from "../data/toursData";
import toursData from "../data/toursData";
import SearchSection from "../components/SearchSection";




export default function Tours() {
   const navigate = useNavigate();
  return (
    <div className="tours-page">

        <Navbar/>

      <h2 className="title">Find Tours</h2>

      {/* SEARCH BAR */}

      <SearchSection/>
      {/* <div className="search-box">
        <input placeholder="Search tours..." />
        <input placeholder="Location" />
        <input placeholder="Duration (e.g. 3 day)" />
        <input placeholder="Min ₹" />
        <input placeholder="Max ₹" />

        <button className="filter-btn">Filter</button>
        <button className="reset-btn">Reset</button>
      </div> */}

      {/* CARDS */}
      <div className="grid">
        {toursData.map((tour, i) => (
          <div className="card" 
          key={tour.id} 
          onClick={() => navigate(`/tour/${tour.id}`)}>
            
            <div className="img-box">
              <img src={tour.img} alt="" />
              <div className="img-overlay" />
            </div>

            <div className="card-body">
              <h3>{tour.title}</h3>

              <p className="desc">
                Enjoy a complete travel package with guided tours and premium stay.
              </p>

              <div className="bottom">
                <span className="location">{tour.location}</span>
                <span className="price">{tour.price}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
<Footer/>
    </div>
  );
}