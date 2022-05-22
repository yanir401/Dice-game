import React, { Component } from "react";
import Buttons from "./Buttons";

export default class PopUp extends Component {
  render() {
    const { title, subTitle, content, btnText, btnFunc, winner } =
      this.props.content;
    return (
      <div className="popUp-container">
        <div className="popUp">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
          <h2>
            {content} {winner}
          </h2>
          <Buttons text={btnText} resetGame={btnFunc} />
        </div>
      </div>
    );
  }
}
