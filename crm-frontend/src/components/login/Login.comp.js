import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

export const Login = () => {
  return(<Container>
      <Row>
           <Col>
            <h1 className='text-center tc-primary'>LOGIN</h1>
            <hr />
           </Col>
           <Form>
               <Form.Group>
                   <Form.Label>UserName/Email Address</Form.Label>
                   <Form.Control 
                     type="email"
                     name="email"
                     placeholder="Enter Email"
                     required
                   />
               </Form.Group>
               <Form.Group>
                   <Form.Label>Password</Form.Label>
                   <Form.Control 
                     type="password"
                     name="password"
                     placeholder="Password"
                     required
                   />
               </Form.Group>
                <div className='text-center mb-2 mt-2'>
                    <Button type="submit" className='w-100'>Login</Button>
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
