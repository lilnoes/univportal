import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { getAnnouncementsCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useState } from "react";

export default function Home({ user, announcements }) {
  const [showCourse, setShowCourse] = useState(false);
  return (
    <Template
      main={
        <>
          <h2 className="font-bold">Announcements</h2>
          <ul className="list-disc">
            {announcements?.map((announcement) => (
              <li key={announcement._id} className="my-2">
                {announcement.title}
              </li>
            ))}
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

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const announcementsCollection = await getAnnouncementsCollection();
  const announcements = await announcementsCollection
    .find({ creator: user._id })
    .toArray();
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      announcements: JSON.parse(JSON.stringify(announcements)),
    },
  };
});
