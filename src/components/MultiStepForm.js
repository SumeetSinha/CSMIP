import React, { Component } from 'react';
import Tab_1 from "./Tab_1";
import Tab_2 from "./Tab_2";
import Tab_3 from "./Tab_3";

// import AddressDetails from "./AddressDetails";
// import Confirmation from "./Confirmation";

class MultiStepForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip:'',
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        const { step, firstName, lastName, email, address, city, state, zip } = this.state;
        const inputValues = { firstName, lastName, email, address, city, state, zip };
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
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    inputValues={inputValues}
                    />
        }
    }
}

export default MultiStepForm;