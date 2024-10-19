'use client'
import { useState } from 'react';

export default function CompanyPage() {
  const [response, setResponse] = useState('');

  // Generic function to handle API calls
  const handleApiRequest = async (method, url, body = null) => {
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify(body) }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Company Management</h1>

      {/* Create Company */}
      <button
        onClick={() =>
          handleApiRequest('POST', '/api/companies', {
            name: 'Tech Corp',
            location: 'Houston',
            industry: 'Technology',
          })
        }
      >
        Create Company
      </button>

      {/* Get Companies */}
      <button onClick={() => handleApiRequest('GET', '/api/company')}>
        Get All Companies
      </button>

      {/* Update Company */}
      <button
        onClick={() =>
          handleApiRequest('PUT', '/api/company', {
            id: 'companyId123',
            location: 'San Francisco',
          })
        }
      >
        Update Company
      </button>

      {/* Delete Company */}
      <button
        onClick={() =>
          handleApiRequest('DELETE', '/api/company?id=companyId123')
        }
      >
        Delete Company
      </button>

      <h2>Response:</h2>
      <pre>{response}</pre>
    </div>
  );
}
