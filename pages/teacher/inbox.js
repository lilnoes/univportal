import Message from "components/icons/message";
import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import TemplateInbox from "components/navigation/templateinbox";
import useMessages from "hooks/messages/useMessages";
import { getCoursesCollection, getMessagesCollection } from "lib/db";
import fetcher from "lib/fetcher";
import { withSessionSsr } from "lib/withSession";
import moment from "moment";
import { Fragment, useState } from "react";
import { mutate } from "swr";

export default function Home({ courses, user, students }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [message, setMessage] = useState("");
  const { messages } = useMessages(recipient);
  console.log("messages", messages);
  return (
    <TemplateInbox
      page="inbox"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Mesajlar</h1>}
      main={
        <div className="flex h-full">
          <div className="w-[40%]">
            <h2 className="bg-secondaryd text-white font-bold p-2">ALICILAR</h2>
            {courses?.map((course) => (
              <Fragment>
                <div
                  className="flex justify-between p-2 cursor-pointer"
                  onClick={() => setRecipient(course)}
                >
                  <h2 className="font-bold">{course.name.toUpperCase()}</h2>
                  <div className="flex items-center">
                    <p></p>
                    <Message fill="fill-primaryd" />
                  </div>
                </div>
                <hr className="my-2" />
              </Fragment>
            ))}
            {students?.map((student) => (
              <Fragment>
                <div
                  className="flex justify-between p-2 cursor-pointer"
                  onClick={() => setRecipient(student)}
                >
                  <h2 className="font-bold">{student.name.toUpperCase()}</h2>
                  <div className="flex items-center">
                    <p></p>
                    <Message fill="fill-primaryd" />
                  </div>
                </div>
                <hr className="my-2" />
              </Fragment>
            ))}
          </div>
          <div className="grow mx-2 relative max-h-full">
            {recipient && (
              <div className="bg-secondaryd text-white font-bold p-5">
                <h2>{recipient.name.toUpperCase()}</h2>
              </div>
            )}
            {recipient && (
              <div className="mb-[50px]">
                {messages?.map((message) => {
                  let left = user._id == message.from;
                  if (!left)
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
            )}
            <div className="absolute bottom-2 h-[50px] left-0 flex w-full">
              <div className="grow mr-5">
                <input
                  className="block w-full p-2 border-[1px] border-primaryl rounded-lg"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {recipient && (
                <div>
                  <button
                    className="bg-primary text-white p-2 rounded-lg"
                    onClick={async () => {
                      const json = await fetcher("/api/message/create", {
                        from: user._id,
                        course: recipient.courseId,
                        to: recipient.userId,
                        message,
                      });
                      console.log("j", json);
                      mutate([
                        "/api/message/teacher",
                        {
                          type: recipient.type,
                          courseId: recipient.courseId,
                          userId: recipient.userId,
                        },
                      ]);
                      setMessage("");
                    }}
                  >
                    Gönder
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const coursesCollection = await getCoursesCollection();
  const messagesCollection = await getMessagesCollection();
  const courses = await coursesCollection
    .aggregate([
      { $match: { creator: user._id } },
      { $addFields: { courseId: "$_id", type: "course" } },
    ])
    .toArray();
  const students = await messagesCollection
    .aggregate([
      { $match: { to: user._id } },
      { $group: { _id: "$from" } },
      { $addFields: { _id: { $toObjectId: "$_id" } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $addFields: { sender: { $first: "$sender" } } },
      {
        $addFields: {
          type: "person",
          userId: "$sender._id",
          name: { $concat: ["$sender.firstName", " ", "$sender.lastName"] },
        },
      },
    ])
    .toArray();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
      user: JSON.parse(JSON.stringify(user)),
      students: JSON.parse(JSON.stringify(students)),
    },
  };
});
