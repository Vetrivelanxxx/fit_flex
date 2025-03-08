import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isHomePage = url === "http://localhost:3000/" || 
                     url === "http://localhost:3000/#about" || 
                     url === "http://localhost:3000/#search" ||
                     url === "http://localhost:3000/#newsletter";

  return (
    <div className={scrollPosition > 100 || !isHomePage ? 'navbar nav-scrolled' : 'navbar'}>
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <FaDumbbell className="logo-icon" />
        <h3>FitFlex</h3>
      </div>
      
      <div className="mobile-menu-button" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
        {isHomePage ? (
          <ul>
            <li onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}>Home</li>
            <li>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            </li>
            <li>
              <a href="#search" onClick={() => setMobileMenuOpen(false)}>Search</a>
            </li>
            <li>
              <a href="#newsletter" onClick={() => setMobileMenuOpen(false)}>Subscribe</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}>Home</li>
            <li onClick={() => {
              navigate('/#about');
              setMobileMenuOpen(false);
            }}>About</li>
            <li onClick={() => {
              navigate('/#search');
              setMobileMenuOpen(false);
            }}>Search</li>
            <li onClick={() => {
              navigate('/#newsletter');
              setMobileMenuOpen(false);
            }}>Subscribe</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar