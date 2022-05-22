import React, { Component } from "react";

export default class InputScore extends Component {
  handleChange = (e) => {
    this.props.setScore(e.target.value);
  };
  render() {
    return (
      <div>
        <input
          defaultValue={this.props.score}
          type="number"
          name="score"
          id="score"
          onChange={this.handleChange}
          value={this.props.score}
        />
      </div>
    );
  }
}
