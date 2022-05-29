// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async (req, res) => {
  const user = req.session.user;
  delete user.password;
  res.send({ error: "", success: "", data: { user } });
});
