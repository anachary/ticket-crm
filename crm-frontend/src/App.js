import React from "react";
import { useSelector } from "react-redux";
import './App.css';
import { LandingPage } from './pages/LandingPage/LandingPage.page.js';
import { Registration } from './pages/registration/Registration.page.js';
import { createBrowserHistory } from 'history'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import {PrivateRoute} from './components/private-router/PrivateRoute.comp.js'
import { Dashboard } from './pages/DashboardPage/Dashboard.page.js';
import { TicketLists } from './pages/ticket-list/TicketLists.page.js';
import { CompanyLists } from './pages/company-list/CompanyLists.page.js';
import { AddTicket } from './pages/new-ticket/AddTicket.page.js';
import {Ticket} from './pages/ticket/Ticket.page.js'
import {Company} from './pages/company/Company.page.js'
import { AddCompany } from './pages/new-company/AddCompany.page.js';
import { UserVerification } from "./pages/user-verification/UserVerification.page";
import { PasswordOtpForm } from "./pages/password-reset/PasswordOtpForm.page";
function App() {
 
  const {user} = useSelector(state => state.user)
  return (
    <div className="App">
       <BrowserRouter forceRefresh>
        <Routes>
          <Route exact path="/" element={<LandingPage></LandingPage>} />
          <Route exact path ="/registration" element ={<Registration />} />
         
          <Route exact path="/password-reset" element={ <PasswordOtpForm />   }/>
					<Route exact path="/verification/:_id/:email" element={	<UserVerification />} />
          <Route
            path="/dashboard"
            element={
                <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
              } />
            <Route
              path="/company"
              element={
               <PrivateRoute><CompanyLists></CompanyLists></PrivateRoute>
                } />  
            <Route
              path="/tickets"
              element={
                <PrivateRoute><TicketLists></TicketLists></PrivateRoute>
              } />
              <Route
              path="/add-ticket"
              element={
                <PrivateRoute ><AddTicket></AddTicket></PrivateRoute>
              } 
              ></Route>
                <Route
              path="/ticket/:tId"
              element={
                <PrivateRoute><Ticket></Ticket></PrivateRoute>
              } 
              ></Route>
               <Route
              path="/company/:cId"
              element={
                user.role ==="admin" &&
                  <PrivateRoute><Company></Company></PrivateRoute>
              } 
              ></Route>
              <Route
              path="/add-company"
              element={
                user.role ==="admin" &&
                <PrivateRoute ><AddCompany></AddCompany></PrivateRoute>
              } 
              ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
