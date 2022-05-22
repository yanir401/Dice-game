import React, { Component } from "react";

export default class Buttons extends Component {
  handleOnClick = (event) => {
    if (event.target.innerText === "Hold") this.props.holdScore();
    else if (event.target.innerText === "New Game") this.props.resetGame();
    else if (event.target.innerText === "I will win anyway")
      this.props.resetGame();
    else {
      const dice1Value = Math.floor(Math.random() * 6 + 1);
      const dice2Value = Math.floor(Math.random() * 6 + 1);
      this.props.rollDice(dice1Value, dice2Value);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>{this.props.text}</button>
      </div>
    );
  }
}
