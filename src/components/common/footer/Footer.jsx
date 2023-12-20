import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>Sky Blue Parking</h1>
            <span>Valet Parking</span>
            <p></p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box last'>
            <h3>Haben sie Fragen?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Düsseldorferstraße. 32
                <br />Eschborn, 65760
                </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                 0176 12436787
              </li>
            
              <li>
                <i className='fa fa-paper-plane'></i>
                Info@skyblueparking.de
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          <a href="/Datenschutz">Datenschutz</a> | <a href="/Impressum">Impressum</a> | <a href="/AGB">AGB</a> 
        </p>
      </div>
    </>
  )
}

export default Footer
