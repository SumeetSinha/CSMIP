import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';


class Results extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        return( 
          <Tabs id="CSMIP_Tabs" activeKey="Results" transition={false}>
            <Tab eventKey="Project_Information" title="Project Information" disabled/>
            <Tab eventKey="Ground_Motion" title="Select Ground Motion" disabled/>
            <Tab eventKey="Analyze" title="Analyze" disabled/>
            <Tab eventKey="Results" title="Results" disabled>
            <p></p>
            <Form  onSubmit={this.saveAndContinue} validated>
              <Form.Group as={Row} controlId="Date">
                <Col sm={{ span: 3, offset: 0 }}><Form.Label> &nbsp;&nbsp; Error Tolerance (%) </Form.Label></Col>
                <Col sm={{ span: 2, offset: 0 }}><Form.Control type="text" name = "Tol" defaultValue={this.props.inputValues.Tol} required onChange={this.props.handleChange}/></Col>
              </Form.Group> 
                 <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
                 <Button variant="primary" >Download Results</Button>{' '}
                 <a href='/public/logo.png' target="_blank" download> Click to download</a>

                 {/* <Button variant="primary" type="Submit">Analyze</Button> */}
              </Form>
            </Tab>
          </Tabs>
        );
    }
}

export default Results;