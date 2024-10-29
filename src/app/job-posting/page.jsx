"use client";
import { useState } from 'react';


const JobPostingPage = () => {
  const [jobData, setJobData] = useState({
    title: '',
    role: '',
    skills: '',
    salary: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (
e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: `Job Title: ${jobData.title}, Role: ${jobData.role}, Skills: ${jobData.skills}, Salary: ${jobData.salary}`,
        }),
      });

      const result = await response.json();
      setJobData((prevData) => ({ ...prevData, description: result.output }));
    } catch (error) {
      console.error('Error generating job description:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-posting-page">
      <h1>Create a Job Posting</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={jobData.role}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={jobData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Description'}
        </button>
      </form>
      {jobData.description && (
        <div className="description-output">
          <h2>Generated Job Description</h2>
          <p>{jobData.description}</p>
        </div>
      )}
    </div>
  );
};

export default JobPostingPage;