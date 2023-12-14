import React from "react";
import Heading from "../common/heading/Heading";
import "./impressum.css";

const AGBCard = () => {
  return (
    <section className='AGB'>
      <div className='agb-content'>
        <Heading type='h2'>Impressum für Skyblue Parking</Heading>
        <p>
          <strong>Impressum von Skyblue Parking</strong>
          <br />
          <br />
          <strong>Verantwortlich für den Inhalt:</strong>
          <br />
          Mohammad Khizer Chaudhry <br />
          Düsseldorfer Strasse 36 <br />
          65760 Eschborn
          <br />
          <br />
          <strong>Kontakt:</strong>
          <br />
          Telefon: 0177 5458547 <br />
          E-Mail: info@skyblueparking.com
          <br />
          <br />
          <strong>Verbraucherstreitbeilegung:</strong>
          <br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          <br />
          <br />
          <strong>Datenschutz nach DSGVO:</strong>
          <br />
          Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Informationen zur Erhebung und Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung, die Sie unter folgendem Link finden: [Link zur Datenschutzerklärung]
          <br />
          <br />
          <strong>Rechtsform des Unternehmens:</strong>
          <br />
          Skyblue Parking ist ein Einzelunternehmen.
          <br />
          <br />
          <strong>Haftungsausschluss:</strong>
          <br />
          Wir übernehmen keine Haftung für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte auf dieser Website. Die Nutzung der Website erfolgt auf eigene Gefahr. Für Schäden, die sich aus der Nutzung dieser Website ergeben, wird keine Haftung übernommen.
        </p>
      </div>
    </section>
  );
};

export default AGBCard;
