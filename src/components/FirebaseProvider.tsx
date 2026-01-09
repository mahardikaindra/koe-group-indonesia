/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";
import { db, auth, storage } from "@/src/lib/firebase";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";

interface FirebaseContextProps {
  db: Firestore;
  auth: Auth;
  storage: any;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FirebaseContext.Provider value={{ db, auth, storage }}>
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
