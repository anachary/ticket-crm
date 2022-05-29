import axios from "axios";

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/v1/`;
const otpReqUrl = rootUrl + "user/reset-password";
const updatePassUrl = rootUrl + "user/reset-password";

export const reqPasswordOtp = email => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.post(otpReqUrl, { email });

			console.log(data);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const updateUserPassword = passObj => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.patch(updatePassUrl, passObj);

			console.log(data);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};
