import { useEffect, useState } from 'react';

export const useData = ({ url, method = 'get', headers = {}, body = {} }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url, {
      method: method,
      headers,
      body: method === 'get' ? null : body,
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          setData(response);
        }, 2000);
      })
      .catch((error) => setError(error));
  }, []);

  return { loading, data, error };
};

export const usePostApi = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  function mutation({ url, method = 'get', headers = {}, body = {} }) {
    setLoading(true);
    fetch(url, {
      method: method,
      headers,
      body: method === 'get' ? null : body,
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          setData(response);
        }, 2000);
      })
      .catch((error) => setError(error));
  }
  return { mutation, loading, data, error };
};
