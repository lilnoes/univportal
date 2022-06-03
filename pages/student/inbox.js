import Message from "components/icons/message";
import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import TemplateInbox from "components/navigation/templateinbox";
import useStudentMessages from "hooks/messages/useStudentMessages";
import { getEnrollmentCollection } from "lib/db";
import { withSessionSsr } from "lib/withSession";
import { Fragment, useState } from "react";
import moment from "moment";
import fetcher from "lib/fetcher";
import { mutate } from "swr";

export default function Home({ courses, user }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState(null);
  const { messages } = useStudentMessages(recipient);
  return (
    <TemplateInbox
      base={"student"}
      page="inbox"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Messages</h1>}
      main={
        <div className="flex h-full">
          <div className="w-[40%]">
            <h2 className="bg-secondaryd text-white font-bold p-2">
              PROFESSORS
            </h2>
            <div className="flex justify-between p-2">
              {courses?.map((c) => {
                const creator = c.creator;
                const course = c.course;
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => setRecipient(c)}
                  >
                    <h2 className="font-bold">{course.name}</h2>
                    <h2 className="mt-2">{creator.title}</h2>
                  </div>
                );
              })}
              <div className="flex items-center">
                <p></p>
                <Message fill="fill-primaryd" />
              </div>
            </div>
            <hr className="my-2" />
          </div>
          {recipient && (
            <div className="grow mx-2 relative max-h-full">
              <div className="bg-secondaryd text-white p-5">
                <h2 className="font-bold">{recipient.course.name}</h2>
                <h2 className="mt-2">{recipient.creator.title}</h2>
              </div>
              <div className="mb-[50px]">
                {messages?.map((message) => {
                  let right = user._id == message.from;
                  if (!right)
                    return (
                      <Fragment key={message._id}>
                        <div className="p-2 bg-gray-300 my-2 float-left w-[60%] rounded-lg">
                          <p>{message.message}</p>
                          <p className="text-xs float-right">
                            {moment(message.date).format("MMM DD, YYYY")}
                          </p>
                        </div>
                        <div className="clear-both"></div>
                      </Fragment>
                    );
                  return (
                    <Fragment key={message._id}>
                      <div className="p-2 bg-gray-300 my-2 float-right w-[60%] rounded-lg">
                        <p>{message.message}</p>
                        <p className="text-xs float-right">
                          {moment(message.date).format("MMM DD, YYYY")}
                        </p>
                      </div>
                      <div className="clear-both"></div>
                    </Fragment>
                  );
                })}
              </div>
              <div className="absolute bottom-2 h-[50px] left-0 flex w-full">
                <div className="grow mr-5">
                  <input
                    className="block w-full p-2 border-[1px] border-primaryl rounded-lg"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="bg-primary text-white p-2 rounded-lg"
                    onClick={async () => {
                      const json = await fetcher("/api/message/create", {
                        from: user._id,
                        to: recipient.creator._id,
                        message,
                      });
                      mutate([
                        "/api/message/student",
                        {
                          courseId: recipient.course._id,
                          teacherId: recipient.creator._id,
                        },
                      ]);
                      setMessage("");
                      console.log("m", json);
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      left={<LeftMenu base={"student"} />}
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const enrollmentsCollection = await getEnrollmentCollection();
  const enrollments = await enrollmentsCollection
    .aggregate([
      { $addFields: { creatorId: { $toObjectId: "$creator" } } },
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
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $addFields: {
          course: { $arrayElemAt: ["$course", 0] },
          creator: { $arrayElemAt: ["$creator", 0] },
        },
      },
      {
        $addFields: {
          "creator.title": {
            $concat: [
              "$creator.title",
              " ",
              "$creator.firstName",
              " ",
              "$creator.lastName",
            ],
          },
        },
      },
    ])
    .toArray();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(enrollments)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
});
