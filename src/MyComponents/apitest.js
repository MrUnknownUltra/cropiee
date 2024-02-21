import axios from 'axios';
// Example using axios in a React component
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a GET request to your API endpoint
    axios.get('http://127.0.0.1:8000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once when component mounts

  return (
    <div>
      {data && (
        <p>{`Hello: ${data.Hello}`}</p>
      )}
    </div>
  );
};

export default MyComponent;
