const express = require("express")
const router = express.Router()
const {insertUser,
	getUserByEmail,
	getUserById,
	updatePassword,
	storeUserRefreshJWT,
	verifyUser } = require("../model/user/User.model")
const { hashPassword, comparePassword } = require("../helpers/bcrypthelper")
const UserSchema = require("../model/user/User.schema")
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper")
const {userAuthorization} =require ("../middleware/authorization.middleware.js")

const { getJWT, deleteJWT } = require("../helpers/redis.helper")
const verificationURL = "http://localhost:3000/verification/";
const {
	setPasswordRestPin,
	getPinByEmailPin,
	deletePin,
} = require("../model/restPin/RestPin.model");
const { emailProcessor } = require("../helpers/email.helper");
const {
	resetPassReqValidation,
	updatePassValidation,
	newUserValidation,
} = require("../middleware/formValidation.middleware");

router.all("/", (req, res, next) => {
    //res.json({message:"user router is healthy"})
    next();
})


router.get("/", userAuthorization, async (req,res)=>{
  	//this data coming form database
	const _id = req.userId;

	const userProf = await getUserById(_id);
	const { name, email,role } = userProf;
	res.json({
		user: {
			_id,
			name,
			email,
			role,
		},
	});

})


router.post("/", async (req, res) => {
    const { name, company, address, phone, email, password, role } = req.body
    try {
        const hashPwd = await hashPassword(password)
        let newUser = {
            name,
            company,
            address,
            phone,
            email,
            password: hashPwd,
            role,
        }
        const result = await insertUser(newUser);
        console.log(result)     

		await emailProcessor({
			email,
			type: "new-user-confirmation-required",
			verificationLink: verificationURL + result._id + "/" + email,
		});

        res.json({ message: "New user created", result })

    } catch (error) {
        console.log(error)

		let message =
			"Unable to create new user at the moment, Please try agin or contact administration!";
		if (error.message.includes("duplicate key error collection")) {
			message = "this email already has an account";
		}
		res.json({ status: "error", message });
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Email and password cannot be empty.Please check the input or reset credentials.", status: "error" })
        }

        const user = await getUserByEmail(email);
        console.log(user)
        
       
        const hashPwd = user && user._id ? user.password : null

        if (!hashPwd) {
            res.status(500).json({ message: "Invalid email No user exists with this email. Please sign up", status: "error" })
        }
        const passwordMatch = await comparePassword(password, hashPwd)
        if (!passwordMatch) {
            res.status(500).json({ message: "Invalid combination of email and password. Please sign up or reset password", status: "error" })

        } else {
            const accessToken = await createAccessJWT(user.email, `${user._id}`)
            const refreshToken = await createRefreshJWT(user.email, `${user._id}`)

            res.status(200).json({ 
                message: "Succesfully Login", 
                status: "success",
                accessJWT: accessToken,
                refreshJWT: refreshToken })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", message: error.message })
    }
})

///very user after user is sign up
router.patch("/verify", async (req, res) => {
	try {
		const { _id, email } = req.body;
		console.log(_id, email);

		const result = await verifyUser(_id, email);

		if (result && result.id) {
			return res.json({
				status: "success",
				message: "You account has been activated, you may sign in now.",
			});
		}

		return res.json({
			status: "error",
			message: "Invalid request!",
		});
	} catch (error) {
		console.log(error);
		return res.json({
			status: "error",
			message: "Invalid request!",
		});
	}
});

// User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
	const { authorization } = req.headers;
	//this data coming form database
	const _id = req.userId;

	// 2. delete accessJWT from redis database
	await deleteJWT(authorization);

	// 3. delete refreshJWT from mongodb
	const result = await storeUserRefreshJWT(_id, "");

	if (result._id) {
		return res.json({ status: "success", message: "Loged out successfully" });
	}

	res.json({
		status: "error",
		message: "Unable to logg you out, plz try again later",
	});
});


router.post("/reset-password", resetPassReqValidation, async (req, res) => {
	const { email } = req.body;

	const user = await getUserByEmail(email);

	if (user && user._id) {
		/// crate// 2. create unique 6 digit pin
		const setPin = await setPasswordRestPin(email);
		await emailProcessor({
			email,
			pin: setPin.pin,
			type: "request-new-password",
		});
	}

	res.json({
		status: "success",
		message:
			"If the email is exist in our database, the password reset pin will be sent shortly.",
	});
});

router.patch("/reset-password", updatePassValidation, async (req, res) => {
	const { email, pin, newPassword } = req.body;

	const getPin = await getPinByEmailPin(email, pin);
	// 2. validate pin
	if (getPin?._id) {
		const dbDate = getPin.addedAt;
		const expiresIn = 1;

		let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

		const today = new Date();

		if (today > expDate) {
			return res.json({ status: "error", message: "Invalid or expired pin." });
		}

		// encrypt new password
		const hashedPass = await hashPassword(newPassword);

		const user = await updatePassword(email, hashedPass);

		if (user._id) {
			// send email notification
			await emailProcessor({ email, type: "update-password-success" });

			////delete pin from db
			deletePin(email, pin);

			return res.json({
				status: "success",
				message: "Your password has been updated",
			});
		}
	}
	res.json({
		status: "error",
		message: "Unable to update your password. plz try again later",
	});
});

module.exports = router 