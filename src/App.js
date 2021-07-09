import React, { useState, useEffect } from 'react';

// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'
// import Tabs from "./components/Tabs"; 
// import Form from 'react-bootstrap/Form'
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
    <div className="App">
      <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>The current time is {currentTime}.</p>
        <p>Tabs Demo</p>
      </header>
      {/* <Buttom variant="primary"> Bootstrap </Buttom> */}
    </div>
  );
}

export default App;