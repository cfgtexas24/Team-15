// app/api/recruiters/route.ts
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const recruitersRef = collection(db, "recruiters");

// Create Recruiter (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(recruitersRef, body); // body contains name, company, and username
    return NextResponse.json({ message: "Recruiter created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All Recruiter (GET)
export async function GET() {
  try {
    const snapshot = await getDocs(recruitersRef);
    const recruiters = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // includes name, company, and username
    return NextResponse.json(recruiters, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Recruiter (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body; // updatedData contains name, company, and/or username
    const docRef = doc(db, "recruiters", id);
    await updateDoc(docRef, updatedData);
    return NextResponse.json({ message: "Recruiter updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Recruiter (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const docRef = doc(db, "recruiters", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Recruiter deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
