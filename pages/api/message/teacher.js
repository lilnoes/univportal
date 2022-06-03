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
  const { type, userId, courseId } = req.body;
  console.log("id", userId, user._id, type);
  const messagesCollection = await getMessagesCollection();
  let messages = [];
  if (type == "person")
    messages = await messagesCollection
      .find({
        $or: [
          { from: user._id, to: userId },
          { to: user._id, from: userId },
        ],
      })
      .toArray();
  if (type == "course")
    messages = await messagesCollection.find({ course: courseId }).toArray();

  res.send({ error: "", success: "message fetched", data: { messages } });
});
