import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import Link from "next/link";
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
              <td className="p-2">
                <Link href={`/teacher/quiz/1`}>
                  <a className="underline">Quiz 1</a>
                </Link>
              </td>
              <td>May 1st, 2022</td>
              <td>File</td>
              <td>20 mins</td>
            </tr>
          </table>
        </div>
      }
      left={<LeftMenu />}
      right={
        <div>
          <button
            className="bg-primaryd p-2 text-white"
            onClick={() => setShowQuiz(true)}
          >
            New Quiz
          </button>
          <NewQuiz show={showQuiz} hide={() => setShowQuiz(false)} />
        </div>
      }
    />
  );
}
