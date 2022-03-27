import React from 'react'
import { useDispatch } from "react-redux";
import { filterSerachTicket } from "../../pages/ticket-list/ticketsAction";
import { Form, Row, Col } from 'react-bootstrap'

export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;

    dispatch(filterSerachTicket(value));
  };

  return (
    <Form>
        <Form.Group as ={Row}>
            <Form.Label column ms="2"> Search:</Form.Label>
            <Col ms="9">
                <Form.Control 
                name="searchStr" 
                onChange={handleOnChange}
                placeholder='Search ...'
            
              />
            </Col>
        </Form.Group>

    </Form >
  )
}