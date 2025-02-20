//in this project custom hooks topic is covered. we didn't use useeffect and usecallback hooks because useEffect is used when we want something to happen automatically when a component mounts (loads) or updates (e.g., when a state/prop changes).
// In my project, the API call only happens when the button is clicked, so useEffect is not required.
// Importing required hooks and styles
import { useState } from "react"; // useState is used to manage input state
import { useImageGenerator } from "./components/useCapt"; // Importing the custom hook for image generation
import "animate.css"; // Importing animate.css for animations

function App() {
  // State to store the user's input (image description)
  const [prompt, setPrompt] = useState("");

  // Destructuring values from the custom hook: imageUrl, loading status, error message, and function to generate images
  const { imageUrl, loading, error, generateImage } = useImageGenerator();

  // Function to handle image generation when the button is clicked
  const handleGenerate = () => {
    if (prompt.trim()) { // Checks if input is not empty or spaces
      generateImage(prompt); // Calls the function to fetch an image
    }
  };

  return (
    // Main container with flexbox properties to center content
    <div
      className="flex justify-center items-center min-h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-vivid-abstract-texture-a-burst-of-colorful-background-picture-image_15292555.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay to lighten the background */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>

      {/* Inner container for the content box */}
      <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl animate__animated animate__fadeIn w-full max-w-lg text-center">
        
      <h1 className="text-4xl font-bold text-center mb-4 animate__animated animate__bounceIn 
  bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
  AI Image Generator
</h1>


        {/* Input Box for entering the image description */}
        <input
          type="text"
          className="w-full p-3 text-black rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          placeholder="Enter an image description..." // Placeholder text for guidance
          value={prompt} // Binds input value to the state
          onChange={(e) => setPrompt(e.target.value)} // Updates state when input changes
        />

        {/* Button to trigger image generation */}
        <button
          onClick={handleGenerate} // Calls handleGenerate function when clicked
          className="mt-4 px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition duration-300 shadow-md transform hover:scale-105"
          disabled={loading} // Disables button when loading is true
        >
          {loading ? "Generating..." : "Generate Image"} 
          {/* Changes text when loading */}
        </button>

        {/* Error Message Display */}
        {error && <p className="text-red-500 mt-4">{error}</p>} 

        {/* Displays generated image if available */}
        {imageUrl && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg border border-gray-500 animate__animated animate__zoomIn">
            <img
              src={imageUrl} // Displays the fetched image
              alt="Generated" // Alternative text for accessibility
              className="w-80 h-80 rounded-md object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App; // Exports the component for use in other files 
