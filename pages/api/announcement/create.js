// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getAnnouncementsCollection,
  getCoursesCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { title, content, course } = req.body;
  const announcementsCollection = await getAnnouncementsCollection();
  const user = req.session.user;
  try {
    await announcementsCollection.insertOne({
      creator: user._id,
      course: ObjectId(course),
      title,
      content,
      date: new Date(),
    });
  } catch (e) {
    return res.send({
      error: "error adding announcement",
      success: "",
      data: {},
    });
  }
  res.send({ error: "", success: "announcement created", data: {} });
});
