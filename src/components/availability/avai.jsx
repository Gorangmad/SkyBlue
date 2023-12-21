import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlaneDeparture, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import Heading from "../common/heading/Heading";
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

import "./avai.css";

const AvaiCard = () => {
  const [hinflugDate, setHinflugDate] = useState(new Date());
  const [hinflugTime, setHinflugTime] = useState('10:00');
  const [rueckflugDate, setRueckflugDate] = useState(new Date());
  const [rueckflugTime, setRueckflugTime] = useState('10:00');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Use state values directly
      const response = await fetch('/send-datum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          hinflugDate: hinflugDate.toISOString(), // Or format it as needed
          hinflugTime,
          rueckflugDate: rueckflugDate.toISOString(), // Or format it as needed
          rueckflugTime 
        }),
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
          <label>
            <FontAwesomeIcon icon={faPlaneDeparture} />
            Hinflug Datum und Zeit
          </label>
          <DatePicker 
            selected={hinflugDate} 
            onChange={date => setHinflugDate(date)}
            dateFormat="dd.MM.yyyy"
          />
          <TimePicker 
            value={hinflugTime}
            onChange={setHinflugTime}
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPlaneArrival} />
            Rückflug Datum und Zeit
          </label>
          <DatePicker 
            selected={rueckflugDate} 
            onChange={date => setRueckflugDate(date)}
            dateFormat="dd.MM.yyyy"
          />
          <TimePicker 
            value={rueckflugTime}
            onChange={setRueckflugTime}
          />
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



