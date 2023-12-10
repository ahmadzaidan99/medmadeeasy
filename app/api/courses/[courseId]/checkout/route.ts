import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
) {
  try {
    const { courseId,userId } = await req.json();
    const user = await currentUser();
    const purchase = await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
        email: user?.emailAddresses[0].emailAddress || "",
      },
    });
    return NextResponse.json(purchase);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}