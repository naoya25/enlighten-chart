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

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await doConnect();
    const dailyQuests = await prisma.dailyQuest.findMany({
      include: {
        dailyreviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuests },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  const { title, description, day, user_id } = await req.json();
  try {
    await doConnect();
    const dailyQuest = await prisma.dailyQuest.create({
      data: {
        title,
        description,
        day,
        user_id,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
