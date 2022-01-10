"use strict";

//Cоздаем таблицу:
let table = document.querySelector("table");

function createTable() {
  table.innerHTML = "";

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
  ticTacToe();
}
createTable();

function ticTacToe() {
  let tds = table.querySelectorAll("td");
  let switchPlayers = 1;

  for (let td of tds) {
    td.addEventListener("click", function () {
      if (
        switchPlayers == 1 &&
        td.className == "free" &&
        !table.classList.contains("true")
      ) {
        td.classList.remove("free");
        td.classList.add("playerX");
        td.innerHTML = "X";

        switchPlayers = 0;
      } else if (td.classList == "free" && !table.classList.contains("true")) {
        td.classList.remove("free");
        td.classList.add("playerO");
        td.innerHTML = "O";

        switchPlayers = 1;
      }

      winnerVertically(td);
      winnerHorizontally();
      winnerDiagonally();
    });
  }
}

//Проверяем победителя по вертикали:
function winnerVertically(td) {
  let tds = document.querySelectorAll(
    '#table td[data-mesh="' + td.dataset.mesh + '"]'
  );
  checkWinner(tds);
}

//Проверяем победителя по горизонтали:
function winnerHorizontally() {
  let trs = table.querySelectorAll("tr");

  for (let tr of trs) {
    let tds = tr.querySelectorAll("td");
    checkWinner(tds);
  }
}

//Проверяем победителя по диагонали:
function winnerDiagonally() {
  let trs = table.querySelectorAll("tr");

  checkWinner(getDiagonally(trs, 1));
  checkWinner(getDiagonally(trs, 3));
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
function checkWinner(tds) {
  let x = 0;
  let o = 0;

  for (let td of tds) {
    if (td.classList.contains("playerX")) {
      x++;
    } else {
      x = 0;
    }

    if (td.className == "playerO") {
      o++;
    } else {
      o = 0;
    }

    if (x == 3 || o == 3) {
      colorize(tds);
      table.classList.add("true");
    }
  }
}

//Раскрашиваем выиграшные ячейки:
function colorize(tds) {
  for (let colorElem of tds) {
    colorElem.classList.add("colorGreen");
  }
}
