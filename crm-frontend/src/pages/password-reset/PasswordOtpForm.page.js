import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ResetPassword } from "../../components/password-reset/PasswordReset.comp";
import UpdatePasswordForm from "../../components/password-reset/UpdatePasswordForm.comp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import "./passwordOtpForm.style.css";

export const PasswordOtpForm = () => {
	const { showUpdatePassForm } = useSelector(state => state.password);
	return ( <div className='root'>
    <div className='dashboard-header'>
      <div className='dashboard-content-1'>
       <div><FontAwesomeIcon icon={faStar}/></div>
        <div>Ticket CRM SYSTEM</div> 
      </div>
    </div>
    <div className='login-form-div'>
      <div className='landing-page jumbotron form-box'>
	  {showUpdatePassForm ? <UpdatePasswordForm /> : <ResetPassword />}
				<div className="text-center">
					<a href="/">Login Now</a>
				</div>
      </div>
    </div>
  </div>)
  }
