import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobConnector() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Main Button */}
        <button
          className={`w-full py-4 px-6 text-lg font-bold text-blue-900 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 flex items-center justify-between ${showOptions ? 'border-b border-blue-200' : ''}`}
          onClick={() => setShowOptions(!showOptions)}
        >
          <span>JOB CONNECTOR</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Options Panel */}
        {showOptions && (
          <div className="p-6 bg-blue-50">
            <h3 className="text-center text-blue-800 mb-4 font-medium">Select Your Role</h3>
            <div className="space-y-4">
              <button
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => navigate("/jobseeker-login")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Job Seeker / Provider</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}