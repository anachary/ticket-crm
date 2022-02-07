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

module.exports ={
    hashPassword
}