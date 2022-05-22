import React, { Component } from "react";
import Players from "./components/Players";
import Buttons from "./components/Buttons";
import Dice from "./components/Dice";
import "./App.css";
import InputScore from "./components/InputScore";
import PopUp from "./components/PopUp";
export default class App extends Component {
  state = {
    winner: "",
    startPlayer: "",
    currentlyPlaying: "",
    players: [
      {
        player: "Player 1",
        score: 0,
        temporarayScore: 0,
        isDoubleSix: false,
        isRolled: false,
      },
      {
        player: "Player 2",
        score: 0,
        temporarayScore: 0,
        isDoubleSix: false,
        isRolled: false,
      },
    ],
    dice1Value: -1,
    dice2Value: -1,
    score: 100,
    showPopUp: false,
    isDoubleSix: false,
    isRolledAnimation: false,
  };

  componentDidMount() {
    const playerStart = Math.floor(Math.random() * 2 + 1);
    this.setState(() => {
      return { currentlyPlaying: playerStart };
    });
  }

  isWinner = (players, index) => {
    const scoreTarget = this.state.score;
    if (players[index].score === scoreTarget)
      this.setState(() => {
        return { winner: players[index], showPopUp: true };
      });
    else if (players[index].score > scoreTarget) {
      if (index === 0)
        this.setState(() => {
          return { winner: players[index + 1], showPopUp: true };
        });
      else
        this.setState(() => {
          return { winner: players[index - 1], showPopUp: true };
        });
    }
  };

  rollDice = (dice1, dice2) => {
    // add if double six
    const playersArray = [...this.state.players];

    if (dice1 === 6 && dice2 === 6) {
      const changeCurrentPlayer = this.state.currentlyPlaying === 1 ? 2 : 1;
      playersArray[this.state.currentlyPlaying - 1].temporarayScore = 0;
      this.setState({
        isDoubleSix: true,
        showPopUp: true,
        players: playersArray,
        currentlyPlaying: changeCurrentPlayer,
        dice1Value: dice1,
        dice2Value: dice2,
      });

      this.showPopUp();
    } else {
      playersArray[this.state.currentlyPlaying - 1].temporarayScore +=
        dice1 + dice2;
      playersArray[this.state.currentlyPlaying - 1].isRolled = true;
      this.setState(() => {
        return {
          dice1Value: dice1,
          dice2Value: dice2,
          players: playersArray,
        };
      });
    }
  };

  holdScore = () => {
    const playersArray = [...this.state.players];
    if (playersArray[this.state.currentlyPlaying - 1].isRolled) {
      playersArray[this.state.currentlyPlaying - 1].score +=
        playersArray[this.state.currentlyPlaying - 1].temporarayScore;
      playersArray[this.state.currentlyPlaying - 1].temporarayScore = 0;
      playersArray[this.state.currentlyPlaying - 1].isRolled = false;
      const changeCurrentPlayer = this.state.currentlyPlaying === 1 ? 2 : 1;
      this.setState({
        players: playersArray,
        currentlyPlaying: changeCurrentPlayer,
        isRolled: false,
      });

      this.isWinner(playersArray, this.state.currentlyPlaying - 1);
    }
  };

  setScore = (score) => {
    this.resetGame();
    this.setState({ score: score });
  };
  resetGame = () => {
    const playerStart = Math.floor(Math.random() * 2 + 1);

    this.setState(() => {
      return {
        winner: "",
        startPlayer: "",
        currentlyPlaying: playerStart,
        players: [
          {
            player: "Player 1",
            score: 0,
            temporarayScore: 0,
            isDoubleSix: false,
            isRolled: false,
          },
          {
            player: "Player 2",
            score: 0,
            temporarayScore: 0,
            isDoubleSix: false,
            isRolled: false,
          },
        ],
        dice1Value: -1,
        dice2Value: -1,
        score: 100,
        showPopUp: false,
      };
    });
  };

  popUpMessage = {
    win: {
      title: "Game Over",
      subTitle: "You Lose",
      content: "The Winner is:",
      btnText: "New Game",
      btnFunc: this.resetGame,
      winner: this.state.winner,
    },
    doubleSix: {
      title: "Oh No !!!",
      subTitle: "You Got a Double Six",
      content: "You lost theTemporary score and your turn :(",
      btnText: "I will win anyway",
      btnFunc: () => this.setState({ showPopUp: false }),
    },
  };
  showPopUp = () => {
    let popUpProps = "";
    if (this.state.winner !== "") {
      this.popUpMessage.win.winner = this.state.winner.player;
      if (this.state.winner.score === this.state.score)
        this.popUpMessage.win.subTitle = "You Won";
      popUpProps = "win";
    } else popUpProps = "doubleSix";

    return <PopUp content={this.popUpMessage[popUpProps]} />;
  };
  render() {
    return (
      <div className="container">
        <div
          className={`flex flex-row ${
            this.state.currentlyPlaying === 1 ? "first-player" : "second-player"
          }`}
        >
          {this.state.players.map((player, index) => {
            return (
              <Players
                playerData={player}
                key={index}
                currentlyPlaying={this.state.currentlyPlaying}
              />
            );
          })}
        </div>
        <div className="dice">
          {this.state.dice1Value > -1 ? (
            <Dice
              dice1Value={this.state.dice1Value}
              dice2Value={this.state.dice2Value}
            />
          ) : null}
        </div>
        <div className="options">
          <Buttons text="Roll Dice" rollDice={this.rollDice} />
          <Buttons text="Hold" holdScore={this.holdScore} />
          <Buttons text="New Game" resetGame={this.resetGame} />
          <InputScore
            text="Score"
            setScore={this.setScore}
            score={this.state.score}
          />
        </div>
        {this.state.showPopUp && this.showPopUp()}
      </div>
    );
  }
}
