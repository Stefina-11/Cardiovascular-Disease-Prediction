import { NextResponse } from "next/server";
import { CardioFormData } from "../../../types";

export async function POST(request: Request) {
  try {
    const formData: CardioFormData = await request.json();
    console.log("Received form data:", formData);

    const backendResponse = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend HTTP error! status: ${backendResponse.status}`);
    }

    const backendData = await backendResponse.json();
    const prediction = backendData.prediction;

    return NextResponse.json({ prediction });
  } catch (error) {
    console.error("Error processing prediction request:", error);
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
