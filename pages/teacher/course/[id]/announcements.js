import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import useAnnouncements from "hooks/courses/useAnnouncements";
import { getCoursesCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ course }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const router = useRouter();
  const { announcements } = useAnnouncements(course?.shortName);
  if (!course) return <div></div>;
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - Announcements
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
      left={<LeftMenu base={`teacher/course/${course.shortName}`}/>}
      right={
        <div className="px-1">
          <button
            className="p-2 bg-primaryd text-white"
            onClick={() => setShowAnnouncement(true)}
          >
            New Announcement
          </button>
          <NewAnnouncement
            course={course}
            show={showAnnouncement}
            hide={() => setShowAnnouncement(false)}
          />
        </div>
      }
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { id } = params;
  const coursesCollection = await getCoursesCollection();
  const course = await coursesCollection.findOne({ shortName: id });
  return { props: { course: JSON.parse(JSON.stringify(course)) } };
});
