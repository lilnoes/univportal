// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getAnnouncementsCollection,
  getCoursesCollection,
  getEnrollmentCollection,
  getGradesCollection,
  getQuizCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { name, date, course, duration, max } = req.body;
  const quizCollection = await getQuizCollection();
  const enrollmentsCollection = await getEnrollmentCollection();
  const gradesCollection = await getGradesCollection();
  const user = req.session.user;
  try {
    let rand = Math.round(Math.random() * 100000).toString();
    let shortName = name.replace(/\W/g, "") + rand;
    const quiz = await quizCollection.insertOne({
      creator: user._id,
      course: ObjectId(course),
      duration,
      max,
      name,
      shortName,
      date: new Date(date),
    });
    let members = await enrollmentsCollection
      .find({ course: ObjectId(course), status: "accepted" })
      .toArray();
    for (let member of members)
      await gradesCollection.insertOne({
        student: member.student,
        course: member.course,
        quiz: shortName,
        points: 0,
        max,
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
