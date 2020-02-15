import React, { Component } from "react";
import { word_list } from "./word_list";

class FindAllValidWords extends Component {
  state = {};

  visited_node(n, visited_nodes) {
    for (var i = 0; i < n; i++) {
      var row = [];
      for (var j = 0; j < n; j++) {
        row.push(false);
      }
      visited_nodes.push(row);
    }
  }

  check_for_letter_traversal(
    grid,
    word,
    matched_letter,
    x,
    y,
    visited_nodes,
    answer
  ) {
    for (var i = x - 1; i < x + 2; i++) {
      for (var j = y - 1; j < y + 2; j++) {
        if (
          i >= 0 &&
          j >= 0 &&
          i < grid.length &&
          j < grid.length &&
          visited_nodes[i][j] === false
        ) {
          if (word[matched_letter] === grid[i][j]) {
            if (word.length - matched_letter === 1) {
              answer.push(word);
              return true;
            } else {
              matched_letter += 1;
              visited_nodes[i][j] = true;
              if (
                this.check_for_letter_traversal(
                  grid,
                  word,
                  matched_letter,
                  i,
                  j,
                  visited_nodes,
                  answer
                )
              ) {
                return true;
              }
              matched_letter -= 1;
              visited_nodes[i][j] = true;
            }
          }
        }
      }
    }
  }

  grid_contains_all_unique_letters(word, first_letter_map) {
    for (var i = 0; i < word.length; i++) {
      if (!first_letter_map.has(word[i])) {
        return false;
      }
    }
    return true;
  }

  boggle(grid, dictionary) {
    var answer = [];
    var n = grid.length;
    var first_letter_map = new Map();
    var boggle_call = 0;

    console.log(grid, first_letter_map);

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid.length; j++) {
        var letter = grid[i][j];
        if (!first_letter_map.has(letter)) {
          first_letter_map.set(letter, [[i, j]]);
        } else {
          first_letter_map.get(letter).push([i, j]);
        }
      }
    }

    console.log(first_letter_map, "maka");
    var a = 0;

    while (a < dictionary.length) {
      var word = dictionary[a].toUpperCase();
      var start_position = [];

      var skip_by = 8192;

      if (!first_letter_map.has(word[0])) {
        console.log(a, "the sahi word", dictionary[a].toUpperCase());
        while (skip_by >= 1) {
          if (
            a + skip_by < dictionary.length &&
            word[0] === dictionary[a + skip_by][0].toUpperCase()
          ) {
            console.log(a, "the sahi main word", dictionary[a].toUpperCase());
            console.log();
            a = a + skip_by;
          } else {
            console.log(a, "reducing skip_by", dictionary[a].toUpperCase());
            skip_by = skip_by / 2;
          }
        }
        a++;
        continue;
      } else {
        if (!this.grid_contains_all_unique_letters(word, first_letter_map)) {
          a++;
          continue;
        }

        start_position = first_letter_map.get(word[0]);
        console.log(a, "word", word);

        for (var i = 0; i < start_position.length; i++) {
          if (answer.includes(word)) {
            break;
          }
          boggle_call++;
          var visited_nodes = [];
          this.visited_node(n, visited_nodes);
          var element = start_position[i];
          visited_nodes[element[0]][element[1]] = true;
          this.check_for_letter_traversal(
            grid,
            word,
            1,
            element[0],
            element[1],
            visited_nodes,
            answer
          );
        }
      }
      a++;
    }
    console.log(boggle_call, "boggle_call");
    return answer;
  }

  render() {
    var word_valid_list = this.boggle(
      [
        ["T", "T", "N", "T", "D"],
        ["H", "N", "C", "P", "R"],
        ["I", "L", "A", "E", "E"],
        ["G", "L", "Z", "R", "E"],
        ["S", "R", "F", "O", "S"]
      ],
      word_list
    );
    console.log(word_valid_list);
    return <h1>My name is Swarnim</h1>;
  }
}

export default FindAllValidWords;
