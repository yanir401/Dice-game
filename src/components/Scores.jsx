import React, { Component } from "react";

export default class Scores extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div>
          <h1>Score:{this.props.scores.playerData.score}</h1>
        </div>
        <div>
          <h1>
            Temporary Scroe:{this.props.scores.playerData.temporarayScore}
          </h1>
        </div>
      </div>
    );
  }
}
