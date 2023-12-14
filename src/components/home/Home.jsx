import React from "react"
import AboutCard from "../about/AboutCard"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Availability from '../availability/avai'
import Testimonal from "./testimonal/Testimonal"
import VorgangCard from "../vorgang/vorgang"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <Availability />
      <VorgangCard />
      <HAbout />

    </>
  )
}

export default Home
