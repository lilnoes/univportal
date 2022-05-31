import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import Link from "next/link";
import { useState } from "react";
import { withSessionSsr } from "lib/withSession";
import { getCoursesCollection } from "lib/db";
import useQuizzes from "hooks/quiz/useQuizzes";
import moment from "moment";

export default function Home({ course }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const { quizzes } = useQuizzes(course?.shortName);
  if (!course) return <div></div>;
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - QUIZZES
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Name</td>
              <td>Start at</td>
              <td>File</td>
              <td>Duration</td>
              <td>Max points</td>
            </tr>
            {quizzes?.map((quiz) => (
              <tr className="border-b">
                <td className="p-2">
                  <Link
                    href={`/teacher/course/${course.shortName}/quiz/${quiz.shortName}`}
                  >
                    <a className="underline">{quiz.name}</a>
                  </Link>
                </td>
                <td>{moment(quiz.date).format("MMM D, YYYY")}</td>
                <td>File</td>
                <td>{quiz.duration} mins</td>
                <td>{quiz.max}</td>
              </tr>
            ))}
          </table>
        </div>
      }
      left={<LeftMenu base={`teacher/course/${course.shortName}`} />}
      right={
        <div>
          <button
            className="bg-primaryd p-2 text-white"
            onClick={() => setShowQuiz(true)}
          >
            New Quiz
          </button>
          <NewQuiz
            course={course}
            show={showQuiz}
            hide={() => setShowQuiz(false)}
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
