import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { IUser } from "../../types/User.types";

export async function writeData(dbName: string, data: IUser) {
  const db = getFirestore();
  const docRef = doc(db, dbName, data.id);
  await setDoc(docRef, data);
}

export async function readData(dbName: string, docName: string) {
  const db = getFirestore();
  const docRef = doc(db, dbName, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
