import React, { useState, useEffect } from 'react';
import MultiStepForm from "./components/MultiStepForm";
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);


  return (
      <div className="container"> 

        <h2> Application to Generate Input Motions for NDAs</h2>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        <hr/>

        <MultiStepForm />


        




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