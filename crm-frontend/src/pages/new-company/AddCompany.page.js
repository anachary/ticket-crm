import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import {AddCompanyForm}  from '../../components/add-company-form/AddCompanyForm.comp.js'
export const AddCompany = () => {
  return (
    <Container>
      <Row>
        <Col>
        <PageBreadcrumb page ="Add New Company" />
        </Col>
      </Row>
      <Row>
        <Col>
         <AddCompanyForm />
        </Col>
      </Row>
      
    </Container>
  )
}
