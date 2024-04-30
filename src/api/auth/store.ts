import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { IUser } from "../../types/User.types";
import { db } from "../firebase";

export async function writeData(dbName: string, data: Partial<IUser>) {
  const docRef = doc(db, dbName, data.id as string);
  await setDoc(docRef, data);
}

export async function readData(dbName: string, docName: string) {
  const docRef = doc(db, dbName, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    toast.error("No such document!");
  }
}

export async function updateData(
  dbName: string,
  docName: string,
  data: Partial<IUser>
) {
  const docRef = doc(db, dbName, docName);
  try {
    await updateDoc(docRef, data);
  } catch (error) {
    toast.error("Error updating document");
  }
}
