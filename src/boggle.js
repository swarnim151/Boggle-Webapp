import React, { Component } from "react";

import { db } from "./firebase";

import { word_list } from "./word_list";

import FindAllValidWords from "./extra";

class Boggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load_challenge: false,
      show_grid: false,
      grid: [
        ["A", "B", "N", "T", "D"],
        ["H", "N", "C", "P", "R"],
        ["I", "L", "A", "E", "E"],
        ["G", "L", "Z", "R", "E"],
        ["S", "R", "F", "O", "S"]
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SetTheGrid = this.SetTheGrid.bind(this);
  }

  SetTheGrid(grid) {
    var given_grid = [];
    for (var i = 0; i < 5; i++) {
      var row = [];
      for (var j = 0; j < 5; j++) {
        var position = 5 * i + j;
        row.push(grid[position]);
      }
      given_grid.push(row);
    }
    console.log(given_grid);
    this.setState({ grid: given_grid });
    console.log(given_grid[0][0]);
    console.log(word_list[0]);
    console.log(word_list[10000]);
  }

  GettheGrid(SetTheGrid) {
    var girdssssss = db.collection("grid");
    girdssssss
      .doc("CWzx6Xzk7a6RC91voh5S")
      .get()
      .then(function(snap) {
        console.log(snap);
        if (snap.exists) {
          console.log(snap.data().grid);
          SetTheGrid(snap.data().grid);
        }
      });
    console.log("hey");
  }

  PrintGrid() {
    return (
      <div>
        <div>
          <div>
            <button>{this.state.grid[0][0]}</button>
            <button>{this.state.grid[0][1]}</button>
            <button>{this.state.grid[0][2]}</button>
            <button>{this.state.grid[0][3]}</button>
            <button>{this.state.grid[0][4]}</button>
          </div>
          <div>
            <button>{this.state.grid[1][0]}</button>
            <button>{this.state.grid[1][1]}</button>
            <button>{this.state.grid[1][2]}</button>
            <button>{this.state.grid[1][3]}</button>
            <button>{this.state.grid[1][4]}</button>
          </div>
          <div>
            <button>{this.state.grid[2][0]}</button>
            <button>{this.state.grid[2][1]}</button>
            <button>{this.state.grid[2][2]}</button>
            <button>{this.state.grid[2][3]}</button>
            <button>{this.state.grid[2][4]}</button>
          </div>
          <div>
            <button>{this.state.grid[3][0]}</button>
            <button>{this.state.grid[3][1]}</button>
            <button>{this.state.grid[3][2]}</button>
            <button>{this.state.grid[3][3]}</button>
            <button>{this.state.grid[3][4]}</button>
          </div>
          <div>
            <button>{this.state.grid[4][0]}</button>
            <button>{this.state.grid[4][1]}</button>
            <button>{this.state.grid[4][2]}</button>
            <button>{this.state.grid[4][3]}</button>
            <button>{this.state.grid[4][4]}</button>
          </div>

          <div></div>
        </div>
      </div>
    );
  }

  SetValidWords() {
    var found_words = [];
    found_words = new FindAllValidWords();
    this.setState({ all_valid_words: found_words });
  }

  handleSubmit(event) {
    this.setState({ load_challenge: true });
    event.preventDefault();
  }

  handleChange(event) {
    this.GettheGrid(this.SetTheGrid);
    this.SetValidWords();
    this.setState({ show_grid: true });
    event.preventDefault();
  }

  render() {
    if (this.state.load_challenge) {
      if (this.state.show_grid) {
        return (
          <div>
            <div>{this.PrintGrid()}</div>
            <BoggleGame></BoggleGame>
          </div>
        );
      } else {
        return (
          <div>
            <h1> Load Challenge 1</h1>
            <button onClick={this.handleChange}>Load Challenge</button>
            <h1> Load Challenge 2</h1>
            <button onClick={this.handleChange}>Load Challenge</button>
            <h1> Load Challenge 3</h1>
            <button onClick={this.handleChange}>Load Challenge</button>
          </div>
        );
      }
    } else {
      return (
        <div>
          <button onClick={this.handleSubmit}>Load Challenge</button>
        </div>
      );
    }
  }
}

export default Boggle;

class BoggleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_word: "",
      valid_words: [],
      score: 0,
      all_valid_words: ["ACE", "ZEROS"],
      game_state: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleChange(event) {
    this.setState({ input_word: event.target.value });
  }

  handleStop(event) {
    event.preventDefault();
    this.setState({ game_state: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.valid_words.includes(this.state.input_word)) {
      alert("The word has already been found.");
    } else if (
      //remove the word from this.state.valid_words
      this.state.all_valid_words.includes(this.state.input_word.toUpperCase())
    ) {
      var new_valid_words = this.state.valid_words;
      new_valid_words.push(this.state.input_word);
      this.setState({ valid_words: new_valid_words });
      var new_all_valid_words = this.state.all_valid_words;
      for (var i = 0; i < new_all_valid_words.length; i++) {
        if (new_all_valid_words[i] === this.state.input_word.toUpperCase()) {
          new_all_valid_words.splice(i, 1);
        }
      }
      this.setState({ all_valid_words: new_all_valid_words });
      var new_score = this.state.score;
      new_score++;
      this.setState({ score: new_score });
    } else {
      alert("The word you have entered is invalid.");
    }
  }

  render() {
    if (this.state.game_state) {
      return (
        <div>
          <div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Enter a word:
                  <input
                    type="text"
                    value={this.state.input_word}
                    onChange={this.handleChange}
                  />
                </label>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
            <div>
              <button onClick={this.handleStop}>Stop</button>
            </div>
          </div>
          <p> Score: </p>
          <div>{this.state.score}</div>
        </div>
      );
    } else {
      return (
        <div>
          <p> Score: </p>
          <div>{this.state.score}</div>
        </div>
      );
    }
  }
}