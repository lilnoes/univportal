import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import useAnnouncements from "hooks/courses/useAnnouncements";
import { getCoursesCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useState } from "react";
import moment from "moment";

export default function Home({ course }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const { announcements } = useAnnouncements(course?.shortName);
  if (!course) return <div></div>;
  return (
    <Template
      base={"student"}
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - Duyurular
        </h1>
      }
      main={
        <div className="text-xl">
          {announcements?.map((announcement) => (
            <div key={announcement._id} className="shadow-lg p-2 rounded-lg">
              <h2 className="font-bold">{announcement.title.toUpperCase()}</h2>
              <h2 className="text-gray-700 text-sm">({course.name})</h2>
              <p className="">{announcement.content}</p>
              <p className="text-xs text-gray-600">
                {moment(announcement.dat).format("MMM DD, YYYY")}
              </p>
            </div>
          ))}
        </div>
      }
      left={<LeftMenu base={`student/course/${course.shortName}`} />}
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { id } = params;
  const coursesCollection = await getCoursesCollection();
  const course = await coursesCollection.findOne({ shortName: id });
  return { props: { course: JSON.parse(JSON.stringify(course)) } };
});
