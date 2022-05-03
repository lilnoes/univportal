import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import { useRef } from "react";

export default function NewCourseModal({ show, hide }) {
  show = show ?? true;
  const ref = useRef();
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
        className="w-[40%] mt-10 rounded-lg shadow-lg h-fit bg-white p-3 text-primaryd font-bold"
      >
        <div className="mb-5">
          <label className="block">Course Name</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
          />
        </div>
        <div className="mb-5">
          <label className="block">Course Short Name</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
          />
        </div>
        <div className="mb-5">
          <label className="block">Year</label>
          <select className="w-full outline-none border-[1px] border-primaryl">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block">Faculty</label>
          <select className="w-full outline-none border-[1px] border-primaryl">
            <option>Computer Engineering</option>
            <option>Electronics Engineering</option>
            <option>Chemical Engineering</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block">Description</label>
          <textarea className="w-full outline-none border-[1px] border-primaryl" />
        </div>
        <div className="mb-5">
          <label className="block">Requirements</label>
          <textarea className="w-full outline-none border-[1px] border-primaryl" />
        </div>
        <div className="flex">
          <button className="grow bg-primaryd text-white text-2xl p-2 rounded-lg">
            Submit
          </button>
          <button onClick={hide} className="grow text-red-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
