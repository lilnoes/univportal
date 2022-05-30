// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getEnrollmentCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { shortName } = req.body;
  const courseCollection = await getCoursesCollection();
  const enrollmentsCollection = await getEnrollmentCollection();
  const course = await courseCollection.findOne({ shortName });
  const user = req.session.user;
  try {
    await enrollmentsCollection.insertOne({
      student: user._id,
      course: course._id,
      creator: course.creator,
      status: "waiting",
    });
  } catch (e) {
    return res.send({
      error: "error adding enrollment",
      success: "",
      data: {},
    });
  }
  res.send({ error: "", success: "enrollment created", data: {} });
});
