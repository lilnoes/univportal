import AvailableCourses from "components/modals/AvailableCourses";
import NewCourseModal from "components/modals/NewCourse";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
  return (
    <Template
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Courses</h1>}
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
          <h2>Recent Activities</h2>
          <h2>Announcements</h2>
        </>
      }
      right={
        <div>
          <button onClick={() => setShowAvailableCourses(true)}>
            Available courses
          </button>
          <AvailableCourses
            show={showAvailableCourses}
            hide={() => setShowAvailableCourses(false)}
          />
        </div>
      }
    />
  );
}
