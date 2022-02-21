const jwt = require('jsonwebtoken')
const { storeUserRefreshJWT } = require('../model/user/User.model')
const { setJWT } = require('./redis.helper')

const createJWT = async (email, _id) => {
    try {
        const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        await setJWT(accessToken, _id)
        return Promise.resolve(accessToken)
    }
    catch (err) {
        throw err;
    }
}

const refreshJWT = async (email, _id) => {
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    await storeUserRefreshJWT(_id,refreshToken)
    return Promise.resolve(refreshToken)
}

const verifyAccessJWT = (userJWT) => {
    console.log(userJWT)
    console.log(process.env.JWT_ACCESS_SECRET)
    try {
      return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
    } catch (error) {
      return Promise.resolve(error);
    }
  };

const verifyRefreshJWT = (userJWT) => {
    try {
      return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    } catch (error) {
      return Promise.resolve(error);
    }
  };

module.exports = {
    createJWT,
    refreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT
}