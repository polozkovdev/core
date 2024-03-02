import { courseRepository } from "@/features/courses-list/courses.repository";
import { CourseItem } from "@/features/courses-list/ui/course-item";
import { revalidatePath } from "next/cache";

export async function CoursesList({
  revalidatePagePath,
}: {
  revalidatePagePath: string;
}) {
  const courses = await courseRepository.getCoursesList();
  const handleDelete = async (courseId: string) => {
    "use server";
    await courseRepository.deleteCourseElement({ id: courseId });
    revalidatePath(revalidatePagePath);
  };
  return (
    <div className="flex flex-col gap-3">
      {courses.map((course) => {
        return (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete.bind(null, course.id)}
          />
        );
      })}
    </div>
  );
}
