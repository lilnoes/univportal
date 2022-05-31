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
  const { _id, points } = req.body;
  const gradesCollection = await getGradesCollection();
  try {
    const d = await gradesCollection.updateOne(
      {
        _id: ObjectId(_id),
      },
      { $set: { points } }
    );
  } catch (e) {
    return res.send({
      error: "error updating points",
      success: "",
      data: {},
    });
  }
  res.send({ error: "", success: "updated points", data: {} });
});
