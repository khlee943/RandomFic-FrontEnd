import React, { useState } from 'react'; // Importing necessary hooks from React
import axios from 'axios'; // Importing axios for making HTTP requests
import FanficComponent from './FanficComponent'; // Importing the FanficComponent to display fanfic details
import { Fanfic } from './FanficComponent'; // Importing the Fanfic interface for TypeScript type-checking
import { BASE_URL } from '../utils/config'; // Importing the base URL for the API from a config file

// Define the UserInterface component as a functional React component
const UserInterface: React.FC = () => {
  // Declare state variable 'fanfic' to hold the fanfic data, initially set to null
  const [fanfic, setFanfic] = useState<Fanfic | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff'); // Default background color
  const [error, setError] = useState<string | null>(null); // State variable for error message

  const colors = ['#ECB0A1', '#F2C4C6', '#FEF462', '#B8ECA1', '#A1DEEC', '#A1B8EC', '#FADFCE'];

  // Function to fetch fanfic data from the backend API and set it using the function we made earlier
  const fetchFanfic = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/random_fanfic`);
      setFanfic(response.data);
      setError(null); // Clear error if request is successful
    } catch (error) {
      console.error('Error fetching fanfic:', error);
      setError(traceback.print_exc());
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

   return (
    <div className="container">
        <div className="user-interface">
          <div className="flex justify-center mb-6">
            <h1 style={{ color: '#8c9df8' }}>Random Fanfic Generator</h1>
          </div>
          <div className="flex justify-center mb-6">
            <p>
                {`Hello! This is a little project I made to explore webscraping, sentiment analysis,
                web development, and the fanfic community. I only pulled the top 10 most kudosed fanfics from
                fandoms of over 10,000 fanfics (total of around 2.8k fics), but I hope to eventually expand my range.
                If you have a specific fic you want in the database, feel free to email me its details or a link to it.
                Happy reading!`}
            </p>
          </div>
          <div className="flex justify-center mb-6">
            <button onClick={handleGetNewFanfic} className='custom-button'>
              Get New Fanfic
            </button>
          </div>
          <div className="fanfic-box" style={{ backgroundColor, color:'#4E3629' }}>
            <div className="fanfic-content">
                {error ? (
                  <div>
                      <h2>Title</h2>
                      <p>{error}</p>
                  </div>
                ) : fanfic ? (
                  <FanficComponent fanfic={fanfic} />
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


// Export the UserInterface component as the default export
export default UserInterface;