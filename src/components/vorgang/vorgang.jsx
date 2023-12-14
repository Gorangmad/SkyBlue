import React, { useEffect, useRef } from "react";
import Heading from "../common/heading/Heading";
import "./vorgang.css";

const VorgangCard = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('show');
            }, index * 600); // Adjust the delay as needed
          });
        }
      });
    });

    observer.observe(sectionRef.current);

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className='additional-section' ref={sectionRef}>
      <Heading title="Wie wir vorgehen" className="heading" />
      <div className='vorgang-container'>
        <div className='card'>
          <div className='card-inner'>
            <i className="fas fa-clock"></i>
            <p>Zeitraum Wählen</p>
          </div>
        </div>
        <p className='arrow'>&#8594;</p>
        <div className='card'>
          <div className='card-inner'>
            <i className="fas fa-envelope"></i>
            <p>Bestätigung per E-mail</p>
          </div>
        </div>
        <p className='arrow'>&#8594;</p>
        <div className='card'>
          <div className='card-inner'>
            <i className="fas fa-phone"></i>
            <p>Anruf vor Ankunft</p>
          </div>
        </div>
        <p className='arrow'>&#8594;</p>
        <div className='card'>
          <div className='card-inner'>
            <i className="fas fa-handshake"></i>
            <p>Annahme oder Abgabe</p>
          </div>
        </div>
        <p className='arrow'>&#8594;</p>
        <div className='card'>
          <div className='card-inner'>
            <i className="fas fa-check"></i>
            <p>Vorgang erfolgt</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VorgangCard;
