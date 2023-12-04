import Heading from "../common/heading/Heading";
import "./vorgang.css";

const VorgangCard = () => {

  return (
<section className='additional-section'>
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
        <p>Annahme und Abgabe</p>
      </div>
    </div>
    <p className='arrow'>&#8594;</p>
    <div className='card'>
      <div className='card-inner'>
        <i className="fas fa-check"></i>
        <p>Übergabe erfolgt</p>
      </div>
    </div>
  </div>
</section>


  );
};

export default VorgangCard;