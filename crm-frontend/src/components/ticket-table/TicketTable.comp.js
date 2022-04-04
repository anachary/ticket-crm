import React from "react";
import { useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";
export const TicketTable = () => {
    const { searchTicketList, isLoading, error } = useSelector(
        (state) => state.tickets
      );
      //if (isLoading) return <h3>Loading ...</h3>;
      if (error) return <h3>{error}</h3>;
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
            searchTicketList.length ? (searchTicketList.map(row => (<tr key={row._id}> 
                <td>
                <Link to={`/ticket/${row._id}`}>{row._id}</Link>
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