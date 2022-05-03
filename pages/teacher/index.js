import NewCourseModal from "components/modals/NewCourse";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showCourse, setShowCourse] = useState(false);
  return (
    <Template
      left={
        <div className="p-3 text-secondaryd font-extrabold">
          <ul>
            <li className="my-5">
              <a className="underline my-5" href="$">
                HOME
              </a>
            </li>
            <li className="my-5">
              <a className="underline my-5" href="$">
                ANNOUNCEMENTS
              </a>
            </li>
            <li className="my-5">
              <a className="underline my-5" href="$">
                MESSAGES
              </a>
            </li>
            <li className="my-5">
              <a className="underline my-5" href="$">
                GRADES
              </a>
            </li>
            <li className="my-5">
              <a className="underline my-5" href="$">
                PEOPLE
              </a>
            </li>
            <li className="my-5">
              <a className="underline my-5" href="$">
                QUIZZES
              </a>
            </li>
          </ul>
        </div>
      }
      main={
        <>
          <h2 className="font-bold">Announcements</h2>
        </>
      }
      right={
        <div>
          <button
            className="p-2 bg-primaryd text-white"
            onClick={() => setShowCourse(true)}
          >
            New Course
          </button>
          <NewCourseModal show={showCourse} hide={() => setShowCourse(false)} />
        </div>
      }
    />
  );
}
