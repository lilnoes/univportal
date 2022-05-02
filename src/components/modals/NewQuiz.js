import classNames from "classnames";

export default function NewQuiz({ show, hide }) {
  show = show ?? true;
  return (
    <div
      className={classNames(
        show ? "block" : "hidden",
        "fixed w-full inset-0 flex justify-center bg-gray-400/70"
      )}
    >
      <div className="w-[40%] mt-10 rounded-lg shadow-lg h-fit bg-white p-3 text-primaryd font-bold">
        <h1 className="mb-5">New Quiz</h1>
        <div className="mb-5">
          <label className="block">Name</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
          />
        </div>
        <div className="mb-5">
          <label className="block">Start Date</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="datetime-local"
          />
        </div>
        <div className="w-full bg-primaryl text-white p-3 flex justify-center items-center">
          <button className="text-3xl font-extrabold">+</button>
        </div>
        <p>Upload file or drag it above.</p>

        <div className="flex mt-5">
          <button className="grow bg-primaryd text-white text-2xl p-2 rounded-lg">
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
