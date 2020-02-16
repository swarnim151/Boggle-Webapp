function visited_node(n, visited_nodes) {
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(false);
    }
    visited_nodes.push(row);
  }
}

function check_for_letter_traversal(
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
      //console.log(word, "looking for", word[matched_letter], "at", i, j);
      if (word.length === matched_letter) {
        answer.push(word);
        return true;
      }
      if (
        i >= 0 &&
        j >= 0 &&
        i < grid.length &&
        j < grid.length &&
        visited_nodes[i][j] === false
      ) {
        if (word[matched_letter] === grid[i][j]) {
          visited_nodes[i][j] = true;
          if (
            check_for_letter_traversal(
              grid,
              word,
              matched_letter + 1,
              i,
              j,
              visited_nodes,
              answer
            )
          ) {
            return true;
          }
          if (
            word[matched_letter] === "Q" &&
            word.length >= matched_letter + 2 &&
            word[matched_letter + 1] === "U" &&
            check_for_letter_traversal(
              grid,
              word,
              matched_letter + 2,
              i,
              j,
              visited_nodes,
              answer
            )
          ) {
            return true;
          }
          visited_nodes[i][j] = false;
        }
      }
    }
  }
}

function grid_contains_all_unique_letters(word, first_letter_map) {
  for (var i = 0; i < word.length; i++) {
    if (word[i] === "U" && first_letter_map.has("Q")) {
      continue;
    }
    if (!first_letter_map.has(word[i])) {
      return false;
    }
  }
  return true;
}

function boggle(grid, dictionary) {
  var answer = [];
  var n = grid.length;
  var first_letter_map = new Map();
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
    console.log(word);

    var skip_by = 10;

    if (!first_letter_map.has(word[0])) {
      console.log(a, "no first letter", dictionary[a].toUpperCase());
      while (skip_by >= 1) {
        if (
          a + skip_by < dictionary.length &&
          word[0] === dictionary[a + skip_by][0].toUpperCase()
        ) {
          console.log(a, "adding skip_by", dictionary[a].toUpperCase());
          console.log();
          a = a + skip_by;
        } else {
          console.log(a, "reducing skip_by", dictionary[a].toUpperCase());
          skip_by = skip_by / 10;
        }
      }
      a++;
      continue;
    } else {
      console.log(word);

      if (!grid_contains_all_unique_letters(word, first_letter_map)) {
        a++;
        console.log("not in map", word);

        continue;
      }

      console.log(word);

      start_position = first_letter_map.get(word[0]);
      console.log(a, "word", word);

      for (var j = 0; j < start_position.length; j++) {
        if (answer.includes(word)) {
          break;
        }
        var visited_nodes = [];
        visited_node(n, visited_nodes);

        var element = start_position[j];
        //visited_nodes[element[0]][element[1]] = true;

        check_for_letter_traversal(
          grid,
          word,
          0,
          element[0],
          element[1],
          visited_nodes,
          answer
        );
      }
    }
    a++;
  }
  console.log(answer);
  return answer;
}

export default boggle;
