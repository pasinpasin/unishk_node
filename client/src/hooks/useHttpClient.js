import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ alertType: "", alertText: "" });

  const authFetch = axios.create({
    baseURL: "/api/v1",
    validateStatus: false,
  });

  //const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = {}) => {
    setIsLoading(true);
    //const httpAbortCtrl = new AbortController();
    //activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const { data } = await authFetch({
        method: method,
        url: url,
        data: body,
      });

      if (data.status !== "success") {
        setError({ alertType: "danger", alertText: "Ka ndodhur nje gabim" });
        clearError();
        throw new Error(data.message);
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      setError({ alertType: "danger", alertText: err.message });
      setIsLoading(false);
      clearError();
      throw err;
    }
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setError({ alertType: "", alertText: "" });
    }, 30000);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
