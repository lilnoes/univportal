import classNames from "classnames";
import useCourses from "hooks/courses/useCourses";
import useOutsideClick from "hooks/utils/useOutsideClick";
import Link from "next/link";
import { useRef } from "react";

export default function Courses({ base, show, hide }) {
  base = base ? base : "teacher";
  show = show ?? true;
  const ref = useRef();
  const { courses } = useCourses();
  console.log("courses", courses);
  useOutsideClick(ref, hide);
  return (
    <div
      className={classNames(
        show ? "block" : "hidden",
        "fixed w-full h-[calc(100vh-80px)] bg-gray-400/70 inset-0"
      )}
    >
      <div
        ref={ref}
        className="w-[40%] h-full bg-primaryd p-3 text-primaryd font-bold"
      >
        {courses?.map((course) => (
          <div
            key={course._id}
            className="my-5 p-5 shadow-lg bg-white rounded-xl"
          >
            <Link href={`/${base}/course/${course.shortName}`}>
              <a className="underline">{course.name}</a>
            </Link>
            <h2>{course.shortName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
