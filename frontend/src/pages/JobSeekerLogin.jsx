import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState("seeker"); 
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const backendUrl = import.meta.env.VITE_BACKEND_LINKKS || "http://localhost:3000";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true); 

        const apiUrl = `${backendUrl}/api/auth${role === "provider" ? "provider" : ""}/${isSignup ? "signup" : "login"}`;

        try {
            const { data } = await axios.post(apiUrl, formData);
            setMessage(data.message);
            localStorage.setItem("token", data.token); 

            navigate(role === "seeker" ? "/seeker-profile" : "/recruiter-profile");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            console.error("Login/Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header with Role Selection */}
                <div className="bg-blue-600 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {isSignup ? "Create Account" : "Welcome Back"}
                    </h2>
                    <div className="flex justify-center space-x-4">
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${role === "seeker" ? "bg-white text-blue-600 shadow-md" : "text-white hover:bg-blue-500"}`}
                            onClick={() => setRole("seeker")}
                        >
                            Job Seeker
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${role === "provider" ? "bg-white text-blue-600 shadow-md" : "text-white hover:bg-blue-500"}`}
                            onClick={() => setRole("provider")}
                        >
                            Job Provider
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-6">
                    {message && (
                        <div className={`mb-4 p-3 rounded-md text-sm ${message.includes("wrong") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignup && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isSignup ? "Creating Account..." : "Logging In..."}
                                </span>
                            ) : isSignup ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setIsSignup(!isSignup)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerLogin;