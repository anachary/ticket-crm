import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner, Alert} from 'react-bootstrap'
import { editUserRegistration, newUserRegistration } from "./userRegAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from '../../pages/company-list/companiesAction';

const initializeState = {
    name: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    password: '',
    confirmPassword: ''
}

const passVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecialCharacter: false,
    confirmPassword: false
}

const requiredVerificationError = {
    isValidName:false,
    isValidEmail:false,
    isValidCompany:false,
}

export const RegistrationForm = (props) => {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState(props.user ||initializeState)
    const [passwordError, setPasswordError] = useState(passVerificationError)
    const [requiredError, setRequiredError] = useState(requiredVerificationError)
   
    const { isLoading, status, message } = useSelector(
        (state) => state.registration
      );

    const {companies} = useSelector(
        (state) => state.companies
      );  
   
    useEffect(() => {
        if(newUser){
         
         const newRequiredError = {... requiredVerificationError}
         newRequiredError.isValidName = newUser.name !== ""
         newRequiredError.isValidCompany = newUser.company !== ""
         newRequiredError.isValidEmail = newUser.email !== ""

         setRequiredError(newRequiredError)

        }
       }, [newUser])

    useEffect(() => {
       dispatch(fetchAllCompanies())
    }, [])


    const handleOnChange = e => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })

        if (name === "password") {
            const isLengthy = value.length >= 8
            const hasUpper = /[A-Z]/.test(value)
            const hasLower = /[a-z]/.test(value)
            const hasNumber = /[0-1]/.test(value)
            const hasSpecialCharacter = /[!, @, #, $, %, ^, *, (, _, ),]/.test(value)
            const confirmPassword = (value === newUser.confirmPassword)
            setPasswordError({ ...passwordError, isLengthy, hasUpper, hasLower, hasNumber, hasSpecialCharacter, confirmPassword })
        }

        else if(name==="confirmPassword"){
            const confirmPassword = (value === newUser.password)
            setPasswordError({ ...passwordError, confirmPassword})
        }

        if (name === "name"){
            const isValidName = value !== ""
            setRequiredError({ ...requiredError, isValidName})
        }

        if (name === "company"){
            const isValidCompany = value !== ""
            setRequiredError({ ...requiredError, isValidCompany})
        }

        if(name === "email"){
            const isValidEmail = value !== ""
            setRequiredError({ ...requiredError, isValidEmail})
        }

    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
      
        // console.log(newUser);
        const { name, phone, email, company, address, password } = newUser;
    
        const newRegistration = {
          name,
          phone,
          email,
          company,
          address,
          password,
          role:"client"
        };
        !props.editMode ? dispatch(newUserRegistration(newRegistration)) : dispatch(editUserRegistration(newRegistration))
      };
    return (
        <Container>
            <Row>
                <Col>
                    <h4 className='text-header text-center'>User Registration Page</h4>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                {message && (
                    <Alert variant={status === "error" ? "danger" : "success"}>
                    {message}
                    </Alert>
                )}
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={handleOnSubmit}>
 
                        <Form.Group className="mt-1">
                            <Form.Label className="fs-sm mb-0">Full Name</Form.Label>
                            <Form.Control size="sm" type="text" name="name" value={newUser.name} onChange={handleOnChange} required placeholder="Enter Full Name" 
                            isInvalid={ !requiredError.isValidName}/>
                        </Form.Group>

                        <Form.Group className="mt-1">
                            <Form.Label className="fs-sm mb-0">Email address</Form.Label> 
                            <Form.Control type="email" size="sm" name="email" value={newUser.email} onChange={handleOnChange} required placeholder="Enter email"
                             isInvalid={ !requiredError.isValidEmail} />
                        </Form.Group>

 
                        <Form.Group className="mt-1">
                            <Form.Label className="fs-sm mb-0">Company</Form.Label>
                            <Form.Control as="select" size="sm" name="company" value={newUser.company} onChange={handleOnChange} required
                             isInvalid={!requiredError.isValidCompany}>
                                <option>Select Company</option>
                                { companies.map(v=>(<option value={v.name}>{v.name}</option>)) }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label className="fs-sm mb-0">Phone</Form.Label>
                            <Form.Control type="number" size="sm" name="phone" value={newUser.phone} onChange={handleOnChange} placeholder="Phone" />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label className="fs-sm mb-0 mt-1">Address</Form.Label>
                            <Form.Control type="text" size="sm" name="address" value={newUser.address} onChange={handleOnChange} placeholder="Enter Address" />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label className="fs-sm mb-0 mt-1">Password</Form.Label>
                            <Form.Control type="password" size="sm" name="password" value={newUser.password} onChange={handleOnChange} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label className="fs-sm mb-0 mt-1">Confirm Password</Form.Label>
                            <Form.Control type="password" size="sm" name="confirmPassword" value={newUser.confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" />
                        </Form.Group>

                        <Form.Group className='mt-2 ml-2'>
                             {!passwordError.confirmPassword && (<Form.Text className = 'text-danger lg'>Password and confirm password does not match</Form.Text>)}
                            <ul>
                                <li className={passwordError.isLengthy ? 'text-success' : 'text-danger'}> Min 8 characters. </li>
                                <li className={passwordError.hasUpper ? 'text-success' : 'text-danger'}> At least one uppper case. </li>
                                <li className={passwordError.hasLower ? 'text-success' : 'text-danger'}> At least one lower case.  </li>
                                <li className={passwordError.hasNumber ? 'text-success' : 'text-danger'}> At least one number. </li>
                                <li className={passwordError.hasSpecialCharacter ? 'text-success' : 'text-danger'}> At least special characters ! @ # $ % ^ * ( )</li>
                            </ul>
                        </Form.Group>
                        
                        <Form.Group className='text-center'>
                            <Button variant="primary" type="submit"  size="sm" disabled={Object.values(passwordError).includes(false) || Object.values(requiredError).includes(false) }>
                                {!props.editMode ? 'Register' :'Update'} 
                            </Button>
                            {(props.editMode||props.forceInsert )&& (<Button variant="secondary" type="submit"  size="sm"  className = "m-5" onClick={props.handleCancel}>Cancel</Button>)}
                            {isLoading && <Spinner variant="info" animation="border" />}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            {!props.editMode && (<Row className='mt-1 text-center'>
                <Col>
                  <div> Already have an account ? <a href ='/'>Login Now</a></div>
                </Col>
            </Row>)}
        </Container>
    )
}
