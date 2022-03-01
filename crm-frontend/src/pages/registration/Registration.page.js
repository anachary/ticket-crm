import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { RegistrationForm } from '../../components/registration-form/RegistrationForm.comp.js'
import './registrationPage.style.css'

export const Registration = () => {
  return (
    <div className='root'>
    <div className='dashboard-header'>
      <div className='dashboard-content'>
       <div><FontAwesomeIcon icon={faStar}/></div>
        <div>Ticket CRM SYSTEM</div> 
      </div>
    </div>
    <div className='registration-page-div'>
      <div className='registration-landing-page jumbotron form-box'>
        <RegistrationForm />
      </div>
    </div>
  </div>
  )
}
