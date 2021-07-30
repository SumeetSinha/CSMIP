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
            Tol: 2,              // error tolerance (%)
            MaxIter: 15,         // maximum number of iterations
            EffStrain: 0.65,     // effective strain ratio
            MaxFreq: 20,         // maximum frequency (Hz)
            WavFrac: 0.2,        // wavelength fraction 
            PGA: 0.17,           // peak ground acceleration
            PGV: 13.27,          // peak ground velocity
            FASFile: './FAS.txt',// FAS File
            FAS: [{"id": "FAS","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},], // FAS File Contents
            Depth_of_Interest:10, // Depth of Interest
            AccelTransferFunctionOutput:[{"id": "AccelTransferFunctionOutput","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},], // AccelTransferFunctionOutput at depth of interest
            whether_analyzed: 0, // Whether analysis is performed
            ResultsFile: [{"id": "FAS","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},],
            SoilLayers1: [{Name: 'Layer 1',Thickness: 10, Vs: 150, Gamma: 18, Damping: 0.5, G_Gmax_Model: 2, Damp_Model: 2},
                          {Name: 'Layer 2',Thickness: 20, Vs: 250, Gamma: 20, Damping: 0.5, G_Gmax_Model: 1, Damp_Model: 1},
                          {Name: 'Layer 3',Thickness: 20, Vs: 0, Gamma: 18, Damping: 0.5, G_Gmax_Model: 2, Damp_Model: 2},
                          {Name: 'Layer 4',Thickness: 20, Vs: 0, Gamma: 20, Damping: 0.5, G_Gmax_Model: 1, Damp_Model: 1},
                          {Name: 'Bedrock',Thickness: -1, Vs: 760, Gamma: 22, Damping: 1, G_Gmax_Model: -1, Damp_Model: -1},], // Soil Layer 1 

            SoilLayers2: [{Name: 'Layer 1',Thickness: 10, Vs: 20, Gamma: 20, Damping: 20, G_Gmax_Model: 1, Damp_Model: 1},
                         {Name: 'Bedrock',Thickness: 5, Vs: 20, Gamma: 20, Damping: 20, G_Gmax_Model: 1, Damp_Model: 1},] // Soil Layer 2
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