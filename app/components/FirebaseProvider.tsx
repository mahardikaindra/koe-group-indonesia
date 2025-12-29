"use client";

import { createContext, useContext } from "react";
import { db, auth } from "@/app/lib/firebase";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";

interface FirebaseContextProps {
  db: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FirebaseContext.Provider value={{ db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
