import React, { Component } from 'react';
import Tab_1 from "./Tab_1";
import Tab_2 from "./Tab_2";
import Tab_3 from "./Tab_3";
import Tab_4 from "./Tab_4";

class Application extends Component {

    constructor(props) {
        super(props)
        // set the initial input values
        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip:'',
            date:'',
            whether_analyzed: 0,
        }

        // Bind the submission to handleChange() 
        this.handleChange = this.handleChange.bind(this)
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
        console. log(this.state)

    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    
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
                whether_analyzed : json.whether_analyzed
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
   
    handleChange = (event) => {
        const inputName  = event.target.name;
        const inputValue = event.target.value;
        // run the validation here 
        this.setState({[inputName]:inputValue});
    }

    render(){
        const { step, firstName, lastName, email, address, city, state, zip, date, whether_analyzed } = this.state;
        const inputValues = { firstName, lastName, email, address, city, state, zip, date, whether_analyzed };
        switch(step) {
        case 1:
            return <Tab_1
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
        case 2:
            return <Tab_2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
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