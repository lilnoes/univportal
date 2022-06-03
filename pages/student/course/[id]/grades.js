import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import NewQuiz from "components/modals/NewQuiz";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { getCoursesCollection, getGradesCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useState } from "react";
import moment from "moment";

export default function Home({ course, grades }) {
  const [showStudents, setShowStudents] = useState(false);
  return (
    <Template
      base={"student"}
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - Puanlar
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Sınav</td>
              <td>Tarih</td>
              <td>Puan</td>
              <td>Üzerinde</td>
            </tr>
            {grades?.map((grade) => (
              <tr key={grade._id} className="border-b">
                <td className="p-2">{grade.quiz.name.toUpperCase()}</td>
                <td>{moment(grade.quiz.date).format("MMM DD, YYYY")}</td>
                <td>{grade.points}</td>
                <td>{grade.max}</td>
              </tr>
            ))}
          </table>
        </div>
      }
      left={<LeftMenu base={`student/course/${course.shortName}`} />}
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const { id } = params;
  const coursesCollection = await getCoursesCollection();
  const gradesCollection = await getGradesCollection();
  const user = req.session.user;
  const course = await coursesCollection.findOne({ shortName: id });
  const grades = await gradesCollection
    .aggregate([
      { $match: { student: user._id, course: course._id } },
      {
        $lookup: {
          from: "quizzes",
          localField: "quiz",
          foreignField: "shortName",
          as: "quiz",
        },
      },

      {
        $addFields: {
          quiz: { $arrayElemAt: ["$quiz", 0] },
        },
      },
    ])
    .toArray();
  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
      grades: JSON.parse(JSON.stringify(grades)),
    },
  };
});
