import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegDotCircle, FaArrowLeft, FaDumbbell, FaYoutube } from "react-icons/fa";
import '../styles/Exercise.css';

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id) => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
      headers: {
        'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setExercise(response.data);
      fetchRelatedVideos(response.data.name);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch exercise details. Please try again later.');
      setLoading(false);
    }
  };

  const fetchRelatedVideos = async (name) => {
    const options = {
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/search',
      params: {
        query: `${name} exercise tutorial`,
        hl: 'en',
        upload_date: 't',
        duration: 'l',
        type: 'v',
        sort: 'r'
      },
      headers: {
        'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRelatedVideos(response.data.contents);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch related videos. Please try again later.');
      setLoading(false);
    }
  };

  // Function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className='exercise-page'>
      <button 
        className="back-button" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading exercise details...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => fetchData(id)}>Try Again</button>
        </div>
      ) : exercise ? (
        <div className="exercise-container">
          <div className="exercise-header">
            <h1>{capitalizeWords(exercise.name)}</h1>
            <div className="exercise-tags">
              <span className="tag primary">
                <FaDumbbell /> {capitalizeWords(exercise.target)}
              </span>
              <span className="tag secondary">
                {capitalizeWords(exercise.bodyPart)}
              </span>
              <span className="tag secondary">
                {capitalizeWords(exercise.equipment)}
              </span>
            </div>
          </div>

          <div className="exercise-content">
            <div className="exercise-image">
              <img src={exercise.gifUrl} alt={exercise.name} />
            </div>

            <div className="exercise-details">
              <div className="detail-section">
                <h3>Target Muscle</h3>
                <p>{capitalizeWords(exercise.target)}</p>
              </div>

              <div className="detail-section">
                <h3>Equipment</h3>
                <p>{capitalizeWords(exercise.equipment)}</p>
              </div>

              <div className="detail-section">
                <h3>Secondary Muscles</h3>
                <div className="muscles-list">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <span key={index} className="muscle-tag">
                      {capitalizeWords(muscle)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section instructions">
                <h3>Instructions</h3>
                <ol className="instructions-list">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>
                      <FaRegDotCircle className="instruction-icon" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!loading && !error && exercise && (
        <div className="related-videos-container">
          <div className="section-header">
            <h2>Related Videos</h2>
            <FaYoutube className="youtube-icon" />
          </div>
          <p>Watch tutorial videos to learn the proper form and technique</p>

          {relatedVideos && relatedVideos.length > 0 ? (
            <div className="related-videos">
              {relatedVideos.slice(0, 9).map((video, index) => (
                <div 
                  className="video-card" 
                  key={index} 
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.video.videoId}`, "_blank")}
                >
                  <div className="video-thumbnail">
                    <img src={video.video.thumbnails[0].url} alt={video.video.title} />
                    <div className="play-button">
                      <FaYoutube />
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.video.title.length > 60 ? video.video.title.slice(0, 60) + '...' : video.video.title}</h3>
                    <div className="video-meta">
                      <p className="channel">{video.video.channelName}</p>
                      <p className="views">{video.video.viewCountText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-videos">
              <p>No related videos found for this exercise.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise;