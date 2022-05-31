import classNames from "classnames";
import useAvailableCourses from "hooks/courses/useAvailableCourses";
import useOutsideClick from "hooks/utils/useOutsideClick";
import fetcher from "lib/fetcher";
import { Fragment, useRef } from "react";
import useSWR, { mutate } from "swr";

export default function AvailableCourses({ show, hide }) {
  show = show ?? true;
  const ref = useRef(null);
  useOutsideClick(ref, hide);
  const { courses } = useAvailableCourses();
  return (
    <div
      className={classNames(
        show ? "block" : "hidden",
        "fixed w-full inset-0 flex justify-center bg-gray-400/70"
      )}
    >
      <div
        ref={ref}
        className="w-[60%] mt-10 rounded-lg shadow-lg h-fit bg-white p-3 text-primaryd font-bold"
      >
        <h1 className="text-2xl text-secondaryd font-bold mb-5">
          Available courses
        </h1>
        {courses?.map((c) => {
          const { course, creator, status } = c;
          return (
            <Fragment key={c._id}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold">{course.name.toUpperCase()}</h2>
                  <h3 className="text-gray-700">
                    {creator.title} {creator.firstName}
                  </h3>
                </div>
                <div>
                  {status == "" && (
                    <button
                      className="bg-secondaryd text-white rounded-lg p-2"
                      onClick={async () => {
                        const json = await fetcher("/api/course/join", {
                          shortName: course.shortName,
                        });
                        mutate("/api/course/available");
                        console.log("jo", json);
                      }}
                    >
                      JOIN
                    </button>
                  )}
                  {status == "waiting" && (
                    <button className="bg-secondaryd text-white rounded-lg p-2">
                      WAITING
                    </button>
                  )}
                  {status == "accepted" && (
                    <button className="bg-secondaryd text-white rounded-lg p-2">
                      ACCEPTED
                    </button>
                  )}
                </div>
              </div>
              <hr className="my-3" />
            </Fragment>
          );
        })}

        <button className="mt-5 text-red-600" onClick={hide}>
          Close
        </button>
      </div>
    </div>
  );
}
