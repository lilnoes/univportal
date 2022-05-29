import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showStudents, setShowStudents] = useState(false);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - QUIZ 1
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Student Name</td>
              <td>Date</td>
              <td>Points</td>
              <td>Out Of</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Leon Emma</td>
              <td>May 1st, 2022</td>
              <td>
                <input className="w-12" type="text" defaultValue={80} />
              </td>
              <td>
                <input className="w-12" type="text" defaultValue={100} />
              </td>
            </tr>
          </table>
        </div>
      }
      left={<LeftMenu />}
    />
  );
}