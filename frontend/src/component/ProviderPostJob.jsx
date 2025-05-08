import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const AllRecruiterFind = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [editRecruiter, setEditRecruiter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [error, setError] = useState(null);

  // ✅ Fetch recruiters
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/recruiter`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.recruiters || [];
        setRecruiters(data);
      })
      .catch((err) => {
        console.error("Error fetching recruiters:", err);
        setError("⚠️ Failed to fetch recruiters. Please check backend connection.");
      });
  }, []);

  const handleEdit = (recruiter) => {
    setEditRecruiter(recruiter);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/api/recruiter/${id}`)
      .then(() => {
        setRecruiters((prev) => prev.filter((r) => r._id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setError("Failed to delete recruiter.");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/api/recruiter/${editRecruiter._id}`, editRecruiter)
      .then((res) => {
        setRecruiters((prev) =>
          prev.map((r) =>
            r._id === editRecruiter._id ? res.data : r
          )
        );
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Update error:", err);
        setError("Failed to update recruiter.");
      });
  };

  const toggleJobs = (id) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("bg-black")) {
        setShowModal(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Recruiters</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {recruiters.length === 0 && !error && (
        <div className="text-gray-500">No recruiters found.</div>
      )}

      {recruiters.map((recruiter) => (
        <div
          key={recruiter._id}
          className="bg-white shadow-md rounded-lg p-6 mb-4"
        >
          <h2 className="text-xl font-semibold">{recruiter.name}</h2>
          <p className="text-gray-600">{recruiter.email}</p>
          <div className="mt-4 space-x-3">
            <button
              onClick={() => toggleJobs(recruiter._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {expandedJobs[recruiter._id] ? "Hide Jobs" : "Show Jobs"}
            </button>
            <button
              onClick={() => handleEdit(recruiter)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(recruiter._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>

          {expandedJobs[recruiter._id] && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Jobs:</h3>
              <ul className="list-disc pl-6">
                {recruiter.jobs && recruiter.jobs.length > 0 ? (
                  recruiter.jobs.map((job, index) => (
                    <li key={index} className="text-gray-700">
                      {job.title} – {job.skill} – {job.location}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No jobs found.</li>
                )}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Edit Recruiter</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name:</label>
                <input
                  type="text"
                  value={editRecruiter.name}
                  onChange={(e) =>
                    setEditRecruiter((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email:</label>
                <input
                  type="email"
                  value={editRecruiter.email}
                  onChange={(e) =>
                    setEditRecruiter((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecruiterFind;
