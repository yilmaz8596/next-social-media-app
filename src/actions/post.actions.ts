"use server";

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.actions";
import { prisma } from "@/lib/prisma";

export const createPost = async (content: string, image: string) => {
  try {
    const userId = await getDbUserId();
    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });
    revalidatePath("/");
    return { success: true, post };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
