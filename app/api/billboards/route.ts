import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const billboards = await db.billboard.findMany()

    const headers = new Headers({
      'Access-Control-Allow-Origin': 'http://localhost:3001', // Permite solicitudes solo desde localhost:3001
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    return NextResponse.json(billboards, { headers })
  } catch (error) {
    console.log("[BILLBOARDS_GET_ERROR]")
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function OPTIONS() {
  const headers = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  return new NextResponse(null, { headers });
}