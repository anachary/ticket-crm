import React,{useState, useEffect} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faStar, faBell} from '@fortawesome/free-solid-svg-icons'
import "./Header.style.css"
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../../../api/userApi.js";
import { useSelector } from 'react-redux'
import NotifyMe from 'react-notification-timeline'

export const Header = () => {
  const navigate = useNavigate()

  const {user} = useSelector(state => state.user)
  const [notifications, setNotifications] = useState(!user?[]:user.notifications||[{
    'message': 'Ticket has been updated',
    'updatedBy': 'Akash Acharya',
    'updatedDate' : Date.now(),
    'read': false
  }])
  const [open, setOpen] = useState(false);


  const displayNotification = (notification) => {
    return (
      <div className="notification">{`${notification.message} by ${notification.updatedBy} on ${notification.updateDate}`}</div>
    );
  };

  const handleRead = () => {
   //InvokeEndpoint to setNotification to read for user
    setNotifications([])
    setOpen(false);
  };

  const logMeOut = async () => {
    //call endpoint to remove access token from mongodb and redis.
    await userLogout();
   
    localStorage.removeItem("crmSite");
    sessionStorage.removeItem("accessJWT");
    navigate("/")
    
  };

  return (
    <Navbar 
      className='dashboard-content-header'
      collapseOnSelect
      expand="md"
     >
      <Navbar.Brand>
        <div className='dashboard-content-header'>
          <div><FontAwesomeIcon icon={faStar}/></div>
          <div>Ticket CRM SYSTEM</div>
        </div> 
      </Navbar.Brand>
       <NavbarToggle aria-controls="basic-navbar-nav">
        <div className='dashboard-content-header'>
        <FontAwesomeIcon icon={faBars} />
       </div>
       </NavbarToggle>
        <NavbarCollapse id ="basic-navbar-nav">
          <Nav className= "dashboard-content">
            <Nav.Link href="/dashboard" className='dashboard-content-link'>Dashboard</Nav.Link>
            {user.role === "admin" && (<Nav.Link href="/company" className='dashboard-content-link'>Company</Nav.Link>)}
            <Nav.Link href="/tickets"  className='dashboard-content-link'>Tickets</Nav.Link>
              <NotifyMe
              data={notifications}
              storageKey='notific_key'
              notific_key='updatedDate'
              notific_value='message'
              heading='Notification Alerts'
              sortedByKey={false}
              showDate={true}
              size={25}
              color='#f4f4f4'
            />
            <Nav.Link  onClick={logMeOut} className='dashboard-content-link'>Logout</Nav.Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>)
}
