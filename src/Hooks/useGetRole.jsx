import { useEffect, useState } from "react";
import axios from "axios";

const useGetRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    axios
      .get(`https://local-market-server-eight.vercel.app/users/role/${email}`)
      .then((res) => {
        setRole(res.data.role);
        setError(null);
      })
      .catch((err) => {
        setRole(null);
        setError(err);
        console.error("Failed to fetch user role:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);
  return { role, loading, error };
};

export default useGetRole;
