import React, { Component } from "react";

export default class Dice extends Component {
  render() {
    return (
      <>
        <img
          src={require(`../assets/images/dice-${this.props.dice1Value}.png`)}
          width="50px"
          height="50px"
          alt="dice"
        />
        <img
          src={require(`../assets/images/dice-${this.props.dice2Value}.png`)}
          width="50px"
          height="50px"
          alt="dice"
        />
      </>
    );
  }
}
