import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import fetcher from "lib/fetcher";
import { useRef, useState } from "react";
import { mutate } from "swr";
import { useSnackbar } from "notistack";

export default function NewAnnouncement({ course, show, hide }) {
  show = show ?? true;
  const ref = useRef(null);
  useOutsideClick(ref, hide);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { enqueueSnackbar } = useSnackbar();
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
        <h1 className="">Yeni duyuru</h1>
        <hr className="my-5" />
        <div className="mb-5">
          <label className="block">konu</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">İçerik</label>
          <textarea
            className="w-full outline-none border-[1px] border-primaryl h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex">
          <button
            className="grow bg-primaryd text-white text-2xl p-2 rounded-lg"
            onClick={async () => {
              const json = await fetcher("/api/announcement/create", {
                title,
                content,
                course: course._id,
              });
              hide();
              setTitle("");
              setContent("");
              // console.log("course", json);
              enqueueSnackbar("yeni duyuru oluşturuldu", {
                variant: "success",
              });
              mutate([
                "api/announcement/list",
                { shortName: course.shortName },
              ]);
            }}
          >
            Oluştur
          </button>
          <button onClick={hide} className="grow text-red-700">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
