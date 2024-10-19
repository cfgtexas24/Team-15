"use client";
import { useState } from 'react';
import './job_posting.css';

const JobPostingPage = () => {
  const [jobData, setJobData] = useState({
    title: '',
    role: '',
    skills: '',
    salary: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const skillVariations = (skills) => {
    // Generate different ways of phrasing skills
    const skillArray = skills.split(',').map(skill => skill.trim());
    return skillArray.map(skill => {
      return `Proficiency in ${skill}, expertise with ${skill}, or solid experience in ${skill}`;
    }).join('; ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: `Job Title: ${jobData.title}\nRole: ${jobData.role}\nSkills: ${jobData.skills}\nSalary: ${jobData.salary}`,
        }),
      });

      const result = await response.json();
      const formattedDescription = result.output.replace(/(\r\n|\n|\r)/gm, ' '); // Remove JSON-like formatting
      setJobData((prevData) => ({ ...prevData, description: formattedDescription }));

      print(jobData)
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
        <label>
          Job Title:
          <input
            type="text"
            name="title"
            placeholder="Enter job title"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role:
          <input
            type="text"
            name="role"
            placeholder="Enter job role"
            value={jobData.role}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Skills:
          <input
            type="text"
            name="skills"
            placeholder="Enter required skills (comma separated)"
            value={jobData.skills}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Salary:
          <input
            type="text"
            name="salary"
            placeholder="Enter salary range"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Description'}
        </button>
      </form>

      {jobData.description && (
        <div className="description-output">
          <h2>Generated Job Description</h2>
          <p><strong>Job Title:</strong> {jobData.title}</p>
          <p><strong>Role:</strong> {jobData.role}</p>
          <p><strong>Skills Required:</strong> {skillVariations(jobData.skills)}</p>
          <p><strong>Salary:</strong> {jobData.salary}</p>
          <p><strong>Description:</strong> {JSON.parse.jobData[""]}</p>
        </div>
      )}
    </div>
  );
};

export default JobPostingPage;
