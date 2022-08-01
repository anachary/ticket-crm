import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";

import {getCompanyUsers} from "../../api/userApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
export const CompanyUserTable = (props) => {
   
    const [companyUsers, setCompanyUsers] = useState([])
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [companyName, setCompanyName] = useState(props.companyName)

    const handleOnChange =(e)=>{
        setName(e.target.value)
    }

    useEffect (()=>{
      getCompanyUsers().then((result)=>{
        let companyUsers = result.users ? result.users.filter(v=>v.company === props.companyName):[]
        if(companyUsers && name){
            companyUsers = companyUsers.filter(v=>v.name.includes(name))
        }
        setCompanyUsers(companyUsers)
      }).catch((err)=>{
        setError('Network Error')
      })
    },[props.companyName, name])

 
    if (error) return <h3>{error}</h3>;


    return (<div>
            <div style={{ display: 'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <div>
                    <div>Name:</div>
                    <div>
                    <input type='text'
                        name="name"
                        className='p-1'
                        onChange={handleOnChange}
                        placeholder='Search ...'
                    />
                    </div>
                </div>
            </div>
            <div>
                <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>User Email</th>
                    <th>phone</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    companyUsers.length ? (companyUsers.map(row => (<tr key={row._id}>
                        <td>
                            {/* <Link to={`/user/${row._id}`}>{row._id}</Link> */}
                            {row._id}
                        </td>
                        <td>{row.name}</td>
                        <td>{row.company}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.adress}</td>
                        <td>{row.role}</td>
                        <td><div className='text-center'><FontAwesomeIcon icon={faTrash} /></div></td>
                        </tr>
                    ))) :
                        (<tr><td colSpan="8" className="text-center">No Rows to display</td></tr>)}

            </tbody>
                </Table>
            </div>
    </div> )
}