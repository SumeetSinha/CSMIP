import React, { useState, useEffect } from 'react';

import { Col, Row } from "react-bootstrap";


// import tab components
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
// import form components
import Form from 'react-bootstrap/Form'
import FormCheck from 'react-bootstrap/FormCheck'
import FormFile from 'react-bootstrap/FormFile'


import logo from './logo.svg';
import './App.css';

import { Button } from 'react-bootstrap';


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
      <div className="container"> 
        <h2> California Strong Motion Instrumentation Program – CSMIP APP</h2>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        <hr/>
        <Tabs id="CSMIP_Tabs" transition={false}>
   
          <Tab eventKey="Project_Information" title="Project Information">
            <p></p>
            <Form>
              <Form.Group as={Row} controlId="ProjectName">
                <Col sm={{ span: 2, offset: 0 }}>
                  <Form.Label> &nbsp;&nbsp; Project Name </Form.Label>
                </Col>
                <Col sm={{ span: 3, offset: 0 }}>
                  <Form.Control type="text" placeholder="New Project" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="Date">
                <Col sm={{ span: 2, offset: 0 }}>
                  <Form.Label> &nbsp;&nbsp; Date </Form.Label>
                </Col>
                <Col sm={{ span: 3, offset: 0 }}>
                  <Form.Control type="Date" placeholder="Date" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}> 
                <Col sm={{ span: 0, offset: 0 }}>
                &nbsp;&nbsp; <Button type="submit" disabled > &nbsp;&nbsp; Next &nbsp;&nbsp; </Button>
                </Col>
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="Input_Soil_Data" title="Input Soil Profile" disabled>
          </Tab>
          <Tab eventKey="Ground_Motion" title="Select Ground Motion" disabled>
            <p>this is setting tab</p>
          </Tab>
          <Tab eventKey="Results" title="Results" disabled>
            <p>this is profile tab</p>
          </Tab>
       
        </Tabs>
        <hr/>
        <h5> Refernces</h5>
        <ul>
        <li>1</li>
        </ul>

        <h5> Acknowledgements</h5>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>




   
    </div>
  );
}



// return (
//   <div className="App">
//     <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <p>The current time is {currentTime}.</p>
//       <p>Tabs Demo</p>
//       <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
//         <Tab eventKey="home" title="Home">
//         </Tab>
//         <Tab eventKey="profile" title="Profile">
//         </Tab>
//         <Tab eventKey="contact" title="Contact" disabled>
//         </Tab>
//       </Tabs>
//       <Button variant="primary"> Bootstrap </Button>
//     </header>
//   </div>
// );
// }

export default App;