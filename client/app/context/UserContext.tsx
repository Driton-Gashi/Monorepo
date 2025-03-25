"use client";
import { createContext, useContext, useState } from "react";
interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
  address: string;
  city: string;
  phone: string;
}

interface UserContextType {
  loggedInUserData: User | false;
  setLoggedInUserData: (user: User | false) => void;
} 

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUserData, setLoggedInUserData] = useState<User | false>(false);

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
