import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import {AddTicketForm}  from '../../components/add-ticket-form/AddTicketForm.comp.js'
export const AddTicket = () => {
  return (
    <Container>
      <Row>
        <Col>
        <PageBreadcrumb page ="Add New Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
         <AddTicketForm />
        </Col>
      </Row>
      
    </Container>
  )
}
