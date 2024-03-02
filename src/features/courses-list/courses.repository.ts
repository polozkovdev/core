import {
  CourseListElement,
  CreateCourseListElementCommand,
  DeleteCourseListElementCommand,
} from "@/features/courses-list/model/types";
import { dbClient } from "@/shared/lib/db";
import { cache } from "react";

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany(),
  );

  createCourseElement = (
    command: CreateCourseListElementCommand,
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: {
        id: command.id,
      },
    });
  };
}

export const courseRepository = new CoursesRepository();
