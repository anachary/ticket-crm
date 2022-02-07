const express = require("express")
const router = express.Router()

const {insertUser, getUserByEmail} = require("../model/user/User.model")
const {hashPassword,comparePassword} = require("../helpers/bcrypthelper")
const UserSchema = require("../model/user/User.schema")
    



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


router.post("/login", async (req,res)=>{
    const {email, password} = req.body
    try { 
        if(!email || !password){
            res.json({message:"Email and password cannot be empty.Please check the input or reset credentials.", status: "error"})
        }

        const user = await getUserByEmail(email);
        console.log(user)
        const hashPwd = user && user._id? user.password: null
       
        if (!hashPwd){
            res.json({message:"Invalid email No user exists with this email. Please sign up", status: "error"})
        }
        const passwordMatch = await comparePassword(password, hashPwd)
        if(!passwordMatch){
            res.json({message:"Invalid combination of email and password. Please sign up or reset password", status: "error"})
        }
    
        res.json({message:"Succesfully Login", status:"success"})
        
    } catch (error) {
        console.log(error)
        res.json({status:"error", message:error.message})
    }
})


module.exports = router 