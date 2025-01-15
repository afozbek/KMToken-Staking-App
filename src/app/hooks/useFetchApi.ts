import { useEffect, useState } from "react";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

// Simple cache
let cachedData: any = null;
let isFetching = false;

const useFetchApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!mounted || isFetching) return;

      // Return cached data if available
      if (cachedData) {
        setData(cachedData);
        return;
      }

      isFetching = true;
      setLoading(true);

      try {
        const response = await fetch(baseUrl);
        const result = await response.json();
        cachedData = result;

        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        isFetching = false;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
};

export default useFetchApi;
