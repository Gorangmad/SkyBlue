import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";

const AboutCard = () => {

  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row'>
            <Heading subtitle='' title='Über uns' />
            <div className='items'>
              {homeAbout.map((val, index) => (
                <div className='item flexSB' key={index}>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                  </div>
                  <div className='text'>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      <section className='additional-section'>
          <div  className='card'>
            <div className='card-inner'>
              <h1 className='blue-heading'>Pflegeleitbild und Grundprinzipien</h1>
              <p>
               In unserem Leitbild halten wir fest, wonach wir streben und nach welchen Grundprinzipien sich unser pflegerisches Handeln richtet. Unser Pflegeleitbild orientiert sich am Modell der fördernden
               Prozesspflege nach Monika Krohwinkel. Die Parallelisierung von Lebensprozess und Pflegeprozess bildet die Grundlage für unser Pflegeverständnis.
              </p>

              <ul className='bullet-list'>
              <li> In diesem Kontext stehen folgende Prinzipien im Vordergrund</li>
              <li>Die Unterstützung des zu Pflegenden bei der Gestaltung seines Alltags. Einbeziehung der Bezugspersonen im gesamten Pflegeprozess mit ein.</li>
              <li>Ermunterung der Pflegebedürftigen, die Gestaltung der Pflege aktiv mitzubestimmen. </li>
              <li>Gleichberechtigte Partnerschaft mit dem Patienten im Pflegeprozess.</li>
              <li>Durchführung der Pflege ganzheitlich, unter Beachtung der Gesamtsituation des Pflegekunden.</li>
               </ul>
            </div>
          </div>
          <div  className='card'>
            <div className='card-inner'>
              <h1 className='blue-heading'>Werte, Würde des Menschen und Vision</h1>
              <p>
              Unsere Werte orientieren sich an der Würde des Menschen. Dies schließt das Recht ein, auch mit Beeinträchtigungen ein möglichst selbstständiges und selbstbestimmtes Leben zu führen. Unsere Vision ist es, die beste Pflege und Unterstützung im eigenen Zuhause zu gewährleisten. Der Anspruch ist, die Lebensqualität von zu Pflegenden, Angehörigen und Mitarbeitern auf das Maximum zu steigern. Die eigenen Vierwände sind mehr als ein Dach über dem Kopf; sie vermitteln Sicherheit, Privatsphäre, Erinnerungen, Freiheit und Selbstbestimmtheit.
              </p>
            </div>
          </div>
          <div  className='card'>
            <div className='card-inner'>
              <h1 className='blue-heading'>Patientenwahrnehmung und Angebot</h1>
              <p>
              Wir nehmen die Patienten in ihrer Häuslichen Umgebung wahr, um Hinweise auf individuelle Vorlieben, Lebensstil und notwendige Versorgung zu erhalten. Unser professionelles Team setzt alles daran, diese Unterstützung im Rahmen des Möglichen auszuschöpfen. Neben herkömmlichen pflegerischen und hauswirtschaftlichen Leistungen bieten wir ein umfangreiches Netzwerk, zahlreiche Zusatzleistungen und Hilfen zur Verbesserung an. Dies beinhaltet eine professionelle, qualitätsgesicherte Analyse der Anforderungen, Beratung von Patienten und Angehörigen sowie die Definition genauer Pflege- und Serviceleistungen.
              </p>
            </div>
          </div>
      </section>
    </>
  );
};

export default AboutCard;
