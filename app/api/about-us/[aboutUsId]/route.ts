import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(_: Request,{ params }: { params: { aboutUsId: string } }) {
  try {
    if (!params.aboutUsId) {
      return new NextResponse("AboutUs ID is required", { status: 400 })
    }

    const aboutUsSection = await db.aboutUs.findUnique({
      where: { id: params.aboutUsId },
    })

    return NextResponse.json(aboutUsSection)
  } catch (error) {
    console.log("[ABOUT_US_GET_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
