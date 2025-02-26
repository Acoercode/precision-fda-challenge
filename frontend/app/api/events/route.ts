// app/api/events/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongo/mongodb"; // Adjust import based on your lib folder structure

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("precision-fda");

    const events = await db
      .collection("fda-events")
      .find({})
      .sort({ "stamp.date": -1 }) // Sort by 'stmap.date' in descending order
      .limit(1000)
      .toArray();

    return NextResponse.json(events);
  } catch (error) {
    console.error("EVENT ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
