import React,{useState, useEffect} from 'react'
import "./add-ticket-form.style.css";
import "../../App.css"
import { shortText  } from '../../util/validation';
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { openNewTicket } from "./addTicketAction";
import { restSuccessMSg } from "./addTicketSlicer";
import { useNavigate } from 'react-router-dom';
import { getCompanyUsers } from "../../api/userApi.js"



const initialFrmDt = {
  subject: "",
  issueDate: "",
  description: "",
  priority:"Low",
  status:"UnAssigned",
  assignedTo:"",
  assignedDate:""
};
const initialFrmDtValid = {
    subject: false,
    issueDate: false,
    description: false,
    assignedTo:true ,
    assignedDate:true,
  };

export const AddTicketForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {
  //   user: { name },
  // } = useSelector((state) => state.user);

  const {user, socket} = useSelector(state=>state.user)
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDtValid, setFrmDtValid] = useState(initialFrmDtValid);
  const [companyUsers, setCompanyUsers] = useState([])
  useEffect (()=>{
    getCompanyUsers().then((result)=>{
      const companyUsers = result.users ? result.users.filter(v=>v.company === user.company):[]
      setCompanyUsers(companyUsers)
    })
  },[])
  useEffect(() => {
  }, [dispatch, frmData, frmDtValid]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newfrmData = Object.assign({},frmData)
    const newFrmDtValid = Object.assign({},frmDtValid)
    
    newfrmData[name] =  value

   
    newFrmDtValid.subject = shortText(newfrmData.subject)
    newFrmDtValid.issueDate = newfrmData.issueDate.length > 0
    newFrmDtValid.description =  newfrmData.description.length > 0
    newFrmDtValid.assignedTo = (newfrmData.status !== "Assigned")||(newfrmData.assignedTo && newfrmData.assignedTo.length>0)
    newFrmDtValid.assignedDate=(newfrmData.status !== "Assigned")||(newfrmData.assignedDate && newfrmData.assignedDate.length>0)
     
    setFrmDtValid({...newFrmDtValid})
    setFrmData({...newfrmData});
    
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
     dispatch(openNewTicket({ ...frmData, sender: user.name }));
     navigate("/dashboard")
  };

  return (
     <div>
        <h1 className="text-center" style={{"color": "#005073"}}>Add New Ticket</h1>
      <hr />
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
           Subject
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="subject"
              value={frmData.subject}
              isInvalid={!frmDtValid.subject}
              onChange={handleOnChange}
              placeholder="Subject"
              size="sm"
            />
        </Col>    
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="date"
              name="issueDate"
              size="sm"
              isInvalid={ !frmDtValid.issueDate}
              value={frmData.issueDate}
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
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
         Assigned To
          </Form.Label>
           <Col sm={5}>
             <Form.Control as="select" size="sm" name="assignedTo"
                value={frmData.assignedTo}
                isInvalid={ !frmDtValid.assignedTo}
                placeholder="Assigned To"
                onChange={handleOnChange}>
                {companyUsers.map(v=>(<option value={v.email}>{v.email}</option>))}
              </Form.Control>
          </Col>  
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
         Assigned Date 
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="assignedDate"
              type="date"
              value={frmData.assignedDate}
              isInvalid={ !frmDtValid.assignedDate}
              onChange={handleOnChange}
              size="sm"
            />
        </Col>    
        </Form.Group>


        <Form.Group  as={Row} className='mb-2'> 
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="12"
            className='ml-1 mr-1'
            value={frmData.description}
            onChange={handleOnChange}
            size="sm"
            isInvalid={ !frmDtValid.description}
          />
        </Form.Group>
        <div className='mt-2 text-center'>
        <Button type="submit" block="true" size="sm" disabled={Object.values(frmDtValid).includes(false) }>
          Open Ticket
        </Button>
        </div>
      </Form>
     </div>
  )
}
