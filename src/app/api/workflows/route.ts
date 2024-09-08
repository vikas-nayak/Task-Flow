import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    const userClerk = await currentUser();

    if (!userClerk?.id) {
      return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });
    }

    // Check if the user exists
    let user = await db.user.findUnique({
      where: { clerkId: userClerk.id },
    });

    // Create the user if it doesn't exist
    if (!user) {
      user = await db.user.create({
        data: {
          clerkId: userClerk.id,
          name: userClerk.firstName || '',
          email: userClerk.emailAddresses[0]?.emailAddress || '',
          profileImage: userClerk.imageUrl || '',
        },
      });
    }

    // Create the workflow
    const workflow = await db.workflows.create({
      data: {
        name,
        description,
        userId: user.id, // Use the user's internal ID for workflow creation
      },
    });

    return NextResponse.json({ workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating workflow:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
