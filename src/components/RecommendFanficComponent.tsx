import React, { useState } from 'react';
import axios from 'axios'; // axios is for making HTTP requests
import { useRouter } from 'next/router';
import { Fanfic } from './FanficComponent';
import RecommendationComponent from './RecComponent';
import FanficComponent from './FanficComponent';

import { BASE_URL } from '../utils/config'; // Importing the base URL for the API from a config file

// Define the UserInterface component as a functional React component
const RecommendFanficComponent: React.FC = () => {
    // Declare state variable 'recommendation' to hold the fanfic data, initially set to null
    const [description, setDescription] = useState<string>('');
    const [recommendation, setRecommendation] = useState<Fanfic | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff'); // Default background color
    const [error, setError] = useState<string | null>(null); // State variable for error message
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const colors = ['#ECB0A1', '#F2C4C6', '#FEF462', '#B8ECA1', '#A1DEEC', '#A1B8EC', '#FADFCE'];

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    // function that fetches the recommendation when submitted
    const handleSubmit = async () => {
        setLoading(true); // Set loading state to true before making the request
        try {
            const response = await axios.post(`${BASE_URL}/chat`, { message: description });
            setRecommendation(response.data);
            setRandomBackgroundColor();
            setError(null);
        } catch (err) {
            console.error('Error fetching recommendation:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false); // Set loading state to false after the request completes
        }
    };

    // getting a random color and setting it using the function we made earlier
    const setRandomBackgroundColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    };

    const navigateToRandom = () => {
        router.push('/'); // Navigate to the home page
    };

    const openFeedbackForm = () => {
        window.open('https://docs.google.com/forms/d/1os56QbrMxjFgAAXg-VBSfPutC9NnQ0LUmQfHbwh_rPk/edit', '_blank');
    };

    return (
        <div className="container">
            <header className="header">
                <button onClick={openFeedbackForm} className="feedback-form-button-recommend">
                    ( ´ ▽ ` )ﾉ
                </button>
                <button onClick={navigateToRandom} className="navigation-button">
                    Find Random Fanfic
                </button>
            </header>
            <div className="user-interface">
                <div className="flex justify-center mb-6">
                    <h1 style={{ color: '#8c9df8' }}>Fanfic Recommendation Generator</h1>
                </div>
            <div className="flex justify-center mb-6">
               <p>
                  {`This is a recommendation feature I added that allows searching for specific types of fanfics. Content from
                    fanfics is vectorized using TfidfVectorizer, and cosine similarity finds the vector most similar
                    to the submitted query.`} <br /><br /> {`Average sentiment scores range from -1 to 1 and estimate the mood
                    of a fanfic. A negative sentiment score suggests darker themes while a positive sentiment score
                    suggests lighter ones. However, the scores are found by processing the summaries of fanfics and
                    therefore may not encapsulate the sentiment of the entire work.`}
               </p>
            </div>
            <div className="flex justify-center mb-6">
                <textarea
                    value={description}
                    onChange={handleInputChange}
                    placeholder="Describe your desired fanfic..."
                    className="input-textarea"
                />
            </div>
            <div className="button-container">
                <div className="flex justify-center mb-6">
                    <button onClick={handleSubmit} className="custom-rec-button">
                      Get Recommendation
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
                        ) : recommendation ? (
                          <FanficComponent fanfic={recommendation} />
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

// <RecommendationComponent recommendation={recommendation} />
// Export the RecommendFanficComponent component as the default export
export default RecommendFanficComponent;
