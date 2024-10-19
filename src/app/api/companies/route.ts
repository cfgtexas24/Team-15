// app/api/company/route.js
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const companiesRef = collection(db, "companies");

// Create Company (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(companiesRef, body);
    return NextResponse.json({ message: "Company created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All Companies (GET)
export async function GET() {
  try {
    const snapshot = await getDocs(companiesRef);
    const companies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Company (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    const docRef = doc(db, "companies", id);
    await updateDoc(docRef, updatedData);
    return NextResponse.json({ message: "Company updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Company (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const docRef = doc(db, "companies", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Company deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
