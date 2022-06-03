import classNames from "classnames";
import useOutsideClick from "hooks/utils/useOutsideClick";
import { departments, years } from "lib/config";
import fetcher from "lib/fetcher";
import { useRef, useState } from "react";
import { mutate } from "swr";
import { useSnackbar } from "notistack";

export default function NewCourseModal({ show, hide }) {
  show = show ?? true;
  const ref = useRef();
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState(departments[0]);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  useOutsideClick(ref, hide);
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
        <div className="mb-5">
          <label className="block">Ad</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">Kısa ad</label>
          <input
            className="w-full outline-none border-[1px] border-primaryl"
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">Yıl</label>
          <select
            className="w-full outline-none border-[1px] border-primaryl"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block">Departman</label>
          <select
            className="w-full outline-none border-[1px] border-primaryl"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block">Tanım</label>
          <textarea
            className="w-full outline-none border-[1px] border-primaryl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block">Gereksinim</label>
          <textarea
            className="w-full outline-none border-[1px] border-primaryl"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        <div className="flex">
          <button
            onClick={async () => {
              const json = await fetcher("/api/course/create", {
                name,
                shortName,
                year,
                department,
                description,
                requirements,
              });
              // console.log("json", json);
              enqueueSnackbar(`ders ${name} oluşturlmuş`, {
                variant: "success",
              });
              await mutate("/api/course/list");
              hide();
              setName("");
              setShortName("");
              setDescription("");
              setRequirements("");
            }}
            className="grow bg-primaryd text-white text-2xl p-2 rounded-lg"
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
