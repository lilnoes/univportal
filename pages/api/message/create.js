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
  const { from, to, course, message } = req.body;
  const messagesCollection = await getMessagesCollection();
  try {
    await messagesCollection.insertOne({
      from,
      to,
      course,
      message,
      date: new Date(),
    });
  } catch (e) {
    return res.send({ error: "error adding message", success: "", data: {} });
  }
  res.send({ error: "", success: "message added", data: {} });
});
