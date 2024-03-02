"use server";

import { courseRepository } from "@/features/courses-list/courses.repository";
import { CreateCourseListElementCommand } from "@/features/courses-list/model/types";
import { revalidatePath } from "next/cache";

export const createCourseAction = async (
  command: CreateCourseListElementCommand,
  revalidatePagePath: string,
) => {
  await courseRepository.createCourseElement(command);
  revalidatePath(revalidatePagePath);
};
