import { db } from "../../../../lib/firebase";
import { doc, getDoc, deleteDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  // Change `request: Request` to `request: NextRequest`
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Keep params as is
) {
  try {
    const { id: slug } = await params;
    const q = query(collection(db, "articles"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 },
      );
    }

    const articleSnap = querySnapshot.docs[0];

    return NextResponse.json(
      { success: true, data: { id: articleSnap.id, ...articleSnap.data() } },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Implementation for DELETE method can be added here
  try {
    const { id } = await params;
    const articleRef = doc(db, "articles", id);
    await deleteDoc(articleRef);

    return NextResponse.json(
      { success: true, message: "Article deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Implementation for PUT method can be added here
  try {
    const { id } = await params;
    const body = await request.json();
    const articleRef = doc(db, "articles", id);
    await setDoc(articleRef, body, { merge: true });

    return NextResponse.json(
      { success: true, message: "Article updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Implementation for POST method can be added here
  try {
    const { id } = await params;
    const body = await request.json();
    const articleRef = doc(db, "articles", id);
    await setDoc(articleRef, body);

    return NextResponse.json(
      { success: true, message: "Article created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
