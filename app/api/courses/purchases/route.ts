import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
) {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        active: false,
      },
        include: {
          course: true,
        },
      });
    return NextResponse.json(purchases);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}