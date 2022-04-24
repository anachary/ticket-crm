import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";
export const TicketTable = () => {
   
    const { searchTicketList, error } = useSelector(
        (state) => state.tickets
    );

 
    if (error) return <h3>{error}</h3>;


    return (<Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Updated Date</th>
                <th>Updated By</th>
                <th>Assigned Date</th>
                <th>Priority</th>
                <th>Assigned To</th>
            </tr>
        </thead>
        <tbody>
            {
                searchTicketList.length ? (searchTicketList.map(row => (<tr key={row._id}>
                    <td>
                        <Link to={`/ticket/${row._id}`}>{row._id}</Link>
                    </td>
                    <td>{row.subject}</td>
                    <td>{row.status}</td>
                    <td>{row.updatedDate? ((new Date(row.updatedDate)).toLocaleDateString('en-US') +" "+ (new Date(row.updatedDate)).toLocaleTimeString('en-US')):''}</td>
                    <td>{row.updatedBy}</td>
                    <td>{row.assignedDate ? ((new Date(row.assignedDate)).toLocaleDateString('en-US')+" "+(new Date(row.assignedDate)).toLocaleTimeString('en-US')):''}</td>
                    <td>{row.priority}</td>
                    <td>{row.assignedTo}</td>
                </tr>
                ))) :
                    (<tr><td colSpan="8" className="text-center">No Rows to display</td></tr>)}

        </tbody>
    </Table>
    )
}