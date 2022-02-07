const bcrypt = require('bcrypt')
const saltRound = 10

const hashPassword = async (password) =>{
  try{
    const hashPassword = await bcrypt.hash(password, saltRound)
    return hashPassword
  }
  catch(err){
      console.log(err)
      throw err
  }
}

const comparePassword = async (plainPwd,hashPwd) =>{
  try {
  return await  bcrypt.compareSync(plainPwd,hashPwd)
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports ={
    hashPassword,
    comparePassword
}