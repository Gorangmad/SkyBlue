import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlaneDeparture, faPlaneArrival, faUser, faEnvelope, faPhone, faCar, faCarSide, faPalette } from "@fortawesome/free-solid-svg-icons";
import "./buchen.css";
import Noty from "noty";

const BuchenCard = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call calculatePrice when the component mounts
    calculatePrice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Vorname: e.target.vorname.value,
      Nachname: e.target.nachname.value,
      Email: e.target.email.value,
      Telefonnummer: e.target.telefonnummer.value,
      Kennzeichen: e.target.kennzeichen.value,
      Automarke: e.target.automarke.value,
      Hinflug: e.target.hinflug.value,
      Rueckflug: e.target.rueckflug.value,
      Farbe: e.target.farbe.value,
    };

    try {
      // Make a POST request to the backend to save the data
      const response = await fetch('/send-buchung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted!");
        // Calculate price after form submission
        calculatePrice();
        // Show success notification
        showNotification("success", "Buchung erfolgreich platziert!");
      } else {
        console.error('Failed to save data');
        // Show error notification
        showNotification("error", "Fehler beim Speichern der Daten");
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error notification
      showNotification("error", "Fehler beim Senden der Buchung");
    }
  };

  const calculatePrice = async () => {
    try {
      // Make a POST request to calculate the price
      const response = await fetch('/calculate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
        setLoading(false); // Set loading to false when price is fetched
        console.log("Price calculated:", data.price);
      } else {
        console.error('Failed to calculate price');
        setLoading(false); // Set loading to false on error
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Set loading to false on error
    }
  };
  

  const showNotification = (type, text) => {
    new Noty({
      type: type,
      text: text,
      timeout: 3000,
      progressBar: true,
    }).show();
  };

  return (
    <>
      <section className='buchen'>
        <form onSubmit={handleSubmit} classNAme="form2">
        <div className="name-group">
    <div className="first-name">
      <label htmlFor="vorname">
        <FontAwesomeIcon icon={faUser} />
        Vorname
      </label>
      <input type="text" id="vorname" name="vorname" placeholder="Vorname" required />
    </div>
    <div className="last-name">
      <label htmlFor="nachname">
        <FontAwesomeIcon icon={faUser} />
        Nachname
      </label>
      <input type="text" id="nachname" name="nachname" placeholder="Nachname" required />
    </div>
    </div>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Email
            </label>
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefonnummer">
              <FontAwesomeIcon icon={faPhone} />
              Telefonnummer
            </label>
            <input type="tel" id="telefonnummer" name="telefonnummer" placeholder="Telefonnummer" required />
          </div>
  <div className="vehicle-group">
    <div className="kennzeichen">
      <label htmlFor="kennzeichen">
        <FontAwesomeIcon icon={faCar} />
        Kennzeichen
      </label>
      <input type="text" id="kennzeichen" name="kennzeichen" placeholder="Kennzeichen" required />
    </div>
    <div className="automarke">
      <label htmlFor="automarke">
        <FontAwesomeIcon icon={faCarSide} />
        Automarke/-modell
      </label>
      <input type="text" id="automarke" name="automarke" placeholder="Automarke" required />
    </div>
  </div>
  <div className="form-group">
            <label htmlFor="farbe">
              <FontAwesomeIcon icon={faPalette} />
              Farbe
            </label>
            <input type="text" id="farbe" name="farbe" placeholder="Farbe" required />
          </div>
  <div className="flight-group">
    <div className="hinflug">
      <label htmlFor="hinflug">
        <FontAwesomeIcon icon={faPlaneDeparture} />
        Hinflug Nr.
      </label>
      <input type="text" id="hinflug" name="hinflug" placeholder="Hinflug" required />
    </div>
    <div className="rueckflug">
      <label htmlFor="rueckflug">
        <FontAwesomeIcon icon={faPlaneArrival} />
        Rückflug Nr.
      </label>
      <input type="text" id="rueckflug" name="rueckflug" placeholder="Rückflug" required />
    </div>
  </div>
  <div className="price-container">
  <p>Preis: {price !== null ? `${price} ` : 'Warten auf Preisberechnung'}</p>
</div>


          <button type="submit">
            <FontAwesomeIcon icon={faCalendarAlt} />
            Buchen
          </button>
        </form>
      </section>
    </>
  );
};

export default BuchenCard;
