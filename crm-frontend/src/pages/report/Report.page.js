import React, {useState, useEffect} from "react";
import "./Report.style.css"
import { Table, Container } from "react-bootstrap";
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
import { faMagic } from "@fortawesome/free-solid-svg-icons";

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
            let reportlist = []
            if(result.data.result){
                reportlist = result.data.result
            }
             if(reportlist && frmData.status){
                reportlist= reportlist.filter(v=>v.status === frmData.status)
             }
             if(reportlist && frmData.priority){
                reportlist= reportlist.filter(v=>v.priority === frmData.priority)
             }
            setReportTickets(reportlist);

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
        <Container className="m-3">
            <Form.Group as={Row} className='mb-2'>
            <Form.Label column sm={2}>
                Start Date
            </Form.Label>
            <Col column sm={4} >
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
            <Form.Label column sm={2}>
                End Date
            </Form.Label>
            <Col column sm={4}>
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
             <Form.Label column sm={2}>Priority</Form.Label>
                <Col column sm={4}>
                <Form.Control as="select" size="sm" name="priority"  
                    value={frmData.priority}
                    onChange={handleOnChange} required >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Form.Control>
                </Col>
             <Form.Label column sm={2}>Status</Form.Label>
                <Col column sm={4}>
                <Form.Control as="select" size="sm" name="status"  
                    value={frmData.status}
                    onChange={handleOnChange} required >
                  <option value="UnAssigned">UnAssigned</option>
              <option value="Assigned">Assigned</option>
              <option value="InProgress">InProgress</option>
              <option value="Resolved">Resolved</option>
                </Form.Control>
                </Col>
            </Form.Group>
            
        </Container>
        <div className="d-flex justify-content-end m-1"> <Button onClick={handleExport}>Excel Export</Button></div>
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
                    <td>{row.assignedDate?((new Date(row.assignedDate)).toLocaleDateString('en-US') +" "+ (new Date(row.assignedDate)).toLocaleTimeString('en-US')):'' }</td>
                    <td>{row.priority}</td>
                    <td>{row.assignedTo}</td>
                </tr>
                ))) :
                    (<tr><td colSpan="10" className="text-center">No Rows to display</td></tr>)}

        </tbody>
            </Table>
        </div>
    </div>)
    }