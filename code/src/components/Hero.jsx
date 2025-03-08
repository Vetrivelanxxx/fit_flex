import React from 'react'
import '../styles/Hero.css'
import { FaDumbbell, FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className='hero-container' id='hero'>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">
            <FaDumbbell className="hero-icon" />
            <h5>FitFlex Fitness</h5>
          </span>
          <h1>Transform Your Body, <br /><span className="highlight">Elevate</span> Your Life</h1>
          <p>Discover thousands of exercises tailored to your fitness goals. Whether you're a beginner or a pro, we have the perfect workout for you.</p>
          <div className="hero-buttons">
            <a href="#search"><button className="primary-btn">Explore Exercises</button></a>
            <a href="#about"><button className="secondary-btn">Learn More</button></a>
          </div>
        </div>
        <div className="scroll-indicator">
          <p>Scroll Down</p>
          <FaArrowDown className="scroll-arrow" />
        </div>
      </div>
    </div>
  )
}

export default Hero