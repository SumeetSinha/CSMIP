import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';


class Tab_1 extends Component{

    back  = (e) => {
      e.preventDefault();
      this.props.prevStep();
    }

    saveAndContinue = (e) => {
      e.preventDefault();
      this.props.nextStep();

    };

    // background-color: gray;
    // color: white;

    render() {
        return( 
          <Tabs id="CSMIP_Tabs" transition={false}>
               <Tab eventKey="Project_Information" title="Project Information" >
              <p></p>
              <Form validated onSubmit={this.saveAndContinue} validated>
                <Form.Group as={Row} controlId="Date">
                  <Col sm={{ span: 2, offset: 0 }}>
                    <Form.Label> &nbsp;&nbsp; First Name </Form.Label>
                  </Col>
                  <Col sm={{ span: 3, offset: 0 }}>
                     <Form.Control type="text" name = "firstName" defaultValue={this.props.inputValues.lastName} required onChange={this.props.handleChange}/>
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

                {/* <Button variant="primary" onClick={this.saveAndContinue} type="submit">Next</Button> */}
             
                <Button variant="primary" type="submit">Next</Button>
              </Form>

              
            </Tab>
          <Tab eventKey="Ground_Motion" title="Select Ground Motion" disabled/>
          <Tab eventKey="Results" title="Results" disabled/>
          </Tabs>
        );
    }
}

export default Tab_1;