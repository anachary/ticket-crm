import React , {useState}from 'react';
import {Container, Row, Col, Form, Button, Spinner, Alert} from 'react-bootstrap'
import PropTypes from 'prop-types'; // ES6
import {loginPending,loginSuccess, loginFail} from './loginSlice'
import {useDispatch, useSelector} from 'react-redux'
import {userLogin} from "../../api/userApi"
import { useNavigate } from 'react-router-dom';


export const Login = ({history}) => {
  const dispatch = useDispatch() 
  const {isLoading,isAuth, error } = useSelector(state =>state.login)
  const [email, setEmail] = useState('a@a.com')
  const [password,setPassword] = useState('secret$1234')
  const navigate = useNavigate()

  const handleOnChange = e =>{
    const{name, value} = e.target
    switch(name){
      case 'email':
        setEmail(value)
        break;

      case 'password':
        setPassword(value)
        break;

        default:
          break;

    }
    console.log(name, value)
  }
  
  const handleOnSubmit = async e => {
		e.preventDefault();

		if (!email || !password) {
			return alert("Fill up all the form!");
		}

		dispatch(loginPending());

		try {
			const isAuth = await userLogin({ email, password });

			if (isAuth.status === "error") {
				return dispatch(loginFail(isAuth.message));
			}

      dispatch(loginSuccess());
      
      navigate("/dashboard");

		} catch (error) {
			dispatch(loginFail(error.message));
		}
	};
  return(<Container>
      <Row>
           <Col>
            <h1 className='text-center tc-primary'>LOGIN</h1>
            <hr />
           </Col>
           {error && <Alert variant={"danger"}>"Please Check the credential and Sign up' if you dont have account.</Alert>}
           
           <Form autoComplete="off" onSubmit={handleOnSubmit}>
               <Form.Group>
                   <Form.Label>Email Address:</Form.Label>
                   <Form.Control 
                     type="email"
                     name="email"
                     placeholder="Enter Email"
                     required
                     value ={email}
                     onChange={handleOnChange}
                     
                   />
               </Form.Group>
               <Form.Group>
                   <Form.Label>Password</Form.Label>
                   <Form.Control 
                     type="password"
                     name="password"
                     placeholder="Password"
                     required
                     value={password}
                     onChange={handleOnChange}
                     required
                   />
               </Form.Group>
                <div className='text-center mb-2 mt-2'>
                    <Button type="submit" className='w-100'>Login</Button>
                    {isLoading && <Spinner variant ="primary" animation="border" />}
                </div>
           </Form>
           <hr />
      </Row>
      <Row>
          <Col>
          <a href='' className='' >Forgot Password?</a>
          </Col>
          <Col>
            New User <a href='' className='' >Sign Up?</a>
          </Col>
      </Row>
  </Container>);
};
