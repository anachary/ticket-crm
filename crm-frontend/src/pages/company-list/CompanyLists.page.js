import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCompanies } from "./companiesAction";


import {Container, Row, Col,Button, Form} from 'react-bootstrap'
import {PageBreadcrumb} from "../../components/breadcrumb/Breadcrumb.comp.js"
import { CompanyTable } from '../../components/company-table/CompanyTable.comp.js'
import { Link } from "react-router-dom"



export const CompanyLists = () => {

const dispatch = useDispatch();

const [companyNameSearch,setCompanyNameSearch]= useState('')
useEffect(() => {
    dispatch(fetchAllCompanies());
}, [dispatch]);

const handleOnChange = (e) =>{
e.preventDefault()
setCompanyNameSearch(e.target.value)
}
  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Company Lists" ></PageBreadcrumb>
            </Col>
        </Row>
        <Row className='mt-4'> 
            <Col>
                <Link to="/add-company">
                <Button>
                    Add New Company
                </Button>
                </Link>
            </Col>
            <Col className='text-end'>
            <Form.Group as ={Row}>
            <Form.Label column ms="2"> Search:</Form.Label>
            <Col ms="9">
                <Form.Control 
                value ={companyNameSearch}
                onChange={handleOnChange}
                placeholder='Search ...'
            
              />
            </Col>
        </Form.Group>
                </Col>
        </Row>
        <hr/>
        <Row>
            <Col className="ticket-table">
                <CompanyTable companyNameSearch={companyNameSearch}>
                </CompanyTable>
            </Col>
        </Row>
    </Container>
  )
}
