import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css';
import { FaDumbbell, FaArrowLeft } from 'react-icons/fa';

const BodyPartsCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
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
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${id}`,
            params: { limit: '50' },
            headers: {
                'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setExercises(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch exercises. Please try again later.');
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
        <div className='category-exercises-page'>
            <div className="category-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate('/')}
                >
                    <FaArrowLeft /> Back to Home
                </button>
                <h1>
                    <span className="category-title">{capitalizeWords(id)}</span> Exercises
                </h1>
                <p>Discover the best exercises to target your {id} muscles and improve your fitness</p>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading exercises...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => fetchData(id)}>Try Again</button>
                </div>
            ) : exercises.length === 0 ? (
                <div className="no-results">
                    <p>No exercises found for this category. Please try another category.</p>
                </div>
            ) : (
                <div className="exercises-grid">
                    {exercises.map((exercise, index) => (
                        <div 
                            className="exercise-card" 
                            key={index} 
                            onClick={() => navigate(`/exercise/${exercise.id}`)}
                        >
                            <div className="exercise-image">
                                <img src={exercise.gifUrl} alt={exercise.name} />
                            </div>
                            <div className="exercise-details">
                                <h3>{capitalizeWords(exercise.name)}</h3>
                                <div className="exercise-meta">
                                    <span className="target-muscle">
                                        <FaDumbbell /> {capitalizeWords(exercise.target)}
                                    </span>
                                    <span className="equipment">
                                        Equipment: {capitalizeWords(exercise.equipment)}
                                    </span>
                                </div>
                                <div className="secondary-muscles">
                                    {exercise.secondaryMuscles.slice(0, 3).map((muscle, idx) => (
                                        <span key={idx} className="muscle-tag">
                                            {capitalizeWords(muscle)}
                                        </span>
                                    ))}
                                    {exercise.secondaryMuscles.length > 3 && (
                                        <span className="muscle-tag more">
                                            +{exercise.secondaryMuscles.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BodyPartsCategory;