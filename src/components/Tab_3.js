import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Tabs, Tab, Spinner } from 'react-bootstrap';


class Tab_3 extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const whether_analyzed = this.props.inputValues.whether_analyzed;
        return( 
          <Tabs id="CSMIP_Tabs" activeKey="Analyze" transition={false}>
            <Tab eventKey="Project_Information" title="Project Information" disabled/>
            <Tab eventKey="Ground_Motion" title="Select Ground Motion" disabled/>
            <Tab eventKey="Analyze" title="Analyze" disabled>
            <p></p>
            <Form  onSubmit={this.saveAndContinue} validated>
                <Form.Group as={Row} controlId="ProjectName">
                  <Col sm={{ span: 2, offset: 0 }}>
                    <Form.Label> &nbsp;&nbsp; First Name </Form.Label>
                  </Col>
                  <Col sm={{ span: 3, offset: 0 }}>
                  <Form.Control type="text" name = "firstName" defaultValue={this.props.inputValues.firstName} required onChange={this.props.handleChange}/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Date">
                  <Col sm={{ span: 2, offset: 0 }}>
                    <Form.Label> &nbsp;&nbsp; Last Name </Form.Label>
                  </Col>
                  <Col sm={{ span: 3, offset: 0 }}>
                    <Form.Control type="text" name = "lastName" defaultValue={this.props.inputValues.lastName} required onChange={this.props.handleChange}/>
                  </Col>
                </Form.Group>
                <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
                {whether_analyzed ? (<Button variant="primary" type="Submit"><Spinner as="span" animation="grow" size="sm" animation="border"/> Analyze</Button>) : 
                  (<Button variant="primary" type="Submit">Analyze</Button>)
                }
              </Form>
            </Tab>
            <Tab eventKey="Results" title="Results" disabled/>
          </Tabs>
        );
    }
}

export default Tab_3;