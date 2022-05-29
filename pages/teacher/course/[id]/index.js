import AcceptStudents from "components/modals/AcceptStudents";
import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import useAnnouncements from "hooks/courses/useAnnouncements";
import { getCoursesCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useState } from "react";

export default function Home({ course }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAcceptStudents, setShowAcceptStudents] = useState(false);
  const { announcements } = useAnnouncements(course?._id);
  if (!course) return <div></div>;
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name} - {course.shortName}
        </h1>
      }
      main={
        <div className="text-xl">
          <h2 className="font-bold">{course.name}</h2>
          <h2 className="text-gray-500">{course.shortName}</h2>
          <h2 className="text-gray-500 text-sm">Students: {course.count}</h2>
          <h2 className="mt-5 font-bold">Description</h2>
          <p className="text-gray-500 mb-10">{course.description}</p>
          <h2 className="mt-5 font-bold">Requirements</h2>
          <p className="text-gray-500 mb-10">{course.requirements}</p>
        </div>
      }
      left={<LeftMenu base={`teacher/course/${course.shortName}`}/>}
      right={
        <div>
          <button
            className="my-3 block bg-primaryd p-2 text-white"
            onClick={() => setShowAnnouncement(true)}
          >
            New Announcement
          </button>
          <NewAnnouncement
            course={course._id}
            show={showAnnouncement}
            hide={() => setShowAnnouncement(false)}
          />
          <button
            className="my-3 block bg-primaryd p-2 text-white"
            onClick={() => setShowQuiz(true)}
          >
            New Quiz
          </button>
          <NewQuiz show={showQuiz} hide={() => setShowQuiz(false)} />
          <button
            className="my-3 block bg-primaryd p-2 text-white"
            onClick={() => setShowAcceptStudents(true)}
          >
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

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const { id } = params;
  const coursesCollection = await getCoursesCollection();
  const course = await coursesCollection.findOne({ shortName: id });
  return { props: { course: JSON.parse(JSON.stringify(course)) } };
});
