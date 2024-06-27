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
  const router = useRouter();

  const colors = ['#ECB0A1', '#F2C4C6', '#FEF462', '#B8ECA1', '#A1DEEC', '#A1B8EC', '#FADFCE'];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // function that fetches the recommendation when submitted
  const handleSubmit = async () => {
    try {
//       const response = await axios.get(`${BASE_URL}/random_fanfic`);
      const response = await axios.post(`${BASE_URL}/chat`, { message: description });
      setRecommendation(response.data);
      setRandomBackgroundColor();
      setError(null);
//       setError(response.data.response);
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setRandomBackgroundColor();
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // getting a random color and setting it using the function we made earlier
  const setRandomBackgroundColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  const navigateToHome = () => {
    router.push('/'); // Navigate to the home page
  };

   return (
    <div className="container">
      <div className="user-interface">
        <div className="flex justify-center mb-6">
          <h1 style={{ color: '#8c9df8' }}>Fanfic Recommendation Generator</h1>
        </div>
        <div className="flex justify-center mb-6">
          <p>
            {`This is a recommendation feature I added that allows searching for specific types of fanfics.. Content from
              fanfics was vectorized using TfidfVectorizer, and cosine similarity is used to find the vector most similar
              to the submitted query.`}
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
              Submit
            </button>
          </div>
          <div className="flex justify-end mt-4 mr-4 absolute top-0 right-0">
            <button onClick={navigateToHome} className="navigation-button">
                Random Fanfic
            </button>
          </div>
        </div>
        <div className="fanfic-box" style={{ backgroundColor, color: '#4E3629' }}>
          <div className="fanfic-content">
            {error ? (
              <div>
                <h2>Title</h2>
                <p>{error}</p>
              </div>
            ) : recommendation ? (
              <FanficComponent fanfic={recommendation} />
            ) : (
              <p>Click to start generating.</p>
            )}
          </div>
        </div>
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
