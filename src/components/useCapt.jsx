//Hooks are functions that allow functional components to use React features like state, lifecycle methods, and context without writing a class component.
//Basic Hooks (Most Commonly Used)
// useState – Manages state in functional components.
// useEffect – Handles side effects (API calls, subscriptions, etc.).
// useContext – Provides and consumes context to avoid prop drilling.
// Import necessary dependencies
import { useState } from "react";  // useState is a React Hook for managing state
import axios from "axios";  // axios is used to make HTTP requests

// Define API constants
const API_KEY = import.meta.env.VITE_API_KEY;
// Fetch API key from .env
 // API key for authentication
 const API_URL = import.meta.env.VITE_API_URL;// Endpoint for searching images
//A Custom Hook is a reusable function
// Custom Hook: useImageGenerator
//it starts from use so it is custom hook
// Custom hooks are JavaScript functions that utilize one or more built-in hooks to provide a specific functionality.


if (!API_KEY) {
  console.error("API key is missing!");
}

try {
  // Your API call logic here
} catch (error) {
  console.error("Error fetching API:", error);
}

export function useImageGenerator() {
  // State variables to store the image URL, loading status, and errors
  const [imageUrl, setImageUrl] = useState(null);  // Stores the fetched image URL
  const [loading, setLoading] = useState(false);  // Tracks loading status
  const [error, setError] = useState(null);  // Stores any error messages

  // Function to fetch an image from the API
  const generateImage = async (query) => {
    setLoading(true);  // Set loading state to true when fetching starts
    setError(null);  // Clear previous error messages

    try {
      // Make an API request using axios
      const response = await axios.get(API_URL, {
        headers: { Authorization: API_KEY },  // Pass API key in the headers
        params: { query, per_page: 1 },  // Search query with a limit of 1 image
      });

      // Check if any images are returned
      if (response.data.photos.length > 0) {
        setImageUrl(response.data.photos[0].src.large);  // Store the first image URL
      } else {
        setError("No images found.");  // Show error message if no images are found
      }
    } catch (err) {
      setError("Failed to fetch image.");  // Handle errors such as network failures
    }

    setLoading(false);  // Set loading state to false when request completes
  };

  // Return values so they can be used in other components
  return { imageUrl, loading, error, generateImage };
}
