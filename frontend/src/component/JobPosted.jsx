import React, { useState, useEffect } from "react";
import axios from "axios";

const JobPosted = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRecruiters, setExpandedRecruiters] = useState({});
  const [editRecruiter, setEditRecruiter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/recruiter");
      setRecruiters(response.data.recruiters);
    } catch (err) {
      setError("Failed to fetch recruiters.");
    } finally {
      setLoading(false);
    }
  };

  const toggleJobs = (id) => {
    setExpandedRecruiters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recruiter?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/recruiter/${id}`);
      setRecruiters(recruiters.filter((rec) => rec._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEditClick = (recruiter) => {
    setEditRecruiter(recruiter);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/recruiter/${editRecruiter._id}`, editRecruiter);
      setRecruiters(recruiters.map((rec) => (rec._id === editRecruiter._id ? editRecruiter : rec)));
      setShowModal(false);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecruiter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Recruiter Directory</h1>
          <p className="text-xl text-gray-600">Find and manage hiring professionals</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recruiters.map((recruiter) => (
              <div key={recruiter._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{recruiter.name}</h3>
                      <p className="text-blue-600 font-medium">{recruiter.company}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => toggleJobs(recruiter._id)} className="p-2 text-blue-600 hover:text-blue-800">
                        ▼
                      </button>
                      <button onClick={() => handleEditClick(recruiter)} className="p-2 text-yellow-600 hover:text-yellow-800">✎</button>
                      <button onClick={() => handleDelete(recruiter._id)} className="p-2 text-red-600 hover:text-red-800">🗑</button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-gray-600">
                    <div>Email: {recruiter.email}</div>
                    <div>Mobile: {recruiter.mobile}</div>
                  </div>

                  {expandedRecruiters[recruiter._id] && recruiter.jobs?.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-semibold mb-3">Job Listings</h4>
                      <div className="space-y-4">
                        {recruiter.jobs.map((job) => (
                          <div key={job._id} className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="text-md font-medium text-gray-900">{job.title}</h5>
                            <div className="text-sm grid grid-cols-2 gap-2 mt-2">
                              <div>Skill: {job.skill}</div>
                              <div>Experience: {job.experience} yrs</div>
                              <div>Location: {job.location}</div>
                              <div>CTC: ₹{job.maxCTC.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showModal && editRecruiter && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-t-xl flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Edit Recruiter</h3>
                <button onClick={() => setShowModal(false)} className="text-white text-lg font-bold">✖</button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editRecruiter.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editRecruiter.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editRecruiter.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={editRecruiter.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPosted;
