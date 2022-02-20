import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

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

export const RegistrationForm = () => {

    const [newUser, setNewUser] = useState(initializeState)
    const [passwordError, setPasswordError] = useState(passVerificationError)
    const [requiredError, setRequiredError] = useState(requiredVerificationError)

    useEffect(() => { }, [newUser])

    const handleOnChange = e => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })

        if (name === "password") {
            const isLengthy = value.length >= 8
            const hasUpper = /[A-Z]/.test(value)
            const hasLower = /[a-z]/.test(value)
            const hasNumber = /[0-1]/.test(value)
            const hasSpecialCharacter = /[!, @, #, $, %, ^, *, (, _, ),]/.test(value)
           
            setPasswordError({ ...passwordError, isLengthy, hasUpper, hasLower, hasNumber, hasSpecialCharacter })
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

    console.log(newUser);
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
                    <Form>
 
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={newUser.name} onChange={handleOnChange} required placeholder="Enter Full Name" 
                            isInvalid={ !requiredError.isValidName}/>
                        </Form.Group>

 
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control as="select" name="company" value={newUser.company} onChange={handleOnChange} required
                             isInvalid={!requiredError.isValidCompany}>
                                <option value="">Select a Company</option>
                                <option value="Google">Google</option>
                                <option value="Microsoft">Microsoft</option>
                                <option value="Citrix">Citrix</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" name="phone" value={newUser.phone} onChange={handleOnChange} placeholder="Phone" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={newUser.address} onChange={handleOnChange} placeholder="Enter Address" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={newUser.password} onChange={handleOnChange} placeholder="Password" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" />
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
                            <Button variant="primary" type="submit" disabled={Object.values(passwordError).includes(false) || Object.values(requiredError).includes(false) }>
                                Register 
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-1 text-center'>
                <Col>
                    Already have an account ? <a href ='/'>Login Now</a>
                </Col>
            </Row>
        </Container>
    )
}
