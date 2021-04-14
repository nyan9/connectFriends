import React from "react";
import { connect } from "react-redux";
import * as Online from "./online_logic";


export default class OnlineBoard extends React.Component {
  constructor(props) {
    super(props);
    this.board = new Online.Board(this.props.board);

    this.toggleHover = this.toggleHover.bind(this);
    this.placePiece = this.placePiece.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  componentDidMount() {
    let lastPos = null;
    this.props.socket.on("update board", (lastPos_and_color) => {
      console.log("update board: ", lastPos_and_color)
      this.updateBoard(lastPos_and_color);
      lastPos = lastPos_and_color[0];
    });

    // shitty solution but it works, asynchronously checks to see if game is over
    // limited because we don't know who the winner is
    setInterval(() => {
      if (lastPos) {
        if (this.checkWin(lastPos)) {
          let color = this.board.grid[lastPos[0]][lastPos[1]].color;
          this.props.winGame(color);
        } else if (!this.checkWin(lastPos) && this.board.full()) {
          this.props.tieGame();
        }
      }
    }, 0);
  }

  toggleHover() {}

  placePiece(e) {
    e.preventDefault();
    this.props.socket.emit("play turn", this.props.currentUser);
    let lastPos = null;
    this.props.socket.on("allow turn", () => {
      console.log("allow turn: ", this.props.currentUser)
      lastPos = this.board.lastPiecePos(parseInt(e.target.className));
    });
    // the following code needs to be asynchronous bc the above code is as well
    setTimeout(() => {
      console.log("lastPos in setTimeout before if statement: ", lastPos)
      if (lastPos) {
        console.log("send pos: ", lastPos)
        this.props.socket.emit("send pos", lastPos)
      };
    }, 100);
  }

  updateBoard(lastPos_and_color) {
    let pos = lastPos_and_color[0];
    let color = lastPos_and_color[1];
    debugger;
    this.board.fillPos(pos[0], pos[1], color);
    document.getElementById(
      `${pos[0]},${pos[1]}`
    ).style.backgroundColor = color;
  }

  checkWin(pos) {
    let x = pos[0];
    let y = pos[1];
    return this.board.win(x, y);
  }

  render() {
    const grid = this.board.grid.map((row, y) => {
      const elements = row.map((ele, x) => {
        return (
          <div
            key={x}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
            onClick={this.placePiece}
            className={`${x} col`}
            id={`${y},${x}`}
          >
            &nbsp;
          </div>
        );
      });
      return (
        <div key={y} className={`row ${y}`}>
          {elements}
        </div>
      );
    });

    console.log(this.props.currentUser)
    return (
      <div className="board-container">
        <div className="board">{grid}</div>
      </div>
    );
  }
}
