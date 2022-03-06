import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import { TicketTable } from '../../components/ticket-table/TicketTable.comp.js'
import tickets from "../../assets/data/dummy.tickets.json"
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp.js";
export const Dashboard = () => {
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
                        <Button
                            varint="info"
                            style={{ "font-size": "2rem", "padding": "10px 30px" }}>
                            Add New Ticket
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-5 mb-2">
                        <div> Total tickets : 50</div>
                        <div>Pending tickets: 50</div>
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
