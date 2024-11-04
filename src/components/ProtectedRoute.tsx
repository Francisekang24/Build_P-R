import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/signin');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}