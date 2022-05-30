// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getAnnouncementsCollection,
  getCoursesCollection,
  getQuizCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { name, date, course, duration } = req.body;
  const quizCollection = await getQuizCollection();
  const user = req.session.user;
  try {
    let rand = Math.round(Math.random() * 100000).toString();
    await quizCollection.insertOne({
      creator: user._id,
      course: ObjectId(course),
      duration,
      name,
      shortName: name.replace(/\W/g, "") + rand,
      date: new Date(date),
    });
  } catch (e) {
    return res.send({
      error: "error adding quiz",
      success: "",
      data: {},
    });
  }
  res.send({ error: "", success: "quiz created", data: {} });
});
