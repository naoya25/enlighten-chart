import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient() as any;
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  const { good, more, challenge, day, objective_id } = await req.json();
  try {
    await doConnect();
    const review = await prisma.review.create({
      data: {
        good,
        more,
        challenge,
        day,
        objective_id,
      },
    });
    return NextResponse.json(
      { message: "Success", review },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
