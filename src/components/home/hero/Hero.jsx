import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='' title='Sky Blue Parking' />
            <p>"Weil Ihre Ankunft genauso beeindruckend sein sollte wie Ihr Auto"</p>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  );
};

export default Hero;
