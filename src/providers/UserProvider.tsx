import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/auth/auth";
import { readData } from "../api/auth/store";
import { auth } from "../api/firebase";
import { IUser } from "../types/User.types";

interface UserContextProps {
  currentUser: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);

    if (user!) {
      setCurrentUser(user);
    } else {
      console.error("Login failed");
    }

    setLoading(false);
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      const userDetails = await readData("users", userId);

      if (userDetails) {
        setCurrentUser(userDetails as IUser);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserDetails(user.uid);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
