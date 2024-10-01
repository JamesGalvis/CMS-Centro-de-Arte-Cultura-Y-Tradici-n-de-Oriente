import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const billboard = await db.billboard.findUnique({
      where: { id: params.billboardId },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
