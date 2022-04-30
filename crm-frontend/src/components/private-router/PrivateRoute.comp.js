import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {DefaultLayout} from '../layout/DefaultLayout.comp'
import { LandingPage } from '../../pages/LandingPage/LandingPage.page';
import { getUserProfile } from "../../pages/DashboardPage/userAction.js";
import { fetchNewAccessJWT } from "../../api/userApi.js";
import { loginSuccess } from "../login/loginSlice";

export const PrivateRoute = ({children, ...rest}) => {
  const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			result && dispatch(loginSuccess());
		};

		!user._id && dispatch(getUserProfile());

		!sessionStorage.getItem("accessJWT") &&
			localStorage.getItem("crmSite") &&
			updateAccessJWT();

		!isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
	}, [dispatch, isAuth, user._id]);

  return (isAuth && user && user.authenticated  ? <DefaultLayout>{children}</DefaultLayout>:<LandingPage/>)
}