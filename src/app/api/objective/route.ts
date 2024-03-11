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

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await doConnect();
    const objectives = await prisma.objective.findMany({
      include: {
        reviews: true,
        todos: true,
      },
    });
    return NextResponse.json(
      { message: "Success", objectives },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  const { title, description, deadline, user_id } = await req.json();
  try {
    await doConnect();
    const objective = await prisma.objective.create({
      data: {
        title,
        description,
        deadline,
        user_id,
      },
    });
    return NextResponse.json(
      { message: "Success", objective },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
