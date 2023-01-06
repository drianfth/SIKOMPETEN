import axios from "axios";
import React, { useEffect, useState } from "react";

const registerApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/register",
});

const useRegister = (params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await registerApi.post(params);
      setData(response.data);
    } catch (err) {
      setError(err.response);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useRegister;
