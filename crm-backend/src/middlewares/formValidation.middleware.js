const Joi = require("joi");


const createNewTicketValidation = (req, res, next) => {
	const schema = Joi.object({
		subject: shortStr.required(),
		sender: shortStr.required(),
		message: longStr.required(),
		issueDate: dt.required(),
        description: longStr.required(),
        status: shortStr.required(),
        priority: shortStr.required()
	});

	console.log(req.body);
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}

	next();
};

module.exports = {
	createNewTicketValidation,
};
