import { useEffect, useState } from "react";
import axios from "axios";

const useGetRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // optional
  const [error, setError] = useState(null); // optional

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    axios
      .get(`http://localhost:3000/users/role/${email}`)
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
