import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios is for making HTTP requests
import { useRouter } from 'next/router';
import FanficComponent from './FanficComponent';
import { Fanfic } from './FanficComponent';
import { BASE_URL } from '../utils/config'; // Importing the base URL for the API from a config file

// Define the UserInterface component as a functional React component
const UserInterface: React.FC = () => {
    // Declare state variable 'fanfic' to hold the fanfic data, initially set to null
    const [fanfic, setFanfic] = useState<Fanfic | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff'); // Default background color
    const [error, setError] = useState<string | null>(null); // State variable for error message
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const colors = ['#ECB0A1', '#F2C4C6', '#FEF462', '#B8ECA1', '#A1DEEC', '#A1B8EC', '#FADFCE'];

    // Function to fetch fanfic data from the backend API and set it using the function we made earlier
    const fetchFanfic = async () => {
        setLoading(true); // Set loading state to true before making the request
        try {
            const response = await axios.get(`${BASE_URL}/random_fanfic`);
            setFanfic(response.data);
            setError(null); // Clear error if request is successful
        } catch (error) {
            console.error('Error fetching fanfic:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setLoading(false); // Set loading state to false after the request completes
        }
    };

    // getting a random color and setting it using the function we made earlier
    const setRandomBackgroundColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    };


    // Event handler for the button to fetch a new fanfic
    const handleGetNewFanfic = () => {
        fetchFanfic();
        setRandomBackgroundColor();
    };

    const navigateToRecommend = () => {
        router.push('/recommend');
    };

    const openFeedbackForm = () => {
        window.open('https://docs.google.com/forms/d/1os56QbrMxjFgAAXg-VBSfPutC9NnQ0LUmQfHbwh_rPk/edit', '_blank');
    };

    return (
        <div className="container">
            <header className="header">
                <button onClick={openFeedbackForm} className="feedback-form-button-random">
                    ( ´ ▽ ` )ﾉ
                </button>
                <button onClick={navigateToRecommend} className="navigation-button">
                    Find Recommended Fanfic
                </button>
            </header>
        <div className="user-interface">
            <div className="flex justify-center mb-3">
                <h1 style={{ color: '#8c9df8' }}>Random Fanfic Generator</h1>
            </div>
            <div className="flex justify-center mb-6">
                <p>
                    {`Hello! This is a little project I made to explore webscraping, sentiment analysis,
                      web development, and the fanfic community. I only pulled the top 10 most kudosed fanfics from
                      fandoms of over 5,000 fanfics on Ao3 (total of around 6.7k fics), but I hope to eventually expand my range.
                      If you have a specific fic you want in the database, feel free to send me its details or a link to it through
                      the form linked at the upper right. Happy reading!`}
                </p>
            </div>
            <div className="button-container">
                <div className="flex justify-center mb-6">
                    <button onClick={handleGetNewFanfic} className="custom-button">
                        Get New Fanfic
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="hourglass">
                    <div className="half"></div>
                    <div className="half"></div>
                </div>
            ) : (
                <div className="fanfic-box" style={{ backgroundColor, color: '#4E3629' }}>
                    <div className="fanfic-content">
                        {error ? (
                            <div>
                                <h2>Please Resubmit</h2>
                                <p>Our server may be overloaded.</p>
                            </div>
                        ) : fanfic ? (
                            <FanficComponent fanfic={fanfic} />
                        ) : (
                            <p>Click to start generating.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Kathryn Lee</p>
                </div>
            </footer>
        </div>
    );
};

// Export the UserInterface component as the default export
export default UserInterface;
