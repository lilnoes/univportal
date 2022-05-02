import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - QUIZZES
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Name</td>
              <td>Start at</td>
              <td>File</td>
              <td>Duration</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Quiz 1</td>
              <td>May 1st, 2022</td>
              <td>File</td>
              <td>20 mins.</td>
            </tr>
          </table>
        </div>
      }
      left={<LeftMenu />}
      right={
        <div>
          <button onClick={() => setShowQuiz(true)}>New Quiz</button>
          <NewQuiz show={showQuiz} hide={() => setShowQuiz(false)} />
        </div>
      }
    />
  );
}
