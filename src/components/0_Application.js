import React, { Component, useState } from 'react';
import Tab_1 from "./1_Soil_Profile";
import Tab_2 from "./2_Ground_Motion";
import Tab_3 from "./3_Analysis_Settings";
import Tab_4 from "./4_Results";

class Application extends Component {

    constructor(props) {
        super(props)
        // set the initial input values
        this.state = {
            step: 3,
            Depth_of_Interest:10, // Depth of Interest
            Tol: 2,              // error tolerance (%)
            MaxIter: 15,         // maximum number of iterations
            EffStrain: 0.65,     // effective strain ratio
            MaxFreq: 20,         // maximum frequency (Hz)
            WavFrac: 0.2,        // wavelength fraction 
            PGA: 0.17,           // peak ground acceleration
            PGV: 13.27,          // peak ground velocity
            FASFile: './FAS.txt',// FAS File
            FAS: [{"id": "FAS","data": [{"x":0.05, "y":0},{"x":1.049, "y":0.0299},{"x":2.048, "y":0.0316},{"x":3.047, "y":0.031},{"x":4.046, "y":0.029},{"x":5.045, "y":0.0264625},{"x":6.044, "y":0.02419},{"x":7.043, "y":0.022034},{"x":8.042, "y":0.01976333},{"x":9.041, "y":0.01773167},{"x":10.04, "y":0.01586},{"x":11.039, "y":0.014222},{"x":12.038, "y":0.012762},{"x":13.037, "y":0.011363},{"x":14.036, "y":0.010264},{"x":15.035, "y":0.009205},{"x":16.034, "y":0.008316},{"x":17.033, "y":0.007467},{"x":18.032, "y":0.0066756},{"x":19.031, "y":0.0059976},{"x":20.03, "y":0.005396},{"x":21.029, "y":0.0047984},{"x":22.028, "y":0.0042688},{"x":23.027, "y":0.00381055},{"x":24.026, "y":0.0034118},{"x":25.025, "y":0.0030225},{"x":26.024, "y":0.0027056},{"x":27.023, "y":0.00240425},{"x":28.022, "y":0.0021556},{"x":29.021, "y":0.0019158},{"x":30.02, "y":0.001706},{"x":31.019, "y":0.00153715},{"x":32.018, "y":0.0013664},{"x":33.017, "y":0.00122245},{"x":34.016, "y":0.0010884},{"x":35.015, "y":0.00097905},{"x":36.014, "y":0.00087088},{"x":37.013, "y":0.00077557},{"x":38.012, "y":0.00069553},{"x":39.011, "y":0.00061897},{"x":40.01, "y":0.00055443},{"x":41.009, "y":0.00049555},{"x":42.008, "y":0.00044196},{"x":43.007, "y":0.00039703},{"x":44.006, "y":0.00035576},{"x":45.005, "y":0.00031815},{"x":46.004, "y":0.0002832},{"x":47.003, "y":0.00025418},{"x":48.002, "y":0.00022595},{"x":49.001, "y":0.00020298},{"x":50, "y":0.000181}]},], // FAS File Contents
            AccelTransferFunctionOutput:[{"id": "AccelTransferFunctionOutput","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},], // AccelTransferFunctionOutput at depth of interest
            whether_analyzed: 0, // Whether analysis is performed
            ResultsFile: [{"id": "FAS","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},],
            SoilLayers1: [{Name: 'Layer 1',Thickness: 10, Vs: 150, Gamma: 18, Damping: 0.5, Soil_Model: 2},
                          {Name: 'Layer 2',Thickness: 20, Vs: 250, Gamma: 20, Damping: 0.5, Soil_Model: 1},
                          {Name: 'Layer 3',Thickness: 20, Vs: 100, Gamma: 18, Damping: 0.5, Soil_Model: 2},
                          {Name: 'Layer 4',Thickness: 20, Vs: 100, Gamma: 20, Damping: 0.5, Soil_Model: 1},
                          {Name: 'Bedrock',Thickness: 1, Vs: 760, Gamma: 22, Damping: 1, Soil_Model: 1},], // Soil Layer 1 

            SoilLayers2: [{Name: 'Layer 1',Thickness: 10, Vs: 20, Gamma: 20, Damping: 20, Soil_Model: 1},
                         {Name: 'Bedrock',Thickness: 5, Vs: 20, Gamma: 20, Damping: 20, Soil_Model: 1},] // Soil Layer 2
        }

        // Bind the submission to handleChange() 
        this.handleChange = this.handleChange.bind(this)
    }

    
    // function to update the step by 1
    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
        console. log(this.state)

    }

    // function to decrement the step by 1
    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    
    // function when analyze button is clicked
    Analyze = () => {
        const { step } = this.state
        this.setState({
            whether_analyzed : 1
        })
        fetch('http://localhost:5000/analyze',
            {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
        .then(response => response.json())
        .then(json => {
            console. log(json);
            this.setState({
                whether_analyzed : json.whether_analyzed,
                AccelTransferFunctionOutput : json.AccelTransferFunctionOutput,
                ResultsFile : json.ResultsFile
            })
            console. log(this.state);

            if (this.state.whether_analyzed == 2){
                this.setState({
                    step : step + 1,
                    whether_analyzed : 0
                })
            }           
        })
        .catch(error => console. log(error));
    }

    // // 

    // process = (dataString) => {
    //     var lines = dataString
    //     .split (/\n/)
    //     .map(function(lineStr) {
    //         return lineStr.split(",");
    //     })
    //     .slice(1);

    //     return JSON.stringify(lines,null,2);
    // }
  
    // function to handle update of values in form 
    handleChange = (event) => {
        const inputName  = event.target.name;
        const inputValue = event.target.value;
        // run the validation here 
        this.setState({[inputName]:inputValue});
    }

    // function to handle upload of FAS file
    handleFile = (event) => {
        const inputName  = event.target.name;
        const inputValue = event.target.value;
        // run the validation here 
        // console.log(event.target.files)

        var file = event.target.files[0]; 
        const { photoList } = this.state;

        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) { 
                var contents = e.target.result;
                var lines = contents
                .split("\r\n")
                .map(function(lineStr) {
                    return lineStr.split(",");
                })
                lines = lines.map(function(elem){
                    return elem.map(function(elem2){
                        return parseFloat(elem2)
                    })
                })
                .slice(0);

                // convert array to jason
                var keys = ["x","y"];
                var jasonData = [],
                data = lines,
                cols = keys,
                m = cols.length;
                for (var i=0; i<data.length; i++) {
                    var d = data[i],
                            o = {};
                    for (var j=0; j<m; j++)
                            o[cols[j]] = d[j];
                    jasonData.push(o);
                }

                jasonData = [{
                            "id": "FAS",
                            "data": jasonData
                            },
                            ]

                this.setState({FAS:jasonData});
                console. log(jasonData)
                console. log(this.state.FAS)
            }.bind(this)
            reader.readAsText(file);
        } else { 
            alert("Failed to load file");
        }
        this.setState({[inputName]:file});
    }

    // function to update soil layered profile 1
    updateSoilLayers1 = (newData) => {
        this.setState({SoilLayers1:newData});
    }

    // function to update soil layered profile 2
    updateSoilLayers2 = (newData) => {
        this.setState({SoilLayers2:newData});
    }

    render(){
        const { step, Tol, MaxIter,  EffStrain, MaxFreq, WavFrac, PGA, PGV, FASFile, FAS, Depth_of_Interest, whether_analyzed, SoilLayers1, SoilLayers2, AccelTransferFunctionOutput,ResultsFile} = this.state;
        const inputValues = { Tol, MaxIter, EffStrain, MaxFreq, WavFrac, PGA, PGV, FASFile, FAS, Depth_of_Interest, whether_analyzed, SoilLayers1, SoilLayers2, AccelTransferFunctionOutput,ResultsFile};
               
        switch(step) {
        case 1:
            return <Tab_1
                    nextStep={this.nextStep}
                    handleChange = {this.updateSoilLayers1}
                    inputValues={inputValues}
                    />
        case 2:
            return <Tab_2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    handleFile = {this.handleFile}
                    inputValues={inputValues}
                    />
        case 3:
            return <Tab_3
                    nextStep={this.Analyze}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
        case 4:
            return <Tab_4
                // nextStep={this.Analyze}
                prevStep={this.prevStep}
                inputValues={inputValues}
                handleChange = {this.handleChange}
                />
        }
    }
}

export default Application;