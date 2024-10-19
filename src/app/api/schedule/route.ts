export default async function handler(req, res) {
    try {
      const response = await fetch('https://api.calendly.com/scheduled_events', {
        headers: {
          Authorization: `Bearer `, // Replace with API Key
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data.collection); // `collection` contains the events
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  