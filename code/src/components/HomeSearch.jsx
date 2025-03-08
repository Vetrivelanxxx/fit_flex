import React, { useEffect, useState } from 'react';
import { FaFireAlt, FaDumbbell, FaSearch } from "react-icons/fa";
import '../styles/HomeSearch.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('bodyPart');
  const [bodyParts, setBodyParts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API configuration for fetching body parts
  const bodyPartsOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  // API configuration for fetching equipment
  const equipmentOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
    headers: {
      'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  // Handle search submission
  const handleSearch = () => {
    if (search !== '') {
      if (searchType === 'bodyPart') {
        navigate(`/bodyPart/${search}`);
      } else if (searchType === 'equipment') {
        navigate(`/equipment/${search}`);
      }
      setSearch('');
    }
  };

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch body parts data
      const bodyPartsData = await axios.request(bodyPartsOptions);
      setBodyParts(bodyPartsData.data);

      // Fetch equipment data
      const equipmentData = await axios.request(equipmentOptions);
      setEquipment(equipmentData.data);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Popular categories to display
  const popularCategories = [
    {
      id: 'back',
      name: 'Back',
      type: 'bodyPart',
      image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'cardio',
      name: 'Cardio',
      type: 'bodyPart',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 'chest',
      name: 'Chest',
      type: 'bodyPart',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'dumbbell',
      name: 'Dumbbell',
      type: 'equipment',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 'lower arms',
      name: 'Lower Arms',
      type: 'bodyPart',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'lower legs',
      name: 'Lower Legs',
      type: 'bodyPart',
      image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  return (
    <div className='home-search-component' id='search'>
      <div className="search-container">
        <h2>Find Your Perfect Workout</h2>
        <p>Search through thousands of exercises to find the perfect one for your fitness goals</p>
        
        <div className="search-type-buttons">
          <button 
            className={searchType === 'bodyPart' ? 'active' : ''} 
            onClick={() => setSearchType('bodyPart')}
          >
            Body Parts
          </button>
          <button 
            className={searchType === 'equipment' ? 'active' : ''} 
            onClick={() => setSearchType('equipment')}
          >
            Equipment
          </button>
        </div>
        
        <div className='search-body'>
          {loading ? (
            <div className="loading">Loading categories...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              {searchType === 'bodyPart' ? (
                <select 
                  onChange={(e) => setSearch(e.target.value)} 
                  value={search}
                >
                  <option value="">Choose body part</option>
                  {bodyParts.map((bodyPart, index) => (
                    <option key={index} value={bodyPart}>{bodyPart}</option>
                  ))}
                </select>
              ) : (
                <select 
                  onChange={(e) => setSearch(e.target.value)} 
                  value={search}
                >
                  <option value="">Choose Equipment</option>
                  {equipment.map((equip, index) => (
                    <option key={index} value={equip}>{equip}</option>
                  ))}
                </select>
              )}
              <button onClick={handleSearch}>
                <FaSearch /> Search
              </button>
            </>
          )}
        </div>
      </div>

      <div className="popular-categories-section">
        <div className="section-header">
          <h2>Popular Categories</h2>
          <FaFireAlt className="fire-icon" />
        </div>
        <p>Explore our most popular workout categories to get started quickly</p>
        
        <div className="popular-categories-grid">
          {popularCategories.map((category, index) => (
            <div 
              className="category-card" 
              key={index} 
              onClick={() => navigate(`/${category.type}/${category.id}`)}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <div className="category-icon">
                  {category.type === 'equipment' ? <FaDumbbell /> : <FaFireAlt />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;