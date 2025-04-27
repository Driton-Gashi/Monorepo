"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { apiHandler } from "../utils/helpfulFunctions";

interface User {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  address?: string;
  city?: string;
  phone?: string;
  role?: string;
}

interface UserContextType {
  loggedInUserData: User | false;
  setLoggedInUserData: (user: User | false) => void;
} 

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUserData, setLoggedInUserData] = useState<User | false>(false);

  useEffect(() => {
    const loadInitialUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getUserDataFromToken(token);
        setLoggedInUserData(userData);
      }
    };
  
    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          const userData = await getUserDataFromToken(e.newValue);
          setLoggedInUserData(userData);
        } else {
          setLoggedInUserData(false);
        }
      }
    };
  
    loadInitialUserData();
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getUserDataFromToken = async(token: string): Promise<User | false> => {
    try {
      const response = await fetch(apiHandler(`/api/verify-token/${token}`))
      const result = await response.json();
      return result.user;
    } catch (error) {
      console.error("You can't continue please try to login again: "+ error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ loggedInUserData, setLoggedInUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};