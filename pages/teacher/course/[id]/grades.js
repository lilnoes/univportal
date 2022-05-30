import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";
import { withSessionSsr } from "lib/withSession";
import { getCoursesCollection } from "lib/db";

export default function Home({ course }) {
  const [showStudents, setShowStudents] = useState(false);
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - GRADES
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Student Name</td>
              <td>Date</td>
              <td>Points</td>
              <td>Out Of</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Leon Emma</td>
              <td>May 1st, 2022</td>
              <td>80</td>
              <td>100</td>
            </tr>
          </table>
        </div>
      }
      left={<LeftMenu base={`teacher/course/${course.shortName}`} />}
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const { id } = params;
  const coursesCollection = await getCoursesCollection();
  const course = await coursesCollection.findOne({ shortName: id });
  return { props: { course: JSON.parse(JSON.stringify(course)) } };
});
