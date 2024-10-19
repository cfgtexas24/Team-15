// app/api/recruiters/route.js
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const companiesRef = collection(db, "recruiters");

// Create Recruiter (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(companiesRef, body);
    return NextResponse.json({ message: "Recruiter created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
