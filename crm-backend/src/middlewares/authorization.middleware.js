const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

const userAuthorization = async (req, res) =>{

    const {authorization} = req.headers
    
    console.log(authorization)
    //1.jwt is valid
    const decoded = await verifyAccessJWT(authorization);
    console.log(decoded)

    //2.jwt is in redis
    if (decoded.email) {
        const userId = await getJWT(authorization);
        
        if (!userId) {
          return res.status(403).json({ message: "Forbidden" });
        }
    
    //3.extract user_id,
    //4 get user profile for userid
    req.userId = userId;

    return next();
  }
  
  await deleteJWT(authorization);

  return res.status(403).json({ message: "Forbidden" });
}


module.exports={
    userAuthorization
}