import React from "react";
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

export default class Next extends React.Component {
  static propTypes = {
    name: PropTypes.string,  // label of the button 
    clickHandler: PropTypes.func, // function to store when it is clicked
    currentTab: PropTypes.string,
    nextTab:    PropTypes.string,
    prevTab:    PropTypes.string,
  };

  handleClick = () => {
    this.nextTab.enable=true;
    // this.props.clickHandler(this.props.name);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} currentTab={this.currentTab} >{this.props.name}</Button>
      </div>
    );
  }
}