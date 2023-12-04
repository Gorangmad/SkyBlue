import React, { useState } from "react";
import "./contact.css";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    Vorname: "",
    Nachname: "",
    Email: "",
    Telefonnummer: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    Vorname: false,
    Nachname: false,
    Email: false,
    Telefonnummer: false,
    message: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setFormErrors(errors);
      showNotification("error", "Bitte füllen sie alle Felder aus");
      return;
    }

    try {
      const response = await fetch("http://localhost:3300/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("success", "Email sent successfully");
        setFormData({
          Vorname: "",
          Nachname: "",
          Email: "",
          Telefonnummer: "",
          message: "",
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
      timeout: 3000,
      progressBar: true,
    }).show();
  };

  return (
    <>
      <section className="contacts padding">
        <div className="container shadow flexSB">
        <div className='left row'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20452.23484746306!2d8.546528047160999!3d50.15123577832118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd09d83903be7b%3A0x5e2749c34b8815ce!2s65760%20Eschborn!5e0!3m2!1sde!2sde!4v1701704301975!5m2!1sde!2sde" title="Google Maps Location" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          <div className="right row">
            <h1>Kontaktieren sie uns jetzt</h1>
            <p>Unser Team ist jederzeit erreichbar für sie</p>

            <div className="items grid2">
              <div className="box">
                <i className="fa fa-phone-alt"></i>
                <p>061067797307</p>
              </div>
              <div className="box">
                <i className="fa fa-paper-plane"></i>
                <p>Info@skyblueparking.de</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Vorname">
                  <i className="fa fa-user icon"></i> Vorname
                </label>
                <input
                  type="text"
                  name="Vorname"
                  placeholder="Vorname"
                  onChange={handleChange}
                  value={formData.Vorname}
                />
                {formErrors.Vorname && (
                  <p className="error-message">Geben sie ihren Vornamen an</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Nachname">
                  <i className="fa fa-user icon"></i> Nachname
                </label>
                <input
                  type="text"
                  name="Nachname"
                  placeholder="Nachname"
                  onChange={handleChange}
                  value={formData.Nachname}
                />
                {formErrors.Nachname && (
                  <p className="error-message">
                    Geben sie ihren Nachnamen an
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Email">
                  <i className="fa fa-envelope icon"></i> Email
                </label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.Email}
                />
                {formErrors.Email && (
                  <p className="error-message">Geben sie ihre Email an</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Telefonnummer">
                  <i className="fa fa-phone icon"></i> Telefonnummer
                </label>
                <input
                  type="text"
                  name="Telefonnummer"
                  placeholder="Telefonnummer"
                  onChange={handleChange}
                  value={formData.Telefonnummer}
                />
                {formErrors.Telefonnummer && (
                  <p className="error-message">
                    Geben sie ihre Telefonnummer an
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fa fa-envelope icon"></i> Nachricht
                </label>
                <textarea
                  name="message"
                  placeholder="Ihre Nachricht"
                  onChange={handleChange}
                  value={formData.message}
                />
                {formErrors.message && (
                  <p className="error-message">Geben sie ihre Nachricht ein</p>
                )}
              </div>

              <button type="submit" className="primary-btn">
                Senden
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
