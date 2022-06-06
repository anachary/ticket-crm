import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";

import {Container, Row, Col,Button} from 'react-bootstrap'
import {PageBreadcrumb} from "../../components/breadcrumb/Breadcrumb.comp.js"
import { SearchForm } from '../../components/search-form/SearchForm.comp.js'
import { TicketTable } from '../../components/ticket-table/TicketTable.comp.js'
import { Link } from "react-router-dom"



export const TicketLists = () => {

const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchAllTickets());
}, [dispatch]);


  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Ticket Lists" ></PageBreadcrumb>
            </Col>
        </Row>
        <Row className='mt-4'> 
            <Col md='3' className='mt-3'>
                <Link to="/add-ticket">
                <Button>
                    Add New Ticket
                </Button>
                </Link>
            </Col>
            <Col ms="4">
                <SearchForm>
                </SearchForm>
                </Col>
        </Row>
        <hr/>
        <Row>
            <Col className="ticket-table">
                <TicketTable>
                </TicketTable>
            </Col>
        </Row>
    </Container>
  )
}
