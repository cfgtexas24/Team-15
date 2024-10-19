// app/api/Jobs Applied/route.js
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const jobs_appliedRef = collection(db, "jobs_applied");

// Create Jobs Applied (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(jobs_appliedRef, body);
    return NextResponse.json({ message: "Jobs Applied created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All jobs_applied (GET)
export async function GET() {
  try {
    const snapshot = await getDocs(jobs_appliedRef);
    const jobs_applied = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(jobs_applied, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Jobs Applied (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    const docRef = doc(db, "jobs_applied", id);
    await updateDoc(docRef, updatedData);
    return NextResponse.json({ message: "Jobs Applied updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Jobs Applied (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const docRef = doc(db, "jobs_applied", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Jobs Applied deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
