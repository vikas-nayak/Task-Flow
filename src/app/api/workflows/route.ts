import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();

  try {
    const userClerk = await currentUser();
    
    if (!userClerk || !userClerk.id) {
      return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: {
        clerkId: userClerk.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const workflow = await db.workflows.create({
      data: {
        name,
        description,
        userId: user.id,
      },
    });

    console.log(workflow)

    return NextResponse.json({ workflow }, { status: 201 });

  } catch (error) {
    console.error("Error creating workflow:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
