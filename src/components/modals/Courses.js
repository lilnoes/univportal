import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import Link from "next/link";
import { useRef } from "react";

export default function Courses({ base, show, hide }) {
  base = base ? base : "teacher";
  show = show ?? true;
  const ref = useRef();
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
        <div className="my-5 p-5 shadow-lg bg-white rounded-xl">
          <Link href={`/${base}/course/1`}>
            <a className="underline">Programming Application</a>
          </Link>
          <h2>PAP</h2>
        </div>
        <div className="my-5 p-5 shadow-lg bg-white rounded-xl">
          <Link href={`/${base}/course/1`}>
            <a className="underline">Web Programlama</a>
          </Link>
          <h2>PAP</h2>
        </div>
      </div>
    </div>
  );
}
