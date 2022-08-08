import axios from "axios";

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/api/v1/`;
const otpReqUrl = rootUrl + "user/reset-password";
const updatePassUrl = rootUrl + "user/reset-password";

export async function reqPasswordOtp(email) {

	try {
		const { data } = await axios.post(otpReqUrl, { email });

		console.log(data);
		return data;
	} catch (error) {
		throw error
	}
};

export async function updateUserPassword(passObj) {

	try {
		const { data } = await axios.patch(updatePassUrl, passObj);

		console.log(data);
		return data
	} catch (error) {
		throw error
	}
};
