// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const { firstName, lastName, email, country, department, year, password } =
    req.body;
  const usersCollection = await getUsersCollection();
  console.log("first name", firstName);
  res.status(200).json({ name: "John Doe" });
});
