import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminGuard({ children }) {
  const { user, getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      setLoading(false);
    };

    fetchData();
  }, [getToken]);

  const isAdmin = () => {
    return user !== null && user.role === 'Admin';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && isAdmin() ? children : <Navigate to="/login" />;
}
