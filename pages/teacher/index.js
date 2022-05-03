import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showCourse, setShowCourse] = useState(false);
  return (
    <Template
      left={<LeftMenu />}
      main={
        <>
          <h2 className="font-bold">Announcements</h2>
          <ul className="list-disc">
            <li className="my-2">Announcement 1</li>
          </ul>
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
