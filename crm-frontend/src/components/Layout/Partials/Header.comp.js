import React from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faStar} from '@fortawesome/free-solid-svg-icons'
import "./Header.style.css"
import { useNavigate } from 'react-router-dom';



export const Header = () => {
  const navigate = useNavigate()

  const logMeOut = () => {
    //call endpoint to remove access token from mongodb and redis.
    navigate("/");
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
            <Nav.Link href="/company" className='dashboard-content-link'>Company</Nav.Link>
            <Nav.Link href="/tickets"  className='dashboard-content-link'>Tickets</Nav.Link>
            <Nav.Link  onClick={logMeOut} className='dashboard-content-link'>Logout</Nav.Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>)
}
