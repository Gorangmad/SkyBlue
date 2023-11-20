import React from "react"
import "./courses.css"
import { online } from "../../dummydata"
import Heading from "../common/heading/Heading"

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
      <Heading subtitle='COURSES' title='Unsere Leistungen' />
        <div className='container'>
          <div className='content grid1'>
            {online.map((val) => (
              <div className='box'>
                <div className='img'>
                  <img src={val.hoverCover} alt='' className='show' />
                  </div>
                <h1>{val.courseName}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
