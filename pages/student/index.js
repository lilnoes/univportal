import Notification from "components/icons/notification";
import AvailableCourses from "components/modals/AvailableCourses";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
  return (
    <Template
      base="student"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Courses</h1>}
      left={<LeftMenu base={"student"} />}
      main={<></>}
      right={
        <div>
          <button
            className="underline text-xl mb-3"
            onClick={() => setShowAvailableCourses(true)}
          >
            Available courses
          </button>
          <AvailableCourses
            show={showAvailableCourses}
            hide={() => setShowAvailableCourses(false)}
          />
          <div>
            <h2 className="text-primary flex items-center">
              <span className="inline-block">
                <Notification fill="fill-primaryd" />
              </span>
              <span>About class</span>
            </h2>
            <p className="font-bold">(Programming application)</p>
            <p>No class tomorrow</p>
            <p className="text-gray-700">May 1st, 2022</p>
          </div>
          <hr className="my-2" />
        </div>
      }
    />
  );
}
