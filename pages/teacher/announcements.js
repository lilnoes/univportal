import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - Announcements
        </h1>
      }
      main={
        <div className="text-xl">
          <div className="shadow-lg p-2 rounded-lg">
            <h2 className="">Announcement title</h2>
            <p className="text-gray-500">Announcement contenttt</p>
            <p className="text-xs text-gray-600">May 1st, 2022</p>
          </div>
        </div>
      }
      left={<LeftMenu />}
      right={
        <div>
          <button onClick={() => setShowAnnouncement(true)}>
            New Announcement
          </button>
          <NewAnnouncement
            show={showAnnouncement}
            hide={() => setShowAnnouncement(false)}
          />
        </div>
      }
    />
  );
}
