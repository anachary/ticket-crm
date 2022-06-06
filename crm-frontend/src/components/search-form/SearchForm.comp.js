import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { filterSerachTicket } from "../../pages/ticket-list/ticketsAction";
import { Form, Row, Col } from 'react-bootstrap'

export const SearchForm = () => {
  const dispatch = useDispatch();
  
  const initialSearch = {
    'status':'',
    'assignedTo':'',
    'priority':'',
    'subject':''
  }

  const [search, setSearch] = useState(initialSearch)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let newSearch = {...search}
    newSearch[name] = value
    dispatch(filterSerachTicket(newSearch));
    setSearch(newSearch)
  };

  return (
    <div style={{ display: 'flex', justifyContent:'space-between'}}>
      <div>
        <div>Subject:</div>
        <div>
          <input type='text'
            name="subject"
            className='p-1'
            onChange={handleOnChange}
            placeholder='Search ...'
          />
        </div>
      </div>
      <div>
        <div>Status:</div>
        <div>
          <select 
            name="status"
            className='p-1'
            fullMatch={true}
            onChange={handleOnChange}
            placeholder='Search ...'
          >
            <option selected value =""> -- search by status -- </option>
            <option value="UnAssigned">UnAssigned</option>
            <option value="Assigned">Assigned</option>
            <option value="InProgress">InProgress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
      <div>
        <div>Assigned To:</div>
        <div>
        <input type='text'
          name="assignedTo"
          className='p-1'
          onChange={handleOnChange}
          placeholder='Search ...'
        />
        </div>
      </div>
      <div>
        <div>Priority:</div>
        <div>
          <select 
            name="priority"
            className='p-1'
            fullMatch={true}
            onChange={handleOnChange}
            placeholder='Search ...'
          >
            <option selected value=""> -- search by priority -- </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  )
}