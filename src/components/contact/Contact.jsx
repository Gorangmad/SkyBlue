import React, { useState } from "react"
import "./contact.css"
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    Vorname: '',
    Nachname: '',
    Email: '',
    Telefonnummer: '',
    Postleitzahl: '',
    Addresse: '',
    Pflegegrad: '',
    Krankenkasse: '',
  });

  const [formErrors, setFormErrors] = useState({
    Vorname: false,
    Nachname: false,
    Email: false,
    Telefonnummer: false,
    Postleitzahl: false,
    Addresse: false,
    Pflegegrad: false,
    Krankenkasse: false,
    // Add other form fields here with initial state as false
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset the error for the field when it is changed
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set the errors and return
      setFormErrors(errors);
      showNotification("error", "Bitte füllen sie alle Felder aus");
      return;
    }

    try {
      const response = await fetch('http://localhost:3300/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("success", "Email sent successfully");
        // Optionally, reset the form after successful submission
        setFormData({
          Vorname: '',
          Nachname: '',
          Email: '',
          Telefonnummer: '',
          Postleitzahl: '',
          Addresse: '',
          Pflegegrad: '',
          Krankenkasse: '',
        });
      } else {
        showNotification("error", "Failed to send email");
        }
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", "Error sending email");
    }
  };

  const showNotification = (type, text) => {
    new Noty({
      type: type,
      text: text,
      timeout: 3000, // Duration for the notification
      progressBar: true,
    }).show();
  };

  return (
      <>
        <section className='contacts padding'>
          <div className='container shadow flexSB'>
            <div className='left row'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.2377893700454!2d8.882915077185375!3d50.02563997151431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd14c17a35571b%3A0x61362c175aace52!2sLudwigstra%C3%9Fe%2025%2C%2063110%20Rodgau!5e0!3m2!1sde!2sde!4v1700414765599!5m2!1sde!2sde" title="Google Maps Location" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='right row'>
              <h1>Kontaktieren sie uns jetzt</h1>
              <p>Unser Team ist jederzeit erreichbar für sie</p>
  
              <div className='items grid2'>
                <div className='box'>
                  <i className='fa fa-map'></i>
                  <p>Ludwigstraße 25, 63110 Rodgau</p>
                </div>
                <div className='box'>
                <i className='fa fa-phone-alt'></i>
                  <p>061067797307</p>
                  <i className='fa fa-fax'></i>
                  <p>061067797298</p>
                </div>
                <div className='box'>
                <i className='fa fa-paper-plane'></i>
                  <p>Info@pflegedienst-malik.de</p>
                  <p>Bewerbung@pflegedienst-malik.de</p>
                </div>
              </div>
  
  
              <form onSubmit={handleSubmit}>
                <input type='text' name='Vorname' placeholder='Vorname' onChange={handleChange} value={formData.Vorname} />
                {formErrors.Vorname && <p className="error-message">Geben sie ihren Vornamen an</p>}
                <input type='text' name='Nachname' placeholder='Nachname' onChange={handleChange} value={formData.Nachname} />
                {formErrors.Nachname && <p className="error-message">Geben sie ihren Nachnamen an</p>}
                <input type='email' name='Email' placeholder='Email' onChange={handleChange} value={formData.Email} />
                {formErrors.Email && <p className="error-message">Geben sie ihre Email an</p>}
                <input type='text' name='Telefonnummer' placeholder='Telefonnummer' onChange={handleChange} value={formData.Telefonnummer} />
                {formErrors.Telefonnummer && <p className="error-message">Geben sie ihre Telefonnummer an</p>}
                <input type='text' name='Postleitzahl' placeholder='Postleitzahl' onChange={handleChange} value={formData.Postleitzahl} />
                {formErrors.Postleitzahl && <p className="error-message">Geben sie ihre Postleitzahl ein an</p>}
                <input type='text' name='Addresse' placeholder='Addresse' onChange={handleChange} value={formData.Addresse} />
                {formErrors.Addresse && <p className="error-message">Geben sie ihre Addresse an</p>}
              
                <select name='Pflegegrad' onChange={handleChange} value={formData.Pflegegrad}>
                  <option value='' disabled selected>Pflegegrad auswählen</option>
                  <option value='Option 1'>Option 1</option>
                  <option value='Option 2'>Option 2</option>
                  <option value='Option 3'>Option 3</option>
                  <option value='Option 4'>Option 4</option>
                  <option value='Option 5'>Option 5</option>
                  <option value='Option 6'>Option 6</option>
                </select>
                <input type='text' name='Krankenkasse' placeholder='Krankenkasse' onChange={handleChange} value={formData.Krankenkasse} />
                {formErrors.Krankenkasse && <p className="error-message">Geben sie ihre Krankenkasse an</p>}
                <button type="submit" className='primary-btn'>Nachricht senden</button>
              </form>
            </div>
          </div>
        </section>
      </>
    )
};

export default ContactForm;