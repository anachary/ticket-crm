import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./pages/DashboardPage/userSlice";
import loginReducer from './components/login/loginSlice'
import registrationReducer from "./components/registration-form/userRegistrationSlice";
import ticketsReducer from "./pages/ticket-list/ticketsSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        tickets: ticketsReducer,
        user:  userReducer,
        registration: registrationReducer
    },
});

export default store;