import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Spinner, Alert,  Button } from "react-bootstrap";
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb.comp'
import { shortText } from '../../util/validation';

import { useParams } from 'react-router-dom';

import { fetchSingleCompany } from "../company-list/companiesAction";
import { resetResponseMsg, fetchSingleCompanySuccess, fetchSingleCompanyFail } from "../company-list/companiesSlice";

import { CompanyUserTable } from "../../components/company-user-table/CompanyUserTable.comp";

import {
  getSingleCompany, updateCompany
} from "../../api/companyApi"
const initialCompanyValid = {
  name: false,
};
const validateCompany = (newFrmDtValid, newCompany) => {
  if (newCompany) {
    newFrmDtValid.name = shortText(newCompany.name)
  }
  return newFrmDtValid
}

export const Company = () => {
  const { cId } = useParams()
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    selectedCompany,
  
  } = useSelector(state => state.companies);


  const [company, setCompany] = useState(selectedCompany)
  const [replyCompanyError,setReplyCompanyError] = useState('')
  const [replyMsg, setReplyMsg] = useState('')
  
  let currentCompanyValid = initialCompanyValid
  if (company) {
    currentCompanyValid = validateCompany(initialCompanyValid, company)
  }

  const [companyValid, setCompanyValid] = useState(currentCompanyValid);

  useEffect(() => {
    getSingleCompany(cId).then((result)=>{
      if (result.data.result.length && result.data.result[0]) {
        let sCompany = result.data.result[0]
        sCompany.updatedDate = new Date(sCompany.updatedDate).toISOString().slice(0, 10)
        setCompany(sCompany)
      }
    })
  }, [cId]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const newCompany = Object.assign({}, company)
    const newCompanyValid = Object.assign({}, companyValid)
    newCompany[name] = value
    const newFrmDtValid = validateCompany(newCompanyValid, newCompany)

    setCompanyValid({ ...newFrmDtValid })
    setCompany({ ...newCompany });

  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log("form data:", selectedCompany)
      await updateCompany(company._id, company)
      setReplyMsg('Company has been updated')
    }
    catch (error) {
      console.log(error.message)
      setReplyCompanyError(error.message)
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
          {replyCompanyError && (
            <Alert variant="danger">{replyCompanyError}</Alert>
          )}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Form  autoComplete="off"  onSubmit={handleOnSubmit} >
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>
            Company Name:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="name"
              value={company ? company.name : ''}
              isInvalid={!companyValid.name}
              onChange={handleOnChange}
              placeholder="Company Name"
              size="sm"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={2}>Status</Form.Label>
          <Col sm={4}>
            <Form.Control as="select" size="sm" name="status"
              value={company ? company.status : 'InActive'}
              onChange={handleOnChange} required >
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <div className='text-center width=100% mt-4'>
                <Button type="submit" disabled={(Object.values(companyValid).includes(false))}>Save Company</Button>
              </div>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      <div>
        <CompanyUserTable companyName={company ? company.name : ''} />
      </div>
    </Container>
  )
}


