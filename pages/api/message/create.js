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
  const { recipient, message } = req.body;
  const messagesCollection = await getMessagesCollection();
  try {
    if (recipient.type == "course")
      await messagesCollection.insertOne({
        from: user._id,
        course: recipient.courseId,
        message,
        date: new Date(),
      });
    if (recipient.type == "person")
      await messagesCollection.insertOne({
        from: user._id,
        to: recipient.userId,
        message,
        date: new Date(),
      });
  } catch (e) {
    return res.send({ error: "error adding message", success: "", data: {} });
  }
  res.send({ error: "", success: "message added", data: {} });
});
