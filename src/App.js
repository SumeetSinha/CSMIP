import React, { useState, useEffect } from 'react';
import Application from "./components/0_Application";
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);


  return (
      <div className="container"> 

        <h2> Generate Ground Moton for Nonlinear Deformation Analyses </h2>
        A web application for the development of input ground motions for nonlinear deformation analyses following the double convolution approach. The application is expected to facilitate and increase the use of ground motion seismic recordings by practitioners.        <hr/>

        <Application />


        




        <hr/>
        <h5> Refernces</h5>
        <ul>
        <li>Pretell-Ductram, A.R., Ziotopoulou, K., and Abrahamson, N. (2019). <i>Methodology for the development of input motions for nonlinear deformation analyses</i>. 7th International Conference on Earthquake Geotechnical Engineering, Rome, Italy.</li>
        </ul>

        <h5> Acknowledgements</h5>
        <p>The project was funded by California Strong Motion Instrumentation Program under the agreemnet number xxxxx.</p>

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