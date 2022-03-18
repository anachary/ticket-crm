import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const UpdateTicket = ({buttonDisabled, comment, handleOnChange, handleOnSubmit}) => {
    return (
        <Form  autoComplete="off" onSubmit={handleOnSubmit}>
            <Form.Text>Comment</Form.Text>
            <Form.Control
            value ={comment}
            onChange ={handleOnChange}
            name="detail" 
            as="textarea" 
            row="5" />
            <div className='text-end width=100% mt-4'>
                <Button type="submit" disabled={buttonDisabled}>Save</Button>
            </div>
        </Form>
    )
}

UpdateTicket.propTypes={
    comment : PropTypes.string.isRequired,
    buttonDisabled:PropTypes.bool.isRequired,
    handleOnChange:PropTypes.func.isRequired,
    handleOnSubmit:PropTypes.func.isRequired
}