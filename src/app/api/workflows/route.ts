import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



//Workflows fetch karne ke liye function
export async function GET(req: NextResponse) {

  try {
    const userClerk = await currentUser();

    if (!userClerk || !userClerk.id) {
      return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });
    }

    const workflows = await db.workflows.findMany({
      where: {
        userId: userClerk.id,
      }
    });

    return NextResponse.json({ workflows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}



//Workflows post karne ke liye function
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
      // @ts-ignore
      data: {
        name,
        description,
        userId: userClerk.id,
      },
    });

    // console.log(workflow)

    return NextResponse.json({ workflow }, { status: 201 });

  } catch (error) {
    console.error("Error creating workflow:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}



//Workflows delete karne ke liye function
export async function DELETE(req: NextRequest) {
  try {
    const userClerk = await currentUser();
    if (!userClerk || !userClerk.id) {
      return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });
    }

    const { workflowId } = await req.json(); // Parse workflowId from the request body

    if (!workflowId) {
      return NextResponse.json({ msg: "Workflow ID is required" }, { status: 400 });
    }

    const workflow = await db.workflows.delete({
      where: {
        id: workflowId,
        userId: userClerk.id,
      },
    });

    return NextResponse.json({ msg: "Workflow deleted", workflow }, { status: 200 });
  } catch (error) {
    console.error("Error deleting workflow:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}



//Workflows update karne ke liye function
// export async function PATCH(req: NextRequest) {
//   try {
//     const userClerk = await currentUser();

//     if (!userClerk || !userClerk.id) {
//       return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });
//     }

//     const { workflowId, isEnabled } = await req.json();

//     if (!workflowId || typeof isEnabled !== 'boolean') {
//       return NextResponse.json({ msg: "Workflow ID and valid isEnabled status are required" }, { status: 400 });
//     }

//     const workflow = await db.workflows.update({
//       where: {
//         id: workflowId,
//         userId: userClerk.id,
//       },
//       data: {
//         isEnabled,
//       },
//     });

//     return NextResponse.json({ msg: "Workflow updated", workflow }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating workflow:", error); // Add more detailed logging if needed
//     return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
//   }
// }
