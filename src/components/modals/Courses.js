import classNames from "classnames";
import useCourses from "hooks/courses/useCourses";
import useOutsideClick from "hooks/utils/useOutsideClick";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Courses({ base, show, hide }) {
  base = base ? base : "teacher";
  show = show ?? true;
  const ref = useRef();
  const router = useRouter();
  const { courses } = useCourses();
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
        {courses?.map((c) => {
          const course = c.course;
          return (
            <div
              key={course._id}
              className="my-5 p-5 shadow-lg bg-white rounded-xl"
            >
              <a
                className="underline cursor-pointer"
                onClick={() => {
                  router.push(`/${base}/course/${course.shortName}`);
                  hide();
                }}
              >
                {course.name.toUpperCase()}
              </a>
              <h2>{course.shortName.toUpperCase()}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
