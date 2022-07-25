import React, {useState, useEffect} from "react";
import "./Report.style.css"
import { Table } from "react-bootstrap";
import { ExportToCsv } from 'export-to-csv';
import {
    Form,
    Row,
    Col,
    Button,
    Spinner,
    Alert,
  } from "react-bootstrap";

import {fetchReportTickets} from "../../api/ticketApi"

const initialFrmDt = {
    startDate: "",
    endDate: "",
    priority:"Low",
    status:"UnAssigned",
 
  };
  const initialFrmDtValid = {
      startDate: false,
      endDate: false,
      priority: false,
      status: false
    };


export const Report = () => {
   
    const [reportTickets, setReportTickets] = useState([])
    const [frmData, setFrmData] = useState(initialFrmDt);
    const [frmDtValid, setFrmDtValid] = useState(initialFrmDtValid);
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
     
    const csvExporter = new ExportToCsv(options);

    useEffect(() => {
        fetchReportTickets(frmData).then((result)=>{
          if( result.data.result.length && result.data.result[0]){
            setReportTickets(result.data.result);
          }
        })
      },[frmData]);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const newfrmData = Object.assign({},frmData)
        const newFrmDtValid = Object.assign({},frmDtValid)
        
        newfrmData[name] =  value
    
       
      
        newFrmDtValid.startDate = newfrmData.startDate.length > 0
        newFrmDtValid.endDate =  newfrmData.endDate.length > 0
        newFrmDtValid.priority = newfrmData.startDate.length > 0
        newFrmDtValid.status =  newfrmData.endDate.length > 0
         
        setFrmDtValid({...newFrmDtValid})
        setFrmData({...newfrmData});
        
      };

      const handleExport = (e)=>{
        csvExporter.generateCsv(reportTickets);
      }

    return (<div>
        <Form autoComplete="off">
            <Form.Group as={Row} className='mb-2'>
            <Form.Label column sm={3}>
                Start Date
            </Form.Label>
            <Col sm={5}>
                <Form.Control
                type="date"
                name="startDate"
                size="sm"
                isInvalid={ !frmDtValid.startDate}
                value={frmData.startDate}
                onChange={handleOnChange}
                required
                />
            </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
            <Form.Label column sm={3}>
                End Date
            </Form.Label>
            <Col sm={5}>
                <Form.Control
                type="date"
                name="endDate"
                size="sm"
                isInvalid={ !frmDtValid.endDate}
                value={frmData.endDate}
                onChange={handleOnChange}
                required
                />
            </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
                <Form.Label column sm={3}>Priority</Form.Label>
                <Col sm={5}>
                <Form.Control as="select" size="sm" name="priority"  
                    value={frmData.priority}
                    onChange={handleOnChange} required >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
                <Form.Label  column sm={3}>Status</Form.Label>
                <Col sm={5}>
                <Form.Control as="select" size="sm" name="status"  
                    value={frmData.status}
                    onChange={handleOnChange} required >
                    <option value="UnAssigned">UnAssigned</option>
                    <option value="Assigned">Assigned</option>
                </Form.Control>
                </Col>
            </Form.Group>
             <Button onClick={handleExport}>Excel Export</Button>
        </Form>
        <div> 
            <Table striped bordered hover>
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
                reportTickets.length ? (reportTickets.map(row => (<tr key={row._id}>
                    <td>
                        {row._id}
                    </td>
                    <td>{row.subject}</td>
                    <td>{row.status}</td>
                    <td>{row.updatedDate? ((new Date(row.updatedDate)).toLocaleDateString('en-US') +" "+ (new Date(row.updatedDate)).toLocaleTimeString('en-US')):''}</td>
                    <td>{row.updatedBy}</td>
                    <td>{row.priority}</td>
                </tr>
                ))) :
                    (<tr><td colSpan="8" className="text-center">No Rows to display</td></tr>)}

        </tbody>
            </Table>
        </div>
    </div>)
    }