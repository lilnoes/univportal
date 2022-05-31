import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import {
  getCoursesCollection,
  getGradesCollection,
  getQuizCollection,
} from "lib/db";
import fetcher from "lib/fetcher";
import { withSessionSsr } from "lib/withSession";
import { useMemo, useState } from "react";
import moment from "moment";

export default function Home({ course, quiz, grades: __grades }) {
  const [showStudents, setShowStudents] = useState(false);
  const _grades = useMemo(() => {
    const grades = {};
    for (let grade of __grades) grades[grade._id] = grade;
    return grades;
  }, [__grades]);
  const [grades, setGrades] = useState(_grades);
  const updateGrade = async (_id, points) => {
    const json = await fetcher("/api/quiz/update", { _id, points });
    grades[_id].points = points;
    setGrades({ ...grades });
    console.log("j", json);
  };
  if (!quiz || !course) return <div></div>;
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - {quiz.name.toUpperCase()}
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
            {grades &&
              Object.keys(grades).map((key) => {
                const grade = grades[key];
                return (
                  <tr className="border-b">
                    <td className="p-2">
                      {grade.student.firstName} {grade.student.lastName}
                    </td>
                    <td>{moment(quiz.date).format("MMM DD, YYYY")}</td>
                    <td>
                      <input
                        className="w-12"
                        type="text"
                        value={grade.points}
                        onChange={(e) =>
                          updateGrade(grade._id, e.target.value).then(() =>
                            console.log("d")
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="w-12"
                        type="text"
                        defaultValue={quiz.max}
                        disabled={true}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      }
      left={<LeftMenu base={`teacher/course/${course.shortName}`} />}
    />
  );
}
export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const { id, q } = params;
  const coursesCollection = await getCoursesCollection();
  const quizCollection = await getQuizCollection();
  const gradesCollection = await getGradesCollection();
  const course = await coursesCollection.findOne({ shortName: id });
  const quiz = await quizCollection.findOne({ shortName: q });

  const grades = await gradesCollection
    .aggregate([
      { $addFields: { studentId: { $toObjectId: "$student" } } },
      { $match: { quiz: q } },
      {
        $lookup: {
          from: "users",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },

      {
        $addFields: {
          student: { $arrayElemAt: ["$student", 0] },
        },
      },
    ])
    .toArray();

  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
      quiz: JSON.parse(JSON.stringify(quiz)),
      grades: JSON.parse(JSON.stringify(grades)),
    },
  };
});
