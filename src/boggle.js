import React, { Component } from "react";
import { db } from "./firebase";
import { word_list } from "./word_list";
import boggle from "./boggle_solver";

class Boggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play_boggle: false,
      show_grid: false,
      grid: [],
      all_valid_words: [],
      load_boggle: false,
      high_score_1: 0,
      high_score_2: 0,
      high_score_3: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SetTheGrid = this.SetTheGrid.bind(this);
    this.SetHighScore = this.SetHighScore.bind(this);
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
  }

  GettheGrid(SetTheGrid, num) {
    var girdssssss = db.collection("grid");
    girdssssss
      .doc("CWzx6Xzk7a6RC91voh5S")
      .get()
      .then(function(snap) {
        console.log(snap);
        if (snap.exists) {
          console.log(snap.data().grid);
          SetTheGrid(snap.data().grid[num]);
        }
      });
  }

  SetHighScore(highest_score) {
    this.setState({ high_score_1: highest_score[0] });
    this.setState({ high_score_2: highest_score[1] });
    this.setState({ high_score_3: highest_score[2] });
  }

  GetHighScore(SetHighScore) {
    var girdssssss = db.collection("grid");
    girdssssss
      .doc("U6LNGmPhqKHaZMm9I9F1")
      .get()
      .then(function(snap) {
        console.log(snap);
        if (snap.exists) {
          console.log("highest score:", snap.data().highest_score);
          SetHighScore(snap.data().highest_score);
        }
      });
  }

  SetValidWords() {
    this.setState({ all_valid_words: boggle(this.state.grid, word_list) });
    this.setState({ load_boggle: true });

    // console.log(this.state.all_valid_words);
  }

  handleSubmit(event) {
    this.setState({ play_boggle: true });
    event.preventDefault();
  }

  handleChange(nums, event) {
    this.GettheGrid(this.SetTheGrid, nums);
    this.setState({ show_grid: true });
    event.preventDefault();
  }

  render() {
    if (this.state.play_boggle) {
      if (this.state.show_grid) {
        if (this.state.grid.length > 0) {
          if (!this.state.load_boggle) {
            return (
              <div>
                <div>{this.SetValidWords()}</div>
              </div>
            );
          } else {
            return (
              <div>
                <BoggleGame
                  sent_list={this.state.all_valid_words}
                  sent_grid={this.state.grid}
                />
              </div>
            );
          }
        } else {
          return (
            <div>
              <p> Wait while the game loads ...... </p>
            </div>
          );
        }
      } else {
        return (
          <div>
            <div>
              <h1> Challenge 1</h1>
              <p> High Score: {this.state.high_score_1}</p>
            </div>
            <button onClick={e => this.handleChange(0, e)}>
              Play Challenge 1
            </button>
            <div>
              <h1> Challenge 2</h1>
              <p> High Score {this.state.high_score_2}</p>
            </div>
            <button onClick={e => this.handleChange(1, e)}>
              Play Challenge 2
            </button>
            <div>
              <h1> Challenge 3</h1>
              <p> High Score {this.state.high_score_3}</p>
            </div>
            <button onClick={e => this.handleChange(2, e)}>
              Play Challenge 2
            </button>
          </div>
        );
      }
    } else {
      this.GetHighScore(this.SetHighScore);
      console.log(this.GetHighScore(this.SetHighScore));
      return (
        <div>
          <button onClick={this.handleSubmit}>Play Boggle </button>
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
      all_valid_words: this.props.sent_list,
      grid: this.props.sent_grid,
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
    var word = this.state.input_word.toUpperCase();

    if (this.state.valid_words.includes(word)) {
      alert("The word has already been found.");
    } else if (this.state.all_valid_words.includes(word)) {
      // add 1 to score and push word to this.state.valid_words
      var new_valid_words = this.state.valid_words;
      new_valid_words.push(word);
      this.setState({ valid_words: new_valid_words });
      this.setState({ score: this.state.score + 1 });
    } else {
      alert("The word you have entered is invalid.");
    }
  }

  PrintGrid() {
    return (
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
      </div>
    );
  }

  render() {
    if (this.state.game_state) {
      return (
        <div>
          <div>{this.PrintGrid()}</div>
          <div>
            <h1> </h1>
            <form onSubmit={this.handleSubmit}>
              <label>
                Enter a word:
                <input
                  type="text"
                  value={this.state.input_word}
                  onChange={this.handleChange}
                />
              </label>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
          <h1> </h1>
          <div>
            <button onClick={this.handleStop}>End Challenge</button>
          </div>
          <p> Score: {this.state.score}</p>
        </div>
      );
    } else {
      return (
        <div>
          <div>{this.PrintGrid()}</div>
          <p> You have scored {this.state.score} points</p>
        </div>
      );
    }
  }
}
