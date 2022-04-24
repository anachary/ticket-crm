import React,{useState, useEffect} from 'react'
import "./add-company-form.style.css";
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
import { openNewCompany } from "./addCompanyAction";
import { restSuccessMSg } from "./addCompanySlicer";


const initialFrmDt = {
  name: "",
  status:"InActive",
};
const initialFrmDtValid = {
  name: false,
  status:false,
  };

export const AddCompanyForm = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);


  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDtValid, setFrmDtValid] = useState(initialFrmDtValid);
  const [companySuccess,setCompanySuccess] = useState('')
  useEffect(() => {
  }, [dispatch, frmData, frmDtValid]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newfrmData = Object.assign({},frmData)
    const newFrmDtValid = Object.assign({},frmDtValid)
    
    newfrmData[name] =  value

   
    newFrmDtValid.name = shortText(newfrmData.name)
    newFrmDtValid.status = newfrmData.status.length>0
    
     
    setFrmDtValid({...newFrmDtValid})
    setFrmData({...newfrmData});
    
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
     dispatch(openNewCompany({ ...frmData }));
     setCompanySuccess('New Company is cretated.')
  };

  return (
     <div>
        <h1 className="text-center" style={{"color": "#005073"}}>Add New Company</h1>
      <hr />
      {companySuccess && <Alert>{companySuccess}</Alert>}
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
           Name
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="name"
              value={frmData.name}
              isInvalid={!frmDtValid.name}
              onChange={handleOnChange}
              placeholder="Company Name"
              size="sm"
            />
        </Col>    
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
            <Form.Label l column sm={3}>Status</Form.Label>
            <Col sm={5}>
            <Form.Control as="select" size="sm" name="status"  
                value={frmData.status}
                onChange={handleOnChange} required >
                <option value="InActive">InActive</option>
                <option value="Active">Active</option>
            </Form.Control>
            </Col>
        </Form.Group>
        <div className='mt-2 text-center'>
        <Button type="submit"  block size="sm" disabled={Object.values(frmDtValid).includes(false) }>
          Add New Company
        </Button>
        </div>
      </Form>
     </div>
  )
}
