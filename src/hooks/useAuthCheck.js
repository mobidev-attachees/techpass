// src/hooks/useAuthCheck.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You are not logged in. Please log in to create events.");
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  return isLoggedIn;
};

export default useAuthCheck;
