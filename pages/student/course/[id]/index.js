import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { withSessionSsr } from "lib/withSession";
import { getCoursesCollection, getGradesCollection } from "lib/db";

export default function Home({ course, grades }) {
  const { labels, x } = useMemo(() => {
    const labels = [];
    const x = [];
    for (let grade of grades) {
      x.push((parseFloat(grade.points) / parseFloat(grade.max)) * 100);
      labels.push(grade.quiz.name);
    }
    return { labels, x };
  }, [grades]);
  const data = {
    labels,
    datasets: [{ label: "Grades", data: x, backgroundColor: "#007172" }],
  };
  const options = {
    scales: { y: { min: 0, max: 100 }, x: { ticks: { color: "#007172" } } },
  };
  if (!course) return <div></div>;

  return (
    <Template
      base={"student"}
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - Dashboard
        </h1>
      }
      main={
        <div className="">
          <Line data={data} options={options} />
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
