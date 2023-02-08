import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authFetch = axios.create({
    baseURL: "/api/v1",
    validateStatus: false,
  });

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = {}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await authFetch(url, {
        method,
        body,

        signal: httpAbortCtrl.signal,
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortCtrl
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
