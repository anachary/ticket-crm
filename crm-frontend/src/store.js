import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './components/login/loginSlice'


const store = configureStore({
    reducer: {

        login: loginReducer
    },
});

export default store;