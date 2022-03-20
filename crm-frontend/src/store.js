import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./pages/DashboardPage/userSlice";
import loginReducer from './components/login/loginSlice'
import registrationReducer from "./components/registration-form/userRegistrationSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        user:  userReducer,
        registration: registrationReducer
    },
});

export default store;