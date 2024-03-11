import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient() as any;
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}
// 詳細目標取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const dailyquest_id: number = parseInt(req.url.split("/daily_quest/")[1]);
    await doConnect();
    const dailyQuest = await prisma.dailyQuest.findUnique({
      where: { id: dailyquest_id },
      include: {
        dailyreviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuest },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
