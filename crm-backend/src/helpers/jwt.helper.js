const jwt = require('jsonwebtoken')
const { storeUserRefreshJWT } = require('../model/user/User.model')
const { setJWT } = require('./redis.helper')

const createJWT = async (email, _id) => {
    try {
        const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRETE, { expiresIn: '15m' })
        await setJWT(accessToken, _id)
        return Promise.resolve(accessToken)
    }
    catch (err) {
        throw err;
    }
}

const refreshJWT = async (email, _id) => {
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRETE, { expiresIn: '30d' })
    await storeUserRefreshJWT(_id,refreshToken)
    return Promise.resolve(refreshToken)
}

module.exports = {
    createJWT,
    refreshJWT,
}