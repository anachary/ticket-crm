import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetOtp } from "./passwordAction";

import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Alert,
	Spinner,
} from "react-bootstrap";

export const ResetPassword = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");

	const { isLoading, status, message } = useSelector(state => state.password);

	const handleOnResetSubmit = e => {
		e.preventDefault();

		dispatch(sendPasswordResetOtp(email));
	};

	const handleOnChange = e => {
		const { value } = e.target;
		setEmail(value);
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1 className='text-center tc-primary'>Reset Password</h1>
					<hr />

					{message && (
						<Alert variant={status === "success" ? "success" : "danger"}>
							{message}
						</Alert>
					)}

					{isLoading && <Spinner variant="info" animation="border" />}

					<Form autoComplete="off" onSubmit={handleOnResetSubmit}>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={email}
								onChange={handleOnChange}
								placeholder="Enter Email"
								required
							/>
						</Form.Group>
						<div className='mt-1 text-center'><Button type="submit" className="text-center mb-2 mt-2 w-100">Reset Password</Button></div>
						
					</Form>
					<hr />
				</Col>
			</Row>
		</Container>
	);
};
