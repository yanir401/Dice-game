import React, { Component } from "react";
import Scores from "./Scores";
import "../App.css";
export default class Players extends Component {
  state = { score: "123", temporarayScore: "123" };

  componentDidMount() {
    const player = this.props.currentlyPlaying;
  }

  render() {
    return (
      <div className="flex flex-col">
        <h1>{this.props.playerData.player}</h1>
        <Scores scores={this.props} />
      </div>
    );
  }
}
