import React,{useState, useEffect} from 'react'
import { Row, Col, Form,Button } from 'react-bootstrap'
import "./add-ticket-form.style.css";
import "../../App.css"

const initialFrmDt = {
  subject: "",
  issueDate: "",
  message: "",
  priority:"Low"
};

export const AddTicketForm = ({handleOnSubmit}) => {

  const [frmData, setFrmData] = useState(initialFrmDt);

  useEffect(() => {
    return () => {
    };
  }, [frmData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
  };
  const handleOnSubmit =(e)=>{
    console.log("Form submit request received",frmData)
  }

  return (
     <div>
        <h1 className="fc-text-center">Add New Ticket</h1>
      <hr />
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={frmData.subject}
              maxLength="100"
              onChange={handleOnChange}
              placeholder="Subject"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmData.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
            <Form.Label l column sm={3}>Priority</Form.Label>
            <Col sm={9}>
            <Form.Control as="select" size="sm" name="priority"  
                value={frmData.priority}
                onChange={handleOnChange} required >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </Form.Control>
            </Col>
        </Form.Group>
        <Form.Group  as={Row} className='mb-1'> 
          <Form.Label>Descriptions</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            className='ml-1 mr-1'
            value={frmData.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <div className='mt-2 text-center'>
        <Button type="submit"  block>
          Open Ticket
        </Button>
        </div>
      </Form>
     </div>
  )
}
