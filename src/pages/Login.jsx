import { useState } from "react";
// Removed: import "../css/style.css"; // Assuming Tailwind handles all styling now
import { supabase } from "../supabase-client";
import logo from "../assets/main_logo.png";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

const navigate = useNavigate()

  const handleLogo = () =>{
    navigate("/")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      if (isSignUp) {
        // --- Sign Up Logic ---
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
          console.error("Error in Sign Up:", signUpError.message);
          return;
        }

        // Optional: Provide feedback for successful sign-up (e.g., check email)
        alert("Sign Up successful! Please check your email to confirm your account.");

      } else {
        // --- Sign In Logic ---
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          setError(signInError.message);
          console.error("Error in Sign In:", signInError.message);
          return;
        }
        
        // Successful sign-in logic here (e.g., redirect or state update)
      }
    } catch (err) {
      // Catch any unexpected errors during the process
      setError("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    // Outer container: centered, max-width, padding, light border/shadow
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white border-10 border-indigo-200 p-8 rounded-lg shadow-xl">
        <div onClick={handleLogo}> <img alt="" src={logo} className="h-30 w-auto mx-auto py-4 cursor-pointer" /></div>
         
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          
          {isSignUp ? "Create an Account" : "Sign in to your Account"}
        </h2>
        
        {/* --- Error Display --- */}
        {error && (
          <p className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded font-medium">
            **Error:** {error}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-indigo-600 font-medium float-left pb-3 ">Email Address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              // Input styling: full width, padding, border, rounded corners, focus ring
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          
          <label className="block">
            <span className="text-indigo-600 font-medium float-left pb-3">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              // Input styling
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button 
            type="submit" 
            // Button styling: primary color, full width, padding, hover effect, disabled state
            className={`signin py-2 px-2 rounded-md text-white font-semibold transition duration-150 ease-in-out ${
              loading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>

        <div
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null); 
            setEmail(""); 
            setPassword("");
          }}
          // Switch button styling: subtle, primary text color, hover effect
          className={`cursor-pointer mt-2 text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </div>
      </div>
    </div>
  );
};
