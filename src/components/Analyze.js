import React from "react";
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';

// import "./Button.css";

export default class Analyze extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    orange: PropTypes.bool,
    wide: PropTypes.bool,
    clickHandler: PropTypes.func,
  };

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    const className = [
      "component-button",
      this.props.orange ? "orange" : "",
      this.props.wide ? "wide" : "",
    ];

    return (
      <div className={className.join(" ").trim()}>
        <Button onClick={this.handleClick}>{this.props.name}</Button>
      </div>
    );
  }
}