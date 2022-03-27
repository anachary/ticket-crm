import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container, Button } from 'react-bootstrap'
import { TicketTable } from '../../components/ticket-table/TicketTable.comp.js'
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp.js";
import { Link } from "react-router-dom"

import { fetchAllTickets } from "../ticket-list/ticketsAction";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);
  
    useEffect(() => {
      if (!tickets.length) {
        dispatch(fetchAllTickets());
      }
    }, [tickets, dispatch]);
  
    const pendingTickets = tickets.filter((row) => row.status !== "resolved");
    const totlatTickets = tickets.length;
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <PageBreadcrumb page="Dashboard" />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-5 mb-2">
                        <Link to="/add-ticket">
                            <Button>
                                Add New Ticket
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-5 mb-2">
                        <div>Total tickets: {totlatTickets}</div>
                        <div>Pending tickets: {pendingTickets.length}</div>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-2'>
                        Recently Added Tickets
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="recent-ticket">
                        <TicketTable tickets={tickets}>
                        </TicketTable>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
