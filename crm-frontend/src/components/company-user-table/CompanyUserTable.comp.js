import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import {deleteUser, getCompanyUsers} from "../../api/userApi"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { RegistrationForm } from "../registration-form/RegistrationForm.comp";
import "../../pages/registration/registrationPage.style.css"
export const CompanyUserTable = (props) => {

    const initializeState = {
        name: '',
        phone: '',
        email: '',
        company: '',
        address: '',
        password: '',
        confirmPassword: ''
    }
   
    const [companyUsers, setCompanyUsers] = useState([])
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [showRegistration, setShowRegistration] = useState(false)
    const [editUser, setEditUser] = useState(initializeState)
    const [editMode, setEditMode] = useState(false)
    const [forceInsert, setForceInsert] = useState(false)

    const handleEdit = (row)=>{
        const newEditUser = {...initializeState}
        if(row) {
        newEditUser.name = row.name,
        newEditUser.phone = row.phone,
        newEditUser.email = row.email
        newEditUser. company= row.company
        newEditUser.address= row.address
        newEditUser.password= row.password
        newEditUser.confirmPassword= row.confirmPassword
        setEditMode(true)
        setForceInsert(false)
        
       }
        else{
            setForceInsert(true)  
            setEditMode(false)}

        setEditUser(newEditUser)
        setShowRegistration(true)
    }
    
    const handleOnChange =(e)=>{
        setName(e.target.value)
    }

    const handleDelete = async (email, company)=>{
       await deleteUser(email,company)
       refreshGrid()
    }
    
    const refreshGrid = () =>{
    getCompanyUsers().then((result)=>{
        let companyUsers = result.users ? result.users.filter(v=>v.company === props.companyName):[]
        if(companyUsers && name){
            companyUsers = companyUsers.filter(v=>v.name.includes(name))
        }
        setCompanyUsers(companyUsers)
        }).catch((err)=>{
        setError('Network Error')
        })
    }
    
    const handleCancel = ()=>{
        setShowRegistration(false) 
        refreshGrid()
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
                {showRegistration && (<div className='registration-landing-page jumbotron form-box'>
                        <RegistrationForm user={editUser} editMode={editMode}  handleCancel={handleCancel} forceInsert={forceInsert}/>
                    </div>)
                    }
                {!showRegistration && (<div>
                    <div style={{ display: 'flex', justifyContent:'space-between', marginBottom:'5px'}}>
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
                        <div><Button onClick = {(e)=>{handleEdit()}} variant="primary" size="md"> Register New User</Button></div>
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
                                    <div onClick = {(e)=>{handleEdit(row)}}>{row._id}</div>
                                </td>
                                <td>{row.name}</td>
                                <td>{row.company}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                                <td>{row.adress}</td>
                                <td>{row.role}</td>
                                <td><div className='text-center' onClick={(e)=>{handleDelete(row.email, row.company)}} ><FontAwesomeIcon icon={faTrash} /></div></td>
                                </tr>
                            ))) :
                                (<tr><td colSpan="8" className="text-center">No Rows to display</td></tr>)}

                    </tbody>
                        </Table>
                    </div>
                </div>)}
            </div>)
}