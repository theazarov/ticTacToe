"use strict";

//Cоздаем таблицу:
let table = document.querySelector("table");
function createTable() {

  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td");
      td.classList.add("free");
      td.setAttribute("data-mesh", j + 1);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
createTable();

function ticTacToe() {
    let tds = table.querySelectorAll("td");
    let switchPlayers = 1;
  
    for (let td of tds) {
      td.addEventListener("click", function game(event) {
        if (switchPlayers === 1 && td.className == "free") {
          td.classList.remove("free");
          td.classList.add("playerX");
          td.innerHTML = "X";
  
          switchPlayers = 0;
        } else if (td.classList == "free") {
          td.classList.remove("free");
          td.classList.add("playerO");
          td.innerHTML = "O";
  
          switchPlayers = 1;
        } 
        
        winnerVertically("playerX", td);
        winnerVertically("playerO", td);
  
        winnerHorizontally("playerX");
        winnerHorizontally("playerO");
  
        winnerDiagonally("playerX");
        winnerDiagonally("playerO");
      });
    }
}
ticTacToe()


//Проверяем победителя по вертикали:
function winnerVertically(player, td) {
  let tds = document.querySelectorAll(
    '#table td[data-mesh="' + td.dataset.mesh + '"]'
  );
  let counter = 0;
  checkWinner(player, tds, counter);
}

//Проверяем победителя по горизонтали:
function winnerHorizontally(player) {
  let trs = table.querySelectorAll("tr");
  let counter = 0;

  for (let tr of trs) {
    let tds = tr.querySelectorAll("td");
    checkWinner(player, tds, counter);
  }
}

//Проверяем победителя по диагонали:
function winnerDiagonally(player) {
  let trs = table.querySelectorAll("tr");
  let counter = 0;

  checkWinner(player, getDiagonally(trs, 1), counter);
  checkWinner(player, getDiagonally(trs, 3), counter);
}

function colorize(player, tds) {
  for (let colorElem of tds) {
    colorElem.classList.add("colorGreen");
    console.log(player + " wins");
  }
}

//Функция для поиска диагональных ячеек:
function getDiagonally(trs, num) {
    let diagonally = [];
    let i = num;
  
    for (let tr of trs) {
      let tds = tr.querySelectorAll("td");
      for (let td of tds) {
        if (td.dataset.mesh == i) {
          diagonally.push(td);
        }
      }
      num == 3 ? i-- : i++;
    }
    return diagonally;
  }

//Общая функция для поиска выигрышных ячеек:
function checkWinner(player, tds, counter) {
  for (let td of tds) {
    if (td.className == player) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter == 3) {
      colorize(player, tds);
        td.classList.add('true')
    }
  }
}
