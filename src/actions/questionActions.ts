"use server";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export async function submitQuestion(text: string, author: string) {
  if (!text.trim()) throw new Error("Question cannot be empty");
  if (text.length > 300)
    throw new Error("Question is too long (max 300 chars)");

  const questionsRef = collection(db, "hacktalk-questions");
  await addDoc(questionsRef, {
    text: text.trim(),
    author: author.trim() || "Anonymous",
    votes: 0,
    votedBy: [],
    answered: false,
    pinned: false,
    created_at: Timestamp.now(),
  });
}

export async function upvoteQuestion(questionId: string, visitorId: string) {
  const questionRef = doc(db, "hacktalk-questions", questionId);
  await updateDoc(questionRef, {
    votes: increment(1),
    votedBy: arrayUnion(visitorId),
  });
}

export async function removeUpvote(questionId: string, visitorId: string) {
  const questionRef = doc(db, "hacktalk-questions", questionId);
  await updateDoc(questionRef, {
    votes: increment(-1),
    votedBy: arrayRemove(visitorId),
  });
}
