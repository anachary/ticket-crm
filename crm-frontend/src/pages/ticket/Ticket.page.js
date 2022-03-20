import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import tickets from "../../assets/data/dummy.tickets.json"
import { shortText } from '../../util/validation';
import { MessageHistory } from '../../components/message-history/MessageHistory.comp.js';

import { UpdateTicket } from '../update-ticket/UpdateTicket.page.js';

import { useParams } from 'react-router-dom';


const initialTicketValid = {
  subject: false,
  issueDate: false,
  description: false,
  assignedTo: true,
  assignedDate: true,
};


const validateTicket = (newFrmDtValid, newTicket) => {

  newFrmDtValid.subject = shortText(newTicket.subject)
  newFrmDtValid.issueDate = newTicket.issueDate.length > 0
  newFrmDtValid.description = newTicket.description.length > 0
  newFrmDtValid.assignedTo = (newTicket.status === "UnAssigned") || (newTicket.assignedTo && newTicket.assignedTo.length > 0)
  newFrmDtValid.assignedDate = (newTicket.status === "UnAssigned") || (newTicket.assignedDate && newTicket.assignedDate.length > 0)
  return newFrmDtValid
}
export const Ticket = () => {
  const {tId} = useParams()

  const [ticket, setTicket] = useState('');
  const [ticketValid, setTicketValid] = useState(initialTicketValid);
  const [comment, setComment] = useState('')

  useEffect(() => {
    const currentTicket = tickets.find(v=> v.id == tId)
    const currentTicketValid = validateTicket(ticketValid, currentTicket)
    setTicketValid(currentTicketValid)
    setTicket(currentTicket)
  }, [ comment, tId]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const newTicket = Object.assign({}, ticket)
    const newTicketValid = Object.assign({}, ticketValid)
    newTicket[name] = value
    const newFrmDtValid = validateTicket(newTicketValid, newTicket)

    setTicketValid({ ...newFrmDtValid })
    setTicket({ ...newTicket });

  };

  const handleOnSubmit = (e) => {
    console.log("form data:", ticket)
    console.log('comment', comment)
    alert('form submitted')
  }

  const handleOnChangeComment =(e)=>{
    setComment(e.target.value);
  }


  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page='Ticket' />
        </Col>
      </Row>
     
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Subject
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="subject"
              value={ticket.subject}
              isInvalid={!ticketValid.subject}
              onChange={handleOnChange}
              placeholder="Subject"
              size="sm"
            />
          </Col>
          <Form.Label l column sm={2}>Status</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="status"
              value={ticket.status}
              onChange={handleOnChange} required >
              <option value="UnAssigned">UnAssigned</option>
              <option value="Assigned">Assigned</option>
              <option value="InProgress">InProgress</option>
              <option value="Resolved">Resolved</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Issue Found
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              name="issueDate"
              size="sm"
              isInvalid={!ticketValid.issueDate}
              value={ticket.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
          <Form.Label l column sm={2}>Priority</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="priority"
              value={ticket.priority}
              onChange={handleOnChange} required >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Control>
          </Col>


        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Assigned To
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="assignedTo"
              value={ticket.assignedTo}
              isInvalid={!ticketValid.assignedTo}
              onChange={handleOnChange}
              placeholder="Assigned To"
              size="sm"
            />
          </Col>
          <Form.Label column sm={2}>
            Assigned Date
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="assignedDate"
              type="date"
              value={ticket.assignedDate}
              isInvalid={!ticketValid.assignedDate}
              onChange={handleOnChange}
              size="sm"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Updated By
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="assignedTo"
              value={ticket.assignedTo}
              placeholder="Updated By"
              size="sm"
              disabled
            />
          </Col>
          <Form.Label column sm={2}>
            Updated Date
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="assignedDate"
              type="date"
              value={ticket.assignedDate}
              size="sm"
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="5"
            className='ml-1 mr-1'
            value={ticket.description}
            onChange={handleOnChange}
            size="sm"
            isInvalid={!ticketValid.description}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <div className='font-weight-bold lg underline'>Conversation History</div>
              <MessageHistory msg={ticket.history} />
              <UpdateTicket buttonDisabled={Object.values(ticketValid).includes(false)}  comment ={comment} handleOnChange ={handleOnChangeComment} handleOnSubmit={handleOnSubmit}/>
            </Col>
          </Row>
        </Form.Group>
    </Container>
  )
}


