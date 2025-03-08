import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Categories.css';
import { FaArrowLeft } from 'react-icons/fa';

const EquipmentCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${id}`,
                    headers: {
                        'X-RapidAPI-Key': '81ee2aa7d1mshadb4a1b664dea4fp1b10c0jsnf21f646ba9d5',
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }
                });
                setExercises(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Function to capitalize first letter of each word
    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="category-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading exercises: {error.message}</p>
            ) : (
                <div className="exercises-list">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="exercise-card">
                            <h3>{exercise.name}</h3>
                            <p>Target: {exercise.target}</p>
                            <p>Body Part: {exercise.bodyPart}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EquipmentCategory;