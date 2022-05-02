import AcceptStudents from "components/modals/AcceptStudents";
import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showAcceptStudents, setShowAcceptStudents] = useState(false);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - PAP
        </h1>
      }
      main={
        <div className="text-xl">
          <h2 className="font-bold">Programming Application</h2>
          <h2 className="text-gray-500">PAP</h2>
          <h2 className="text-gray-500 text-sm">Students: 10</h2>
          <h2 className="mt-5 font-bold">Description</h2>
          <p className="text-gray-500 mb-10">
            description of Programming application course
          </p>
          <h2 className="mt-5 font-bold">Requirements</h2>
          <p className="text-gray-500 mb-10">
            requirements of Programming application course
          </p>
        </div>
      }
      left={<LeftMenu />}
      right={
        <div>
          <button className="block" onClick={() => setShowAnnouncement(true)}>
            New Announcement
          </button>
          <NewAnnouncement
            show={showAnnouncement}
            hide={() => setShowAnnouncement(false)}
          />
          <button className="block" onClick={() => setShowAcceptStudents(true)}>
            Accept/Deny students
          </button>
          <AcceptStudents
            show={showAcceptStudents}
            hide={() => setShowAcceptStudents(false)}
          />
        </div>
      }
    />
  );
}
