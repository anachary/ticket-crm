import React from "react";
import { useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";
export const CompanyTable = () => {
    const { searchCompanyList, error } = useSelector(
        (state) => state.companies
      );
      //if (isLoading) return <h3>Loading ...</h3>;
      if (error) return <h3>{error}</h3>;
    return (<Table striped bordered hover>
        <thead>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Updated Date</th>
            <th>Updated By</th>
        </thead>
        <tbody>
            {
            searchCompanyList.length ? (searchCompanyList.map(row => (<tr key={row._id}> 
                <td>
                <Link to={`/company/${row._id}`}>{row._id}</Link>
                </td>
                <td>{row.name}</td>
                <td>{row.status}</td>
                <td>{row.updatedDate}</td>
                <td>{row.udatedBy}</td>
            </tr>
            ))) :
                (<tr><td colspan="8"  className="text-center">No Rows to display</td></tr>)}

        </tbody>
    </Table>
    )
}