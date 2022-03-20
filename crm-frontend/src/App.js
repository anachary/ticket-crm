import React from "react";
import { useSelector } from "react-redux";
import './App.css';
import { LandingPage } from './pages/LandingPage/LandingPage.page.js';
import { Registration } from './pages/registration/Registration.page.js';
import { createBrowserHistory } from 'history'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import {PrivateRoute} from './components/private-router/PrivateRoute.comp.js'
import { Dashboard } from './pages/DashboardPage/Dashboard.page.js';
import { TicketLists } from './pages/ticket-list/TicketLists.page.js';
import { AddTicket } from './pages/new-ticket/AddTicket.page.js';
import {Ticket} from './pages/ticket/Ticket.page.js'

function App() {
	const  isAuth  = sessionStorage.getItem("accessJWT") &&
  localStorage.getItem("crmSite");
  
  const history = createBrowserHistory()
  return (
    <div className="App">
      <Router history={history} >
        <Routes>
          <Route exact path="/" element={!isAuth ?<LandingPage />:<Navigate to="/dashboard" />} />
          <Route exact path ="/registration" element ={<Registration />} />
          {/* PrivateRoutes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
              } />
            <Route
              path="/company"
              element={
                <PrivateRoute><div>Company Component will be Coming Soon </div></PrivateRoute>
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
              
        </Routes>
      </Router>
    </div>
  );
}

export default App;
