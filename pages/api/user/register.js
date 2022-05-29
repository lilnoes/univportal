// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { createHash } from "crypto";

export default withSessionRoute(async (req, res) => {
  const { firstName, lastName, email, country, department, year, password } =
    req.body;
  if (!email) return res.json({ error: "invalid email" });
  const type = "".endsWith("@iuc.edu.tr") ? "teacher" : "student";
  const hash = createHash("md5").update(password).digest("hex");
  const usersCollection = await getUsersCollection();

  try {
    usersCollection.insertOne({
      firstName,
      lastName,
      email,
      country,
      department,
      year,
      password: hash,
    });
  } catch (e) {
    return res.json({ error: "email error" });
  }
  console.log("first name", firstName);
  res.status(200).json({ name: "John Doe" });
});
