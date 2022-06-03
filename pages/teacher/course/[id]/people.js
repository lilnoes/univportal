import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { withSessionSsr } from "lib/withSession";
import { getCoursesCollection, getEnrollmentCollection } from "lib/db";

export default function Home({ course, people }) {
  if (!course) return <div></div>;
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          {course.name.toUpperCase()} - Öğrenciler
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">İsim</td>
              <td>Soyisim</td>
              <td>Ülke</td>
            </tr>
            {people?.map((member) => (
              <tr key={member._id} className="border-b">
                <td className="p-2">
                  {member.student.firstName.toUpperCase()}
                </td>
                <td>{member.student.lastName.toUpperCase()}</td>
                <td>{member.student.country}</td>
              </tr>
            ))}
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
  const enrollmentsCollection = await getEnrollmentCollection();
  const people = await enrollmentsCollection
    .aggregate([
      { $addFields: { studentId: { $toObjectId: "$student" } } },
      { $match: { course: course._id, status: "accepted" } },
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
      people: JSON.parse(JSON.stringify(people)),
    },
  };
});
