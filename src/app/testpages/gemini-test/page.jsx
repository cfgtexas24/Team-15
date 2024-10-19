"use client";

import { useState } from "react";

export default function JobPostingPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: input }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create a Job Posting</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter job details or instructions here..."
          rows={5}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Generating..." : "Generate Job Posting"}
        </button>
      </form>

      {output && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Generated Job Posting:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}
    </div> */}

    <div className="p-28">
    <h1>Create a Job Posting</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter job details or instructions here..."
          rows={5}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Generating..." : "Generate Job Posting"}
        </button>
      </form>

      {output && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Generated Job Posting:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}

    </div>
    </>
  );
}
