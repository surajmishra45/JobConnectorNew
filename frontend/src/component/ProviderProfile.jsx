import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "./context/ContextApi";

const ProviderProfile = () => {
  const { value, setValue } = useContext(MyContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [jobData, setJobData] = useState({
    title: "",
    skill: "",
    experience: "",
    location: "",
    maxCTC: "",
    noticePeriod: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!value) {
      console.error("❌ recruiterId is null or undefined!");
      setMessage("❌ Recruiter ID is missing! Please refresh the page.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/job/${value}`,
        { ...jobData, value },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Job Created:", response.data);

      setMessage("✅ Job Created Successfully!");
      setJobData({ title: "", skill: "", experience: "", location: "", maxCTC: "", noticePeriod: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Job Posting Error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.message || "Failed to create job."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Dashboard Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Recruiter Dashboard</h2>
            <p className="text-blue-100 mt-1">Manage your job postings</p>
          </div>
          
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Create Job
            </button>
            
            <button 
              onClick={() => navigate(`/job-list/${value}`)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Posted Jobs
            </button>
          </div>
          



        </div>

        {/* Job Creation Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
              <h3 className="text-xl font-bold text-white">Create Job Posting</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Software Engineer"
                  value={jobData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <input
                  type="text"
                  name="skill"
                  placeholder="React, Node.js, etc."
                  value={jobData.skill}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="3"
                  value={jobData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  value={jobData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max CTC (LPA)</label>
                <input
                  type="number"
                  name="maxCTC"
                  placeholder="12"
                  value={jobData.maxCTC}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                <input
                  type="number"
                  name="noticePeriod"
                  placeholder="30"
                  value={jobData.noticePeriod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
              >
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes("✅") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderProfile;