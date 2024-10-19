// app/api/contact_info/route.js
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const contactInfosRef = collection(db, "contact_infos");

// Create Contact Info (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(contactInfosRef, body);
    return NextResponse.json({ message: "Contact info created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All Contact Infos (GET)
export async function GET() {
  try {
    const snapshot = await getDocs(contactInfosRef);
    const contactInfos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(contactInfos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Contact Info (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    const docRef = doc(db, "contact_infos", id);
    await updateDoc(docRef, updatedData);
    return NextResponse.json({ message: "Contact info updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Contact Info (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const docRef = doc(db, "contact_infos", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Contact info deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
