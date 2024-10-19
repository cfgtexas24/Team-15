// app/api/company/route.js
import { db } from "../../lib/firebaseConfig"; // Import Firebase config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Firestore collection reference
const companiesRef = collection(db, "employees");

// Create Employee (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(employeesRef, body);
    return NextResponse.json({ message: "Employee created", id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All Employees (GET)
export async function GET() {
  try {
    const snapshot = await getDocs(employeesRef);
    const employees = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Employee (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    const docRef = doc(db, "employees", id);
    await updateDoc(docRef, updatedData);
    return NextResponse.json({ message: "Employee updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Employee (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const docRef = doc(db, "employee", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
