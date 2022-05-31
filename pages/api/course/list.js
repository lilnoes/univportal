// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getEnrollmentCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const enrollmentsCollection = await getEnrollmentCollection();
  const courseCollection = await getCoursesCollection();
  const user = req.session.user;
  let courses = [];
  if (user.type == "teacher")
    courses = await courseCollection
      .aggregate([
        { $match: { creator: user._id } },
        { $addFields: { course: "$$ROOT" } },
      ])
      .toArray();
  if (user.type == "student")
    courses = await enrollmentsCollection
      .aggregate([
        { $match: { student: user._id, status: "accepted" } },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $addFields: {
            course: { $arrayElemAt: ["$course", 0] },
          },
        },
      ])
      .toArray();
  res.send({ error: "", success: "courses", data: { courses } });
});
