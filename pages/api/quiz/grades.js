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
  const quizCollection = await getQuizCollection();
  const user = req.session.user;
  const quiz = await quizCollection.findOne({ shortName });
  const students = await res.send({
    error: "",
    success: "quizzes fetched",
    data: { quizzes },
  });
});
