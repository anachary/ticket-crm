import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import { shortText } from '../../util/validation';
import { MessageHistory } from '../../components/message-history/MessageHistory.comp.js';

import { UpdateTicket } from '../update-ticket/UpdateTicket.page.js';

import { useParams } from 'react-router-dom';

import { fetchSingleTicket} from "../ticket-list/ticketsAction";
import { resetResponseMsg, fetchTicketSuccess } from "../ticket-list/ticketsSlice";
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from "../DashboardPage/userAction.js";

import {
  getSingleTicket, updateReplyTicket, updateTicket, deleteTicket, followTicket
} from "../../api/ticketApi"
const initialTicketValid = {
  subject: false,
  issueDate: false,
  description: false,
  assignedTo: true,
  assignedDate: true,
};
const validateTicket = (newFrmDtValid, newTicket) => {
  if(newTicket){
  newFrmDtValid.subject = shortText(newTicket.subject)
  newFrmDtValid.issueDate = newTicket.issueDate.length > 0
  newFrmDtValid.description = newTicket.description.length > 0
  newFrmDtValid.assignedTo = (newTicket.status === "UnAssigned") || (newTicket.assignedTo && newTicket.assignedTo.length > 0)
  newFrmDtValid.assignedDate = (newTicket.status === "UnAssigned") || (newTicket.assignedDate && newTicket.assignedDate.length > 0)
  }
  return newFrmDtValid
}

export const Ticket = () => {
  const {tId} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
	const {
		isLoading,
		error,
		selectedTicket,
		replyMsg,
		replyTicketError,
	} = useSelector(state => state.tickets);

   const {user, socket} = useSelector(state=>state.user)
   
   const [ticket, setTicket] = useState(selectedTicket)
   let currentTicketValid=initialTicketValid 
   if(ticket){
   currentTicketValid = validateTicket(initialTicketValid, ticket)
  }
  
  const [ticketValid, setTicketValid] = useState(currentTicketValid);
  const [comment, setComment] = useState('')
  const [followMsg, setFollowMsg] = useState('')
  const [followErr, setFollowErr] = useState('')
  const disabled = user.role === 'client' && selectedTicket && selectedTicket.status.toLowerCase() === 'resolved'

  useEffect(() => {
    getSingleTicket(tId).then((result)=>{
      if( result.data.result.length && result.data.result[0]){
      let sticket = result.data.result[0]
      sticket.issueDate = new Date(sticket.issueDate).toISOString().slice(0,10)
      sticket.assignedDate = new Date(sticket.assignedDate).toISOString().slice(0,10)
      sticket.updatedDate = new Date(sticket.updatedDate).toISOString().slice(0,10)
      setTicket(sticket)
      }
    })
    dispatch(fetchSingleTicket(tId))
    return () => {
			(replyMsg || replyTicketError) && dispatch(resetResponseMsg());
		};
   
  },[tId, dispatch, replyMsg, replyTicketError]);
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const newTicket = Object.assign({}, ticket)
    const newTicketValid = Object.assign({}, ticketValid)
    newTicket[name] = value
    const newFrmDtValid = validateTicket(newTicketValid, newTicket)

    setTicketValid({ ...newFrmDtValid })
    setTicket({ ...newTicket });

  };

  const handleOnSubmit = async(e) => {
    try{
    console.log("form data:", selectedTicket)
    await updateTicket(selectedTicket._id, ticket, user.email)
    await updateReplyTicket(ticket._id, {message:comment, sender: user.email})
    dispatch(getUserProfile());
    console.log('ticket saved submitted')
    }
    catch(error){
      console.log(error.message)
    }
  }

  const handleDelete = (e)=>{
      console.log("Ticket Delete")
      deleteTicket(selectedTicket._id)
      .then(()=>{navigate("/",{replace:true})})
       .catch(err=>{
        console.log(error.message)
      })
  }

  const handleFollow = async (e) => {
    try{
    console.log("Ticket Follow")
    await followTicket(selectedTicket._id, user.email)
    setFollowMsg("Ticket was successfully Followed")
    setFollowErr("")
   }
   catch(e){
    setFollowMsg("")
    setFollowErr("Ticket was not succesfully followed")
   }
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
      <Row>
				<Col>
					{isLoading && <Spinner variant="primary" animation="border" />}
					{error && <Alert variant="danger">{error}</Alert>}
					{replyTicketError && (
						<Alert variant="danger">{replyTicketError}</Alert>
					)}
					{replyMsg && <Alert variant="success">{replyMsg}</Alert>}
          {followErr && (
						<Alert variant="danger">{followErr}</Alert>
					)}
					{followMsg && <Alert variant="success">{followMsg}</Alert>}
				</Col>
        </Row>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Subject
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="subject"
              disabled ={disabled}
              value={ticket?ticket.subject:''}
              isInvalid={!ticketValid.subject}
              onChange={handleOnChange}
              placeholder="Subject"
              size="sm"
            />
          </Col>
          <Form.Label  column sm={2}>Status</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="status"
              value={ticket?ticket.status:'UnAssigned'}
              disabled ={disabled}
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
              disabled ={disabled}
              isInvalid={!ticketValid.issueDate}
              value={ticket?ticket.issueDate:''}
              onChange={handleOnChange}
              required
            />
          </Col>
          <Form.Label  column sm={2}>Priority</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="priority"
              value={ticket?ticket.priority:''}
              disabled ={disabled}
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
              disabled ={disabled}
              value={ticket?ticket.assignedTo:''}
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
              disabled ={disabled}
              value={ticket?ticket.assignedDate:''}
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
              disabled ={disabled}
              value={ticket?ticket.updatedBy:''}
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
              value={ticket?ticket.updatedDate:''}
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
            disabled ={disabled}
            value={ticket?ticket.description:''}
            onChange={handleOnChange}
            size="sm"
            isInvalid={!ticketValid.description}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <div className='font-weight-bold lg underline'>Conversation History</div>
              <MessageHistory msg={ticket.conversations} disabled={disabled} />
              <UpdateTicket buttonDisabled={(!disabled && Object.values(ticketValid).includes(false))|| disabled } disabled={disabled}  comment ={comment} 
              handleOnChange ={handleOnChangeComment} 
              handleOnSubmit={handleOnSubmit}
              handleDelete={handleDelete}
              handleFollow={handleFollow}
              />
            </Col>
          </Row>
        </Form.Group>
    </Container>
  )
}


