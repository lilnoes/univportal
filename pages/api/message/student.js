// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getMessagesCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const user = req.session.user;
  const { courseId, teacherId } = req.body;
  const messagesCollection = await getMessagesCollection();
  const messages = await messagesCollection
    .find({
      $or: [
        { course: courseId, to: null },
        { from: user._id, to: teacherId, course: courseId },
        { to: user._id, from: teacherId, course: courseId },
      ],
    })
    .toArray();

  res.send({ error: "", success: "messages fetched", data: { messages } });
});
