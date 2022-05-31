// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getEnrollmentCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const courseCollection = await getCoursesCollection();
  const enrollmentsCollection = await getEnrollmentCollection();
  const user = req.session.user;
  const enrollments = await enrollmentsCollection
    .aggregate([
      { $addFields: { creatorId: { $toObjectId: "$creator" } } },
      { $match: { student: user._id } },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
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
          creator: { $arrayElemAt: ["$creator", 0] },
          course: { $arrayElemAt: ["$course", 0] },
        },
      },
    ])
    .toArray();
  const found = enrollments.map((enrollment) => enrollment.course._id);
  const courses = await courseCollection
    .aggregate([
      { $addFields: { creatorId: { $toObjectId: "$creator" } } },
      {
        $match: {
          year: user.year,
          department: user.department,
          _id: { $nin: found },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $addFields: {
          creator: { $arrayElemAt: ["$creator", 0] },
          status: "",
          course: "$$ROOT",
        },
      },
    ])
    .toArray();

  res.send({
    error: "",
    success: "courses",
    data: { courses: [...enrollments, ...courses] },
  });
});
