import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import fetcher from "lib/fetcher";
import { useRef, useState } from "react";
import { mutate } from "swr";

export default function NewQuiz({ course, show, hide }) {
  show = show ?? true;
  const ref = useRef(null);
  useOutsideClick(ref, hide);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(20);
  const [date, setDate] = useState(new Date());
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
        <h1 className="">New Quiz</h1>
        <hr className="my-5" />
        <div className="mb-5">
          <label className="block">Name</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">Duration</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">Start Date</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="datetime-local"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className="w-full bg-primaryl text-white p-3 flex justify-center items-center">
          <button className="text-3xl font-extrabold">+</button>
        </div>
        <p>Upload file or drag it above.</p>

        <div className="flex mt-5">
          <button
            className="grow bg-primaryd text-white text-2xl p-2 rounded-lg"
            onClick={async () => {
              const json = await fetcher("/api/quiz/create", {
                name,
                duration,
                course: course._id,
                date: date.getTime(),
              });
              mutate(["/api/quiz/list", { shortName: course.shortName }]);
              hide();
            }}
          >
            Create
          </button>
          <button onClick={hide} className="grow text-red-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
