// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getCoursesCollection,
  getEnrollmentCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { enrollment } = req.body;
  const enrollmentsCollection = await getEnrollmentCollection();
  try {
    await enrollmentsCollection.updateOne(
      {
        _id: ObjectId(enrollment),
      },
      { $set: { status: "accepted" } }
    );
  } catch (e) {
    return res.send({
      error: "error accepting",
      success: "",
      data: {},
    });
  }
  res.send({ error: "", success: "accepted enrollment", data: {} });
});
