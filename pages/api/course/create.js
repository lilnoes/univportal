// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCoursesCollection, getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { name, shortName, year, department, description, requirements } =
    req.body;
  const courseCollection = await getCoursesCollection();
  const user = req.session.user;
  try {
    await courseCollection.insertOne({
      creator: user._id,
      name,
      shortName,
      year,
      department,
      description,
      requirements,
      count: 0,
    });
  } catch (e) {
    return res.send({ error: "error adding course", success: "", data: {} });
  }
  res.send({ error: "", success: "course created", data: {} });
});
