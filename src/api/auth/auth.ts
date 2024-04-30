import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { IUser } from "../../types/User.types";
import { auth } from "../firebase";
import { readData, writeData } from "./store";

export async function registerUser(userDetails: Partial<IUser>) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userDetails.email as string,
      userDetails.password as string
    );
    const user = userCredential.user;
    await writeData("users", {
      email: userDetails.email as string,
      id: user.uid,
      firstName: userDetails.firstName as string,
      lastName: userDetails.lastName as string,
      favorites: [],
    });
    toast.success("User registered successfully!");
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Error registering user, please try again`);
      console.error("Error registering user:", error.message);
    }
    return false;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<IUser | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      const userDetails = await readData("users", user.uid);
      return userDetails as IUser;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Error logging in user");
    } else {
      toast.error("An unexpected error occurred");
    }
    return null;
  }
}

export async function logoutUser() {
  await auth.signOut();
}

export const reauthenticate = async (currentPassword: string) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
    user?.email as string,
    currentPassword
  );

  try {
    await reauthenticateWithCredential(user as User, credential);
    return true;
  } catch (error) {
    toast.error("Re-authentication failed:");
    return false;
  }
};
