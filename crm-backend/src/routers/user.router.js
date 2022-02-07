const express = require("express")
const router = express.Router()

const {insertUser} = require("../model/user/User.model")
const {hashPassword} = require("../helpers/bcrypthelper")
    



router.all("/", (req,res,next) =>{
 //res.json({message:"user router is healthy"})
 next();
})

router.post("/", async (req,res)=>{
    const {name, company, address, phone, email, password, role } = req.body
    try { 
        const hashPwd =  await hashPassword(password)
        let newUser = {
            name,
            company,
            address,
            phone,
            email,
            password: hashPwd,
            role
        }          
        const result = await insertUser(newUser);
        console.log(result)
        res.json({message:"New user created", result})
        
    } catch (error) {
        console.log(error)
        res.json({status:"error", message:error.message})
    }
})

module.exports = router 