import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCompanies } from "./companiesAction";


import {Container, Row, Col,Button} from 'react-bootstrap'
import {PageBreadcrumb} from "../../components/breadcrumb/Breadcrumb.comp.js"
import { SearchForm } from '../../components/search-form/SearchForm.comp.js'
import { CompanyTable } from '../../components/company-table/CompanyTable.comp.js'
import { Link } from "react-router-dom"



export const CompanyLists = () => {

const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchAllCompanies());
}, [dispatch]);


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
                <SearchForm>
                </SearchForm>
                </Col>
        </Row>
        <hr/>
        <Row>
            <Col className="ticket-table">
                <CompanyTable>
                </CompanyTable>
            </Col>
        </Row>
    </Container>
  )
}
