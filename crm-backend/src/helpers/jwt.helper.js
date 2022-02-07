const jwt = require ('jsonwebtoken')

const createJWT = async (payload) => {
    const accessToken = jwt.sign( {payload}, process.env.JWT_ACCESS_SECRETE,{expiresIn:'15m'})
    return Promise.resolve(accessToken)
}

const refreshJWT = (payload) =>{
    const refreshToken = jwt.sign({payload}, process.env.JWT_REFRESH_SECRETE,   {expiresIn:'30d'} )

    return Promise.resolve(refreshToken)
}

module.exports = {
    createJWT,
    refreshJWT,
}