// File: app/api/download/route.ts

import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  // Check if the file parameter is provided
  if (!file) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 },
    );
  }

  try {
    // Define the path to the file in the /tmp directory
    const filePath = path.join("/tmp", file);

    // Read the file to ensure it exists
    await fs.access(filePath);

    // Read file content for streaming
    const fileContent = await fs.readFile(filePath);

    // Set headers to prompt download
    return new NextResponse(fileContent, {
      headers: {
        "Content-Disposition": `attachment; filename="${file}"`,
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    console.error("File download error:", error);
    return NextResponse.json(
      { error: "File not found or cannot be read" },
      { status: 500 },
    );
  }
}
