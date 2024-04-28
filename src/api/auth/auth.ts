import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IUser } from "../../types/User.types";
import { auth } from "../firebase";
import { readData, writeData } from "./store";

export async function registerUser(userDetails: IUser) {
  await createUserWithEmailAndPassword(
    auth,
    userDetails.email,
    userDetails.password
  )
    .then(async (userCredential) => {
      const user = userCredential.user;
      await writeData("users", { ...userDetails, id: user.uid });
    })
    .catch((error) => {
      console.error("Error registering user:", error.code, error.message);
    });
}

export async function loginUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userDetails = await readData("users", user.uid);
      return userDetails as IUser;
    })
    .catch((error) => {
      console.error("Error registering user:", error.code, error.message);
    });
}
