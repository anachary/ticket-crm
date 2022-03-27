const Joi = require("joi");
const shortStr = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);
const dt = Joi.date()

const createNewTicketValidation = (req, res, next) => {
	const schema = Joi.object({
		subject: shortStr.required(),
		issueDate: dt.required(),
        description: longStr.required(),
        status: shortStr.required(),
        priority: shortStr.required(),
        assignedTo:shortStr.required(),
		assignedDate: dt.required(),
		sender: shortStr.required()
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
