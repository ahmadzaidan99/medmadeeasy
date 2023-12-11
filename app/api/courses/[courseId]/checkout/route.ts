import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
) {
  try {
    const { courseId,userId,price } = await req.json();
    const user = await currentUser();
    const active = price == 0 ;
    const purchase = await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
        email: user?.emailAddresses[0].emailAddress || "",
        active: active,
      },
    });
    return NextResponse.json(purchase);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}