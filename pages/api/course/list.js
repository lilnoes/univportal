// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCoursesCollection, getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const courseCollection = await getCoursesCollection();
  const user = req.session.user;
  const courses = await courseCollection.find({ creator: user._id }).toArray();
  res.send({ error: "", success: "courses", data: { courses } });
});
