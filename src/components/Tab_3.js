import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';


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
        return( 
          <Tabs id="CSMIP_Tabs" activeKey="Results" transition={false}>
            <Tab eventKey="Project_Information" title="Project Information" disabled/>
            <Tab eventKey="Ground_Motion" title="Select Ground Motion" disabled>
            </Tab>

            <Tab eventKey="Results" title="Results" disabled>
            <p></p>
            <Form>
                <Form.Group as={Row} controlId="ProjectName">
                  <Col sm={{ span: 2, offset: 0 }}>
                    <Form.Label> &nbsp;&nbsp; Tab_3Project Name </Form.Label>
                  </Col>
                  <Col sm={{ span: 3, offset: 0 }}>
                    <Form.Control type="text" placeholder="NewProject" defaultValue={this.props.inputValues.firstName} required onChange={this.props.handleChange}/>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Date">
                  <Col sm={{ span: 2, offset: 0 }}>
                    <Form.Label> &nbsp;&nbsp; Tab3Date </Form.Label>
                  </Col>
                  <Col sm={{ span: 3, offset: 0 }}>
                     <Form.Control type="Date" placeholder="Date" defaultValue={this.props.inputValues.lastName} required onChange={this.props.handleChange}/>
                  </Col>
                 </Form.Group>
                 <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
                 <Button variant="primary">Analyze</Button>
              </Form>
            </Tab>
          </Tabs>
        );
    }
}

export default Tab_3;