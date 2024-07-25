import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for polling data at regular intervals.
 * @param {function} fetchData - Function that fetches data.
 * @param {number} interval - Polling interval in milliseconds.
 */
function usePolling(fetchData, interval) {
  const intervalRef = useRef(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchDataWithInterval = async () => {
      try {
        const data = await fetchData();
        setResponse(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Start polling when the component mounts
    fetchDataWithInterval();

    // Set up interval to poll for data
    intervalRef.current = setInterval(fetchDataWithInterval, interval);

    // Clean up interval when the component unmounts or interval changes
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [fetchData, interval]);

  // Function to manually stop polling if needed
  const stopPolling = () => {
    clearInterval(intervalRef.current);
  };

  return { stopPolling, response };
}

export default usePolling;
