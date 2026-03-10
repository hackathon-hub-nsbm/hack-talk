"use server";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { RegistrationType } from "@/types/registration";

export async function registerParticipant(
  data: RegistrationType,
): Promise<RegistrationType> {
  try {
    const participantsRef = collection(db, "test");

    // Check if email already registered
    const q = query(participantsRef, where("email", "==", data.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("This email is already registered");
    }

    // Check if student ID already registered
    const qId = query(
      participantsRef,
      where("student_id", "==", data.student_id),
    );
    const idSnapshot = await getDocs(qId);

    if (!idSnapshot.empty) {
      throw new Error("This student ID is already registered");
    }

    await addDoc(participantsRef, {
      name: data.name,
      student_id: data.student_id,
      batch: data.batch,
      phone_number: data.phone_number,
      email: data.email,
      created_at: new Date(),
    });

    return { ...data };
  } catch (error) {
    console.error("Error registering participant:", error);
    throw error;
  }
}
