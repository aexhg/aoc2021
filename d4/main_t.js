
const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, './test.txt');
const input = fs.readFileSync(filename, 'utf-8')
const transpose = arr => arr[0].map((_, c) => arr.map(row => row[c]));

const findIndex = numbers => board =>
  numbers.findIndex((_, i) =>
    board.some(row => row.every(v => numbers.slice(0, i).some(n => n === v)))
  );

const bingoAtIndex = (board, numbers) =>
  [board, transpose(board)]
    .map(findIndex(numbers))
    .reduce((min, elem) => Math.min(min, elem));

const sumUnmarked = numbers => board =>
  board
    .flat()
    .filter(v => !numbers.some(n => n === v))
    .reduce((a, v) => a + v);

const sortedBoards = ([bingoNumbers, ...boards]) =>
  (numbers =>
    boards
      .map(board =>
        board.split("\n").map(row => row.split(" ").filter(Boolean).map(Number))
      )
      .map(board => [bingoAtIndex(board, numbers), board])
      .map(([bingoIndex, board]) => [
        bingoIndex,
        board,
        numbers.slice(0, bingoIndex),
      ])
      .map(([bingoIndex, board, winningNumbers]) => [
        bingoIndex,
        sumUnmarked(winningNumbers)(board),
      ])
      .sort(([a], [b]) => a - b)
      .map(([bingoIndex, sum]) => [bingoIndex, numbers[bingoIndex - 1] * sum])
      .map(([, score]) => score))(bingoNumbers.split(",").map(Number));

const part1 = sortedBoards(input.split('\n\n'))[0];
const part2 = sortedBoards(input.split('\n\n')).reverse()[0];
console.log(par1, part2);
