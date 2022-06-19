const express = require("express");
const router = express.Router();

const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper");
const { getUserByEmail } = require("../model/user/User.model");

//return refresh jwt
router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;

  //TODO

  const decoded = await verifyRefreshJWT(authorization);
  if (decoded.email && decoded.company) {
    const userProf = await getUserByEmail(decoded.email, decoded.company);

    if (userProf._id) {
      let tokenExp = userProf.refreshJWT.addedAt;
      const dBrefreshToken = userProf.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );

      const today = new Date();

      if (dBrefreshToken !== authorization && tokenExp < today) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessJWT = await createAccessJWT(
        decoded.email,
        decoded.company,
        userProf._id.toString()
      );

      return res.json({ status: "success", accessJWT });
    }
  }

  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
