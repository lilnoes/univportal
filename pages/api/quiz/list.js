// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getAnnouncementsCollection,
  getCoursesCollection,
  getQuizCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";

export default withSessionRoute(async (req, res) => {
  const { shortName } = req.body;
  const coursesCollection = await getCoursesCollection();
  const quizCollection = await getQuizCollection();
  const user = req.session.user;
  const course = await coursesCollection.findOne({ shortName });
  const quizzes = await quizCollection.find({ course: course._id }).toArray();
  res.send({
    error: "",
    success: "quizzes fetched",
    data: { quizzes },
  });
});
