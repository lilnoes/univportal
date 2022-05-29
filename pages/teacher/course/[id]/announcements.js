import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import useAnnouncements from "hooks/courses/useAnnouncements";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const router = useRouter();
  const { announcements } = useAnnouncements(router?.query?.id);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - Announcements
        </h1>
      }
      main={
        <div className="text-xl">
          {announcements?.map((announcement) => (
            <div key={announcement._id} className="shadow-lg p-2 rounded-lg">
              <h2 className="">{announcement.title}</h2>
              <p className="text-gray-500">{announcement.content}</p>
              <p className="text-xs text-gray-600">May 1st, 2022</p>
            </div>
          ))}
        </div>
      }
      left={<LeftMenu />}
      right={
        <div className="px-1">
          <button
            className="p-2 bg-primaryd text-white"
            onClick={() => setShowAnnouncement(true)}
          >
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

// export function getServerSideProps()
