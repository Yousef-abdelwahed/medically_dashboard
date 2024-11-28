import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api/api";

const useFetchData = (type: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any[]>(`${API_BASE}/${type}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { data, loading };
};

export default useFetchData;
