import React from 'react'
import  propTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'

export const SearchForm = ({handleOnChange, str}) => {
  return (
    <Form>
        <Form.Group as ={Row}>
            <Form.Label column ms="2"> Search:</Form.Label>
            <Col ms="9">
                <Form.Control 
                name="searchStr" 
                onChange={handleOnChange}
                placeholder='Search ...'
                value={str}
              />
            </Col>
        </Form.Group>

    </Form >
  )
}

SearchForm.protoTyps ={
    handleOnChange:propTypes.func.isRequired,
    str:propTypes.string.isRequired
}