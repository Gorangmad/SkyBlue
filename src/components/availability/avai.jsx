import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlaneDeparture, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import Heading from "../common/heading/Heading";
import "./avai.css";

// ... (import statements)

// ... (import statements)

const AvaiCard = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hinflugDate = e.target.hinflugDate.value;
    const hinflugTime = e.target.hinflugTime.value;
    const rueckflugDate = e.target.rueckflugDate.value;
    const rueckflugTime = e.target.rueckflugTime.value;

    try {
      // Make a POST request to the backend to save the dates and times
      const response = await fetch('/send-datum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hinflugDate, hinflugTime, rueckflugDate, rueckflugTime }),
      });

      if (response.ok) {
        console.log("Form submitted!");

        window.location.href = '/buchen';
      } else {
        console.error('Failed to save dates and times');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <section className='availability1'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#171717" fillOpacity="1.00" d="M0,192L48,170.7C96,149,192,107,288,74.7C384,43,480,21,576,53.3C672,85,768,171,864,181.3C960,192,1056,128,1152,122.7C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        <section className='your-section-content'>
        <Heading title="Buchen sie Jetzt!" className="heading" />
<form onSubmit={handleSubmit} className="form1">
  <div className="form-group">
    <label htmlFor="hinflugDate">
      <FontAwesomeIcon icon={faPlaneDeparture} />
      Hinflug Datum
    </label>
    <input type="date" id="hinflugDate" name="hinflugDate" placeholder="TT.MM.JJJJ" />
    <label htmlFor="hinflugTime">
      Hinflug Zeit
    </label>
    <input type="time" id="hinflugTime" name="hinflugTime" placeholder="HH:MM" />
  </div>
  <div className="form-group">
    <label htmlFor="rueckflugDate">
      <FontAwesomeIcon icon={faPlaneArrival} />
      Rückflug Datum
    </label>
    <input type="date" id="rueckflugDate" name="rueckflugDate" placeholder="TT.MM.JJJJ" />
    <label htmlFor="rueckflugTime">
      Rückflug Zeit
    </label>
    <input type="time" id="rueckflugTime" name="rueckflugTime" placeholder="HH:MM" />
  </div>
  <button type="submit">
    <FontAwesomeIcon icon={faCalendarAlt} />
    Verfügbarkeit prüfen
  </button>
</form>
</section>
<div className="bottom-border"></div>
</section>

    </>
  );
};

export default AvaiCard;



