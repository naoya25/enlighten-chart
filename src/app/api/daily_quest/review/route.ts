import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() as any;
async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  const { good, more, challenge, level, qol, daily_quest_id } =
    await req.json();
  try {
    await doConnect();
    const dailyReview = await prisma.dailyReview.create({
      data: {
        good,
        more,
        challenge,
        level,
        qol,
        daily_quest_id,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
