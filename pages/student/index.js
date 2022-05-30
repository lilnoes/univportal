import Notification from "components/icons/notification";
import AvailableCourses from "components/modals/AvailableCourses";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { getEnrollmentCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ announcements, enrollments }) {
  const router = useRouter();
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
  return (
    <Template
      base="student"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Courses</h1>}
      left={<LeftMenu base={"student"} />}
      main={
        <>
          <div className="w-full flex">
            <div
              onClick={() => router.push(`/student/course/1`)}
              className="mb-3 w-full p-5 cursor-pointer"
            >
              <div className="shadow-xl p-2 rounded-xl flex justify-center items-center flex-col">
                <h2 className="text-[50px] text-secondaryd">P</h2>
                <hr className="my-3" />
                <h2 className="text-secondary">Programming Application</h2>
              </div>
            </div>
            <div
              onClick={() => router.push(`/student/course/1`)}
              className="mb-3 w-full p-5 cursor-pointer"
            >
              <div className="shadow-xl p-2 rounded-xl flex justify-center items-center flex-col">
                <h2 className="text-[50px] text-secondaryd">W</h2>
                <hr className="my-3" />
                <h2 className="text-secondary">Web Programlama</h2>
              </div>
            </div>
          </div>
        </>
      }
      right={
        <div>
          <button
            className="underline text-xl mb-3"
            onClick={() => setShowAvailableCourses(true)}
          >
            Available courses
          </button>
          <AvailableCourses
            show={showAvailableCourses}
            hide={() => setShowAvailableCourses(false)}
          />
          <div>
            <h2 className="text-primary flex items-center">
              <span className="inline-block">
                <Notification fill="fill-primaryd" />
              </span>
              <span>About class</span>
            </h2>
            <p className="font-bold">(Programming application)</p>
            <p>No class tomorrow</p>
            <p className="text-gray-700">May 1st, 2022</p>
          </div>
          <hr className="my-2" />
        </div>
      }
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const enrollmentsCollection = await getEnrollmentCollection();
  const enrollments = await enrollmentsCollection
    .find({ student: user._id, status: "accepted" })
    .toArray();

  return { props: { enrollments: JSON.parse(JSON.stringify(enrollments)) } };
});
