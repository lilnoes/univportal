// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getEnrollmentCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const { shortName } = req.body;
  const courseCollection = await getCoursesCollection();
  const course = await courseCollection.findOne({ shortName });
  const enrollmentsCollection = await getEnrollmentCollection();
  const people = await enrollmentsCollection
    .aggregate([
      { $addFields: { studentId: { $toObjectId: "$student" } } },
      { $match: { course: course._id, status: "accepted" } },
      {
        $lookup: {
          from: "users",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },

      {
        $addFields: {
          student: { $arrayElemAt: ["$student", 0] },
        },
      },
    ])
    .toArray();

  res.send({
    error: "",
    success: "waitings fetched",
    data: { waitings },
  });
});
