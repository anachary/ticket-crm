import React ,{useState, useEffect} from 'react'
import {Container, Row, Col,Button} from 'react-bootstrap'
import {PageBreadcrumb} from "../../components/breadcrumb/Breadcrumb.comp.js"
import { SearchForm } from '../../components/search-form/SearchForm.comp.js'
import { TicketTable } from '../../components/ticket-table/TicketTable.comp.js'
import tickets from "../../assets/data/dummy.tickets.json"
import { Link } from "react-router-dom"

export const TicketLists = () => {

const [str, setStr]= useState('')
const[displyTicketList, setTicketList] = useState(tickets)
useEffect(()=>{

},[str, displyTicketList])

 const handleOnChange = e =>{
     setStr(e.target.value)
     searchTicket(e.target.value)
     console.log(e.target)
 }

 const searchTicket =sstr =>{
    const displayTickets = tickets.filter(row => row.subject.toLowerCase().includes(sstr.toLowerCase()))
    setTicketList(displayTickets)
 }

  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Ticket Lists" ></PageBreadcrumb>
            </Col>
        </Row>
        <Row className='mt-4'> 
            <Col>
                <Link to="/add-ticket">
                <Button>
                    Add New Ticket
                </Button>
                </Link>
            </Col>
            <Col className='text-end'>
                <SearchForm handleOnChange={handleOnChange} str={str}>
                </SearchForm>
                </Col>
        </Row>
        <hr/>
        <Row>
            <Col className="ticket-table">
                <TicketTable tickets={displyTicketList}>
                </TicketTable>
            </Col>
        </Row>
    </Container>
  )
}
