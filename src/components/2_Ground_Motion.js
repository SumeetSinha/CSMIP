import React, { Component } from 'react';
import { Form, Button, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from "@nivo/bar";


class Ground_Motion extends Component{

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
        // const data = [
        //   { quarter: 1, earnings: 13000 },
        //   { quarter: 2, earnings: 16500 },
        //   { quarter: 3, earnings: 14250 },
        //   { quarter: 4, earnings: 19000 }
        // ];

        // const data = [{"id": "FAS",
        //                 "data": [{"x" :1, "y":2},{"x" :2, "y":5}]
        //               },
        //              ]

        const data =  this.props.inputValues.FAS

        console.log(data)
        return( 
          <Tabs id="CSMIP_Tabs" activeKey="Ground_Motion" transition={false}>
            <Tab eventKey="Soil_Profile" title="Soil Profile" disabled />
            <Tab eventKey="Ground_Motion" title="Select Ground Motion">
            <p></p>
            <Form  onSubmit={this.saveAndContinue} validated>

              {/* <Form.Group as={Row} controlId="Date">
                <Col sm={{ span: 3, offset: 0 }}><Form.Label> &nbsp;&nbsp; PGA (g) </Form.Label></Col>
                <Col sm={{ span: 2, offset: 0 }}><Form.Control type="text" name = "PGA" defaultValue={this.props.inputValues.PGA} required onChange={this.props.handleChange}/></Col>
              </Form.Group>

              <Form.Group as={Row} controlId="Date">
                <Col sm={{ span: 3, offset: 0 }}><Form.Label> &nbsp;&nbsp; PGV (cm/s) </Form.Label></Col>
                <Col sm={{ span: 2, offset: 0 }}><Form.Control type="text" name = "PGV" defaultValue={this.props.inputValues.PGV} required onChange={this.props.handleChange}/></Col>
              </Form.Group> */}

              <Form.Group as={Row} controlId="Date">
               <Col sm={{ span: 4, offset: 0 }}><Form.Label> &nbsp;&nbsp; Upload Frequency Amplitude Spectrum </Form.Label></Col>
               <Col sm={{ span: 4, offset: 0 }}><Form.Control type="file" name ="FASFile" accept=".txt" required onChange={this.props.handleFile} /></Col>
              </Form.Group>

              

              <div style={{ height: "400px" }}>
               {/* <ResponsiveBar data={data} keys={["earnings"]} indexBy="quarter" /> */}

                <ResponsiveLine
                  data={data}
                  margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
                  xScale={{ type: 'log', base: 10, max: 'auto' }}
                  // yScale={{ type: 'log', base: 10, max: 'auto' }}
                  axisBottom={{ orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Frequency (Hz)', legendOffset: 36, legendPosition: 'middle', tickRotation: -90,  tickValues: [0.01, 0.1, 1.0, 10]}}
                  axisTop={{ orient: 'top', tickSize: 5, tickValues: [0.01, 0.1, 1.0, 10]}}
                  axisLeft={{ orient: 'left', tickSize: 5,  tickRotation: 0, legend: 'Fourier Amplitude (g-s)', legendOffset: -60, legendPosition: 'middle',}}
                  axisRight={{ orient: 'right', tickSize: 5,  tickRotation: 0}}
                  colors={{ scheme: 'category10' }}
                  enablePoints={false}
                  useMesh={true}
               />
              </div>

              <p> </p>
              <Button variant="secondary" onClick={this.back}>Back</Button> {' '}
              <Button variant="primary" type="submit">Next</Button>
              </Form>
            </Tab>
            <Tab eventKey="Analyze" title="Analysis Settings" disabled/>
            <Tab eventKey="Results" title="Results" disabled/>
          </Tabs>
        );
    }
}

{/* <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
{whether_analyzed ? (<Button variant="primary" type="Submit"><Spinner as="span" animation="grow" size="sm" animation="border"/> Analyze</Button>) : 
  (<Button variant="primary" type="Submit">Analyze</Button>)
} */}

export default Ground_Motion;