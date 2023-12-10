import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
  ) {
    try {
        const { purchaseId } = await req.json();
      const publishedCourse = await db.purchase.update({
        where: {
            id: purchaseId,
        },
        data: {
          active: true,
        }
      });
  
      return NextResponse.json(publishedCourse);
    } catch (error) {
      console.log("[PAYMENT_ID_PUBLISH]", error);
      return new NextResponse("Internal Error", { status: 500 });
    } 
  }