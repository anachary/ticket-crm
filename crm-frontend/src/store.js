import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './components/login/loginSlice'
import registrationReducer from "./components/registration-form/userRegistrationSlice";

const store = configureStore({
    reducer: {

        login: loginReducer,
        registration: registrationReducer
    },
});

export default store;