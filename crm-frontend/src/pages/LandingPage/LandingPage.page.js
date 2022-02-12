import React from 'react';
import {Login} from '../../components/login/Login.comp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import "./landingPage.style.css"

export const LandingPage = () => {
  return <div className='root'>
    <div className='dashboard-header'>
      <div className='dashboard-content'>
       <div><FontAwesomeIcon icon={faStar}/></div>
        <div>Ticket CRM SYSTEM</div> 
      </div>
    </div>
    <div className='login-form-div'>
      <div className='landing-page jumbotron form-box'>
        <Login ></Login>
      </div>
    </div>
  </div>;
};
