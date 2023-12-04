import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <Heading subtitle='' title='Zusätzliche Leistungen' />
        <div className='container'>
          <div className='content grid1'>
          {online.map((val) => (
  <div className='box' key={val.courseName}>
    <div className='img'>
      {/* Use FontAwesomeIcon for the check icon */}
      <div className='icon-container'>
        <FontAwesomeIcon icon={faCheck} size='10x' className='check-icon' />
      </div>
    </div>
    <h1>{val.courseName}</h1>
  </div>
))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;
