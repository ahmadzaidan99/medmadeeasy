import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

export const getOrders = async () => {
  try {
    const purchases = await db.purchase.findMany({
      include: {
        course: true,
      }
    });
    return {
        purchases
    }
  } catch (error) {
    console.log("[GET_PURCHASES]", error);
  }
}