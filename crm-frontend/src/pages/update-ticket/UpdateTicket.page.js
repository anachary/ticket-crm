import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import "./update-ticket.css";

export const UpdateTicket = ({buttonDisabled, disabled, comment, handleOnChange, handleOnSubmit, handleDelete,handleFollow}) => {
    return (
        <Form  autoComplete="off" onSubmit={handleOnSubmit}>
            <Form.Text>Comment</Form.Text>
            <Form.Control
            value ={comment}
            disabled = {disabled}
            onChange ={handleOnChange}
            name="detail" 
            as="textarea" 
            row="5" />
            <div className='save-row width=100% mt-4'>
              <div className='save-row-content'>
               <div><Button onClick ={handleFollow}>Follow</Button></div>
               <div><Button onClick ={handleDelete}>Delete</Button></div>
               <div><Button type="submit" disabled={buttonDisabled}>Save</Button></div>
            </div>
            </div>
        </Form>
    )
}

UpdateTicket.propTypes={
    comment : PropTypes.string.isRequired,
    buttonDisabled:PropTypes.bool.isRequired,
    handleOnChange:PropTypes.func.isRequired,
    handleOnSubmit:PropTypes.func.isRequired,
    handleDelete:PropTypes.func.isRequired,
    handleFollow:PropTypes.func.isRequired
}