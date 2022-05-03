import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import { useRef } from "react";

export default function AvailableCourses({ show, hide }) {
  show = show ?? true;
  const ref = useRef(null);
  useOutsideClick(ref, hide);
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold">Programming Application</h2>
            <h3 className="text-gray-700">Professor Edson</h3>
          </div>
          <div>
            <button className="bg-secondaryd text-white rounded-lg p-2">
              JOIN
            </button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold">Programming Application</h2>
            <h3 className="text-gray-700">Professor Edson</h3>
          </div>
          <div>
            <button className="bg-secondaryd text-white rounded-lg p-2">
              Waiting for approval
            </button>
          </div>
        </div>
        <button className="mt-5 text-red-600" onClick={hide}>
          Close
        </button>
      </div>
    </div>
  );
}
