import {
  User,
  onAuthStateChanged,
  updatePassword as updateFirebasePassword,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser, reauthenticate } from "../api/auth/auth";
import { readData, updateData } from "../api/auth/store";
import { auth } from "../api/firebase";
import { IUser } from "../types/User.types";

interface UserContextProps {
  currentUser: IUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  toggleFavorite: (movieId: string) => Promise<void>;
  loading: boolean;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const user = await loginUser(email, password);
    if (user) {
      setCurrentUser(user);
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      return false;
    }
  };

  const toggleFavorite = async (movieId: string) => {
    if (!currentUser) return;

    const newFavorites = currentUser.favorites.includes(movieId)
      ? currentUser.favorites.filter((id) => id !== movieId)
      : [...currentUser.favorites, movieId];

    setCurrentUser((prev) => ({ ...prev!, favorites: newFavorites }));
    await updateData("users", currentUser.id as string, {
      favorites: newFavorites,
    });
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (await reauthenticate(currentPassword)) {
      try {
        await updateFirebasePassword(auth.currentUser as User, newPassword);
        return { success: true };
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Failed to update password");
          return { success: false, message: error.message };
        } else {
          toast.error("An unexpected error occurred");
          return { success: false, message: "An unexpected error occurred" };
        }
      }
    } else {
      return {
        success: false,
        message: "Re-authentication failed, please try logging in again.",
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await readData("users", user.uid);
        setCurrentUser(userDetails as IUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, login, toggleFavorite, updatePassword, loading }}
    >
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
