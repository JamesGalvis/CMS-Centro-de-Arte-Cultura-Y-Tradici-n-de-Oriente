import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const aboutUsSections = await db.aboutUs.findMany({
      orderBy: {
        createdAt: "asc"
      }
    })

    const headers = new Headers({
      "Access-Control-Allow-Origin": "http://localhost:3001", // Permite solicitudes solo desde localhost:3001
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    })

    return NextResponse.json(aboutUsSections, { headers })
  } catch (error) {
    console.log("[ABOUT_US_GET_ERROR]")
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  })

  return new NextResponse(null, { headers })
}
