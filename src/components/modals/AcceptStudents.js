import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import { useRef } from "react";

export default function AcceptStudents({ show, hide }) {
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
        className="w-[60%] mt-10 rounded-lg shadow-lg h-fit bg-white p-3 text-primaryd"
      >
        <h1 className="text-2xl text-secondaryd font-bold mb-5">
          Pending approvals
        </h1>
        <table className="w-full">
          <tr className="font-bold text-xl border-b">
            <td className="p-3">Name</td>
            <td>Year</td>
            <td>Faculty</td>
            <td>Action</td>
          </tr>
          <tr className="border-b">
            <td className="p-3">Leon Emmanuel ISHIMWE</td>
            <td>1</td>
            <td>Computer engineering</td>
            <td>
              <div className="flex justify-between">
                <button className="bg-secondaryd text-white p-1 rounded-md">
                  Allow
                </button>
                <button className="text-red-700">Deny</button>
              </div>
            </td>
          </tr>
        </table>

        <button className="text-red-700 mt-3" onClick={hide}>
          Close
        </button>
      </div>
    </div>
  );
}
