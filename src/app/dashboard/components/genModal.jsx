"use client";
import { useState } from "react";

const JobPostingModal = ({ isOpen, onClose, addJobPosting }) => {
  const [jobData, setJobData] = useState({
    name: "", // Job title
    company: "",
    location: "",
    salary: "",
    desc: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: `Job Name: ${jobData.name}\nCompany: ${jobData.company}\nLocation: ${jobData.location}\nRequirements: ${jobData.requirements}\nSalary: ${jobData.salary}`,
        }),
      });
      const result = await response.json();
      const formattedDescription = result.output.replace(/(\r\n|\n|\r)/gm, " ");
      setJobData(JSON.parse(formattedDescription));
    } catch (error) {
      console.error("Error generating job description:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddPosting = () => {
    const formattedJob = {
      ...jobData,
    };
    addJobPosting(formattedJob);
    onClose(); // Close modal after adding
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-7xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">Create a Job Posting</h1>

        <div className="grid grid-cols-2 gap-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Job Title"
              value={jobData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={jobData.company}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={jobData.location}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary Range"
              value={jobData.salary}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <textarea
              name="requirements"
              placeholder="Requirements (comma separated)"
              value={jobData.requirements}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className={`mt-4 p-2 rounded bg-yellow-500 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
              }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Description"}
            </button>
          </form>

          {jobData.desc && (
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="text-xl font-semibold mb-2">Generated Job Description</h2>
              <p><strong>Job Title:</strong> {jobData.name}</p>
              <p><strong>Company:</strong> {jobData.company}</p>
              <p><strong>Location:</strong> {jobData.location}</p>
              <p><strong>Salary:</strong> {jobData.salary}</p>
              <p><strong>Requirements:</strong> {jobData.requirements}</p>
              <p><strong>Description:</strong> {jobData.desc}</p>
              <button
                onClick={handleAddPosting}
                className="mt-4 p-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Add to Job Postings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingModal;
