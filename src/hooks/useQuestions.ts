"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { clientDb } from "@/config/firebase-client";
import { Question } from "@/types/question";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(clientDb, "hacktalk-questions"),
      orderBy("created_at", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Question[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text ?? "",
          author: data.author ?? "Anonymous",
          votes: data.votes ?? 0,
          votedBy: data.votedBy ?? [],
          answered: data.answered ?? false,
          pinned: data.pinned ?? false,
          created_at:
            data.created_at instanceof Timestamp
              ? data.created_at.toDate()
              : new Date(data.created_at),
        };
      });
      setQuestions(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { questions, loading };
}
