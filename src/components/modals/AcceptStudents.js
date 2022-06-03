import classNames from "classnames";
import useWaitings from "hooks/courses/useWaiting";
import useOutsideClick from "hooks/utils/useOutsideClick";
import fetcher from "lib/fetcher";
import { useRef } from "react";
import { mutate } from "swr";
import { useSnackbar } from "notistack";

export default function AcceptStudents({ course, show, hide }) {
  show = show ?? true;
  const ref = useRef(null);
  useOutsideClick(ref, hide);
  const { enqueueSnackbar } = useSnackbar();
  const { waitings } = useWaitings(course?.shortName);
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
        <h1 className="text-2xl text-secondaryd font-bold mb-5">Bekleyenler</h1>
        <table className="w-full">
          <tr className="font-bold text-xl border-b">
            <td className="p-3">İsim</td>
            <td>Yıl</td>
            <td>Departman</td>
            <td>Aksiyon</td>
          </tr>
          {waitings?.map((waiting) => (
            <tr key={waiting._id} className="border-b">
              <td className="p-3">
                {waiting.student.firstName} {waiting.student.lastName}
              </td>
              <td>{waiting.student.year}</td>
              <td>{waiting.student.department}</td>
              <td>
                <div className="flex justify-between">
                  <button
                    className="bg-secondaryd text-white p-1 rounded-md"
                    onClick={async () => {
                      const json = await fetcher("/api/course/allow", {
                        enrollment: waiting._id,
                      });
                      enqueueSnackbar(
                        `${waiting.student.lastName}'i kabul ettin`,
                        { variant: "success" }
                      );
                      mutate([
                        "/api/course/waiting",
                        { shortName: course.shortName },
                      ]);
                    }}
                  >
                    Kabul
                  </button>
                  <button className="text-red-700">Reddet</button>
                </div>
              </td>
            </tr>
          ))}
        </table>

        <button className="text-red-700 mt-3" onClick={hide}>
          Kapat
        </button>
      </div>
    </div>
  );
}
