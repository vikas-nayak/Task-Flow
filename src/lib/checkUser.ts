import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();
    console.log(user)

    if (!user) {
        return null
    }   

    const loggedInUser = await db.user.findFirst({
        where: {
            clerkId: user.id,
        },
    });

    if (loggedInUser) {
        return loggedInUser;
    }

    const newUser = await db.user.create({
       // @ts-ignore
       data: {
           clerkId: user.id,
           name: user.fullName,
           // @ts-ignore
            email: user.primaryEmailAddress?.emailAddress,

        },
    });

    return newUser;
};
