import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import { shortText } from '../../util/validation';

import { UpdateCompany } from '../update-company/UpdateCompany.page.js';

import { useParams } from 'react-router-dom';

import { fetchSingleCompany} from "../company-list/companiesAction";
import { resetResponseMsg, fetchCompanySuccess } from "../company-list/companiesSlice";

import {
  getSingleCompany, updateCompany
} from "../../api/companyApi"
const initialCompanyValid = {
  name: false,
};
const validateCompany = (newFrmDtValid, newCompany) => {
  if(newCompany){
  newFrmDtValid.name = shortText(newCompany.name)
  }
  return newFrmDtValid
}

export const Company = () => {
  const {cId} = useParams()
  const dispatch = useDispatch();
	const {
		isLoading,
		error,
		selectedCompany,
    replyMsg,
		replyCompanyError,
	} = useSelector(state => state.companies);

   
   const [company, setCompany] = useState(selectedCompany)
   let currentCompanyValid=initialCompanyValid 
   if(company){
   currentCompanyValid = validateCompany(initialCompanyValid, company)
  }
  
  const [companyValid, setCompanyValid] = useState(currentCompanyValid);
  
  useEffect(() => {
    getSingleCompany(cId).then((result)=>{
      if( result.data.result.length && result.data.result[0]){
      let sCompany = result.data.result[0]
      sCompany.updatedDate = new Date(newCompany.updatedDate).toISOString().slice(0,10)
      setCompany(sCompany)
      }
    })
    dispatch(fetchSingleCompany(cId))
    return () => {
			(replyMsg || replyCompanyError) && dispatch(resetResponseMsg());
		};
   
  },[cId, dispatch, replyMsg, replyCompanyError]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const newCompany = Object.assign({}, company)
    const newCompanyValid = Object.assign({}, companyValid)
    newCompany[name] = value
    const newFrmDtValid = validateCompany(newCompanyValid, newCompany)

    setCompanyValid({ ...newFrmDtValid })
    setCompany({ ...newCompany });

  };

  const handleOnSubmit = async(e) => {
    try{
    console.log("form data:", selectedCompany)
    await updateCompany(selectedCompany._id, company)
    console.log('Company saved submitted')
    }
    catch(error){
      console.log(error.message)
    }
  }
 
  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page='Company' />
        </Col>
      </Row>
      <Row>
				<Col>
					{isLoading && <Spinner variant="primary" animation="border" />}
					{error && <Alert variant="danger">{error}</Alert>}
					{replyCompanyError && (
						<Alert variant="danger">{replyCompanyError}</Alert>
					)}
					{replyMsg && <Alert variant="success">{replyMsg}</Alert>}
				</Col>
        </Row>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Company Name:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="name"
              value={company?company.name:''}
              isInvalid={!companyValid.name}
              onChange={handleOnChange}
              placeholder="Company Name"
              size="sm"
            />
          </Col>
          </Form.Group>
          <Form.Group>
          <Form.Label l column sm={2}>Status</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="status"
              value={company?company.status:'InActive'}
              onChange={handleOnChange} required >
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <UpdateCompany buttonDisabled={(Object.values(companyValid).includes(false)) } handleOnSubmit={handleOnSubmit}/>
            </Col>
          </Row>
        </Form.Group>
    </Container>
  )
}


