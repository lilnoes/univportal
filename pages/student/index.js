import Notification from "components/icons/notification";
import AvailableCourses from "components/modals/AvailableCourses";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { getAnnouncementsCollection, getEnrollmentCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import moment from "moment";

export default function Home({ announcements, courses }) {
  const router = useRouter();
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
  return (
    <Template
      base="student"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Courses</h1>}
      left={<LeftMenu base={"student"} />}
      main={
        <>
          <div className="w-full flex flex-nowrap">
            {courses?.map((c) => {
              const course = c.course;
              return (
                <div
                  onClick={() =>
                    router.push(`/student/course/${course.shortName}`)
                  }
                  className="mb-3 w-1/2 p-5 cursor-pointer"
                >
                  <div className="shadow-xl p-2 rounded-xl flex justify-center items-center flex-col">
                    <h2 className="text-[50px] text-secondaryd">
                      {course.name[0].toUpperCase()}
                    </h2>
                    <hr className="my-3" />
                    <h2 className="text-secondary">
                      {course.name.toUpperCase()}
                    </h2>
                  </div>
                </div>
              );
            })}
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
          {announcements?.map((announcement) => (
            <Fragment key={announcement._id}>
              {" "}
              <div>
                <h2 className="text-primary flex items-center">
                  <span className="inline-block">
                    <Notification fill="fill-primaryd" />
                  </span>
                  <span>{announcement.title}</span>
                </h2>
                <p className="font-bold">({announcement.course.name})</p>
                <p>{announcement.content}</p>
                <p className="text-gray-700">
                  {moment(announcement.date).format("MMM DD, YYYY")}
                </p>
              </div>
              <hr className="my-2" />
            </Fragment>
          ))}
        </div>
      }
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const enrollmentsCollection = await getEnrollmentCollection();
  const announcementsCollection = await getAnnouncementsCollection();
  const enrollments = await enrollmentsCollection
    .aggregate([
      { $match: { student: user._id, status: "accepted" } },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $addFields: {
          course: { $arrayElemAt: ["$course", 0] },
        },
      },
    ])
    .toArray();
  const found = enrollments.map((en) => en.course._id);

  const announcements = await announcementsCollection
    .aggregate([
      { $match: { course: { $in: found } } },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $addFields: {
          course: { $arrayElemAt: ["$course", 0] },
        },
      },
    ])
    .toArray();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(enrollments)),
      announcements: JSON.parse(JSON.stringify(announcements)),
    },
  };
});
