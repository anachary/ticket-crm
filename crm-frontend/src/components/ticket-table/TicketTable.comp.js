import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";

export const TicketTable = ({ tickets }) => {
    return (<Table striped bordered hover>
        <thead>
            <th>#</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Updated Date</th>
            <th>Updated By</th>
            <th>Assigned Date</th>
            <th>Priority</th>
            <th>Assigned To</th>
        </thead>
        <tbody>
            {
            tickets.length ? (tickets.map(row => (<tr key={row._id}> 
                <td>
                <Link to={`/ticket/${row._id}`}>{row.id}</Link>
                </td>
                <td>{row.subject}</td>
                <td>{row.status}</td>
                <td>{row.updatedDate}</td>
                <td>{row.udatedBy}</td>
                <td>{row.assignedDate}</td>
                <td>{row.priority}</td>
                <td>{row.assignedTo}</td>
            </tr>
            ))) :
                (<tr><td colspan="8"  className="text-center">No Rows to display</td></tr>)}

        </tbody>
    </Table>
    )
}