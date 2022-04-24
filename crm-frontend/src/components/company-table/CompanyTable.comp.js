import React from "react";
import { useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";
export const CompanyTable = ({companyNameSearch}) => {
    const { searchCompanyList, error } = useSelector(
        (state) => state.companies
      );
    let companies = !companyNameSearch?searchCompanyList: searchCompanyList.filter(v=>v.name.toLowerCase().includes(companyNameSearch.toLowerCase()))
      //if (isLoading) return <h3>Loading ...</h3>;
      if (error) return <h3>{error}</h3>;
    return (<Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Updated Date</th>
                <th>Updated By</th> 
            </tr>
        </thead>
        <tbody>
            {
            companies.length ? (companies.map(row => (<tr key={row._id}> 
                <td>
                <Link to={`/company/${row._id}`}>{row._id}</Link>
                </td>
                <td>{row.name}</td>
                <td>{row.status}</td>
                <td>{row.updatedDate}</td>
                <td>{row.udatedBy}</td>
            </tr>
            ))) :
                (<tr><td colSpan="8"  className="text-center">No Rows to display</td></tr>)}

        </tbody>
    </Table>
    )
}