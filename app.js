import { checkCells } from "./checkCellsFunc.js";
import { createGrid, assignCells, generateMines } from "./Grid.js";

document.addEventListener("DOMContentLoaded", function () {


    var settings = document.querySelector(".settings");
    var gridStandard = document.getElementById("standard");
    var gridCustom = document.getElementById("custom");
    var sizeInput = document.getElementById("size_input");
    var mineStandard = document.getElementById("standard_mine");
    var mineCustom = document.getElementById("custom_mine");
    var mineInput = document.getElementById("mine_input");
    var label = document.querySelector(".label");
    var playBtn = document.getElementById("play");
    var grid = document.querySelector(".grid");
    var cells;
    var btn = document.querySelector(".check-btn");
    btn.addEventListener("click", () => {
        checkWin();
    });
    var flagBtn = document.querySelector(".flag");


    function statsUpdate(status) {
        if (localStorage.getItem(`${status}`) == null) {
            localStorage.setItem(`${status}`, Number(1))
        } else {
            let count = Number(localStorage.getItem(`${status}`));
            localStorage.removeItem(`${status}`);
            localStorage.setItem(`${status}`, count + 1);
        }
    }

    var statsBtn = document.querySelector(".stats-btn");
    statsBtn.addEventListener("click", () => {
        alert(`Wins: ${localStorage.getItem("wins")}\nLoses: ${localStorage.getItem("loses")}`)
    })

    var customSize = false;
    var customMines = false;
    var flag = false;
    var flags = 0;
    var size = 9;
    var minesNumber = 10;
    var screenWidth = window.innerWidth;
    var id = 0;
    var minesAround = 0;
    var minesCounter = 0;
    var leftSide = [];
    var rightSide = [];
    var topSide = [];
    var bottomSide = [];
    var corner = [0];
    var hasLost = false;
    var hasWon = false;

    if (screenWidth < 1000) {
        document.querySelector(".header").style.fontSize = 40 + "px";

    }

    gridStandard.addEventListener("click", () => {
        customSize = false;
        sizeInput.classList.add("hidden");
        label.classList.add("hidden");
        size = 9;
    })

    gridCustom.addEventListener("click", function () {
        customSize = true;
        sizeInput.classList.remove("hidden");
        label.classList.remove("hidden");
        sizeInput.focus();
        sizeInput.addEventListener("change", () => {
            size = Number(sizeInput.value);
            label.innerHTML = "(" + size + "x" + size + ")";
            console.log(size)
        })
    })

    mineStandard.addEventListener("click", () => {
        customMines = false;
        mineInput.classList.add("hidden");
        minesNumber = 10;
    })

    mineCustom.addEventListener("click", () => {
        customMines = true;
        mineInput.classList.remove("hidden");
        mineInput.focus();
        mineInput.addEventListener("change", () => {
            minesNumber = Number(mineInput.value);
            console.log(minesNumber)
        })
    })

    playBtn.addEventListener("click", () => {

        if (minesNumber > size * size) {
            alert("Number of Mines is larger than number of cells");
        } else {
            settings.classList.add("hidden");

            //Topside Array
            for (let j = 1; j < size - 1; j++) {
                topSide.push(j);
            }

            //leftSide Array
            for (let j = size; j < size * (size - 1); j += size) {
                leftSide.push(j);
            }

            //rightSide Array
            for (let j = (size + size - 1); j < size * (size - 1); j += size) {
                rightSide.push(j);
            }

            //bottomSide Array
            for (let j = size * (size - 1) + 1; j < (size * size) - 1; j++) {
                bottomSide.push(j);
            }

            //corner Array
            corner.push((size - 1), (size * (size - 1)), (size * size - 1));

            game();
        }
    })




    /// function contains main functions and starts the game
    function game() {
        cells = createGrid(size, screenWidth, grid, cells);
        assignCells(size, cells, id);
        generateMines(minesCounter, minesNumber, size);
        // contains three checking functions
        checkCells(cells, size, corner, leftSide, rightSide, topSide, bottomSide, minesAround);
        clickingCellFunction();
    }


    //// Functionalities of cell clicing and cell revealing
    function clickingCellFunction() {
        for (let i = 0; i < size * size; i++) {
            clickingCell(cells[i]);
        }
    }



    function clickingCell(cell) {
        if (screenWidth > 1000) {

            cell.addEventListener("click", () => {
                if (cell.dataset.ismined == "false"
                    && cell.dataset.clicked == "false"
                    && cell.dataset.minesaround == 0) {
                    cellRevealBasic(cell);
                    revealNeighbourCells(cell);
                }
                else if (cell.dataset.ismined == "false"
                    && cell.dataset.clicked == "false") {
                    cellRevealBasic(cell);
                }
                else if (cell.dataset.ismined == "true") {
                    mineReveal();
                }
            })

            cell.addEventListener("contextmenu", () => {
                if (!hasLost) {
                    if (cell.dataset.flagged == "false"
                        && cell.dataset.clicked == "false") {
                        cell.setAttribute("data-flagged", "true");
                        cell.innerHTML = "🚩";
                        flags++;
                    } else if (cell.dataset.flagged == "true"
                        && cell.dataset.clicked == "false") {
                        cell.setAttribute("data-flagged", "false");
                        cell.innerHTML = "";
                        flags--;
                    }
                }
            })
        } else {
            flagBtn.addEventListener("click", () => {
                if (!hasLost) {
                    !flag ? flag = true : flag = false;
                    flag ? flagBtn.style.backgroundColor = "red" : flagBtn.style.backgroundColor = "white";
                }
            })

            cell.addEventListener("click", () => {
                if (!hasLost) {
                    if (!flag) {
                        if (cell.dataset.ismined == "false"
                            && cell.dataset.clicked == "false"
                            && cell.dataset.minesaround == 0) {
                            cellRevealBasic(cell);
                            revealNeighbourCells(cell, Number(cell.dataset.id));
                        }
                        else if (cell.dataset.ismined == "false"
                            && cell.dataset.clicked == "false") {
                            cellRevealBasic(cell);
                        }
                        else if (cell.dataset.ismined == "true") {
                            mineReveal();
                        }
                    } else {
                        if (cell.dataset.flagged == "false"
                            && cell.dataset.clicked == "false") {
                            cell.setAttribute("data-flagged", "true");
                            cell.innerHTML = "🚩";
                            flags++;
                        } else if (cell.dataset.flagged == "true"
                            && cell.dataset.clicked == "false") {
                            cell.setAttribute("data-flagged", "false");
                            cell.innerHTML = "";
                            flags--;
                        }
                    }
                }

            })
        }
    }

    function cellRevealBasic(cell) {
        cell.innerHTML = cell.dataset.minesaround;
        cell.classList.add("cell-clicked");
        cell.setAttribute("data-clicked", "true");
        cell.setAttribute("data-flagged", "false");
    }

    function mineReveal() {
        if (hasWon == false) {
            for (let i = 0; i < size * size; i++) {
                if (cells[i].dataset.ismined == "true") {
                    cells[i].setAttribute("data-clicked", "true");
                    cells[i].classList.add("cell-mine");
                    cells[i].classList.remove("cell");
                    cells[i].innerHTML = "💣";
                }
            }
            hasLost = true;
            hasWon = false;
            statsUpdate("loses");
            grid.style.backgroundColor = "red";
            alert("You Lost");
        }
    }

    function revealNeighbourCells(cell) {
        if (corner[0] == cell.dataset.id) {
            cornerCellsRevealNeighbourCells(corner[0] + 1, corner[0] + size, corner[0] + size + 1);
        }

        else if (corner[1] == cell.dataset.id) {
            cornerCellsRevealNeighbourCells(corner[1] - 1, corner[1] + size - 2, corner[1] + size - 1);
        }

        else if (corner[2] == cell.dataset.id) {
            cornerCellsRevealNeighbourCells(corner[2] - size, corner[2] - size + 1, corner[2] + 1);
        }
        else if (corner[3] == cell.dataset.id) {
            cornerCellsRevealNeighbourCells(corner[3] - 1, corner[3] - size, corner[3] - size - 1);
        }

        else if (topSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, (-1), (1), (size - 1), (size), (size + 1));
        }
        else if (rightSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, (-size), (size), (-size - 1), (-1), (size - 1));
        }
        else if (leftSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, (-size), (size), (-size + 1), (1), (size + 1));
        }
        else if (bottomSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, (-1), (1), (-size - 1), (-size), (-size + 1));
        }
        else if (!bottomSide.includes(Number(cell.dataset.id))
            && !topSide.includes(Number(cell.dataset.id))
            && !rightSide.includes(Number(cell.dataset.id))
            && !leftSide.includes(Number(cell.dataset.id))
            && !corner.includes(Number(cell.dataset.id))) {
            revealRemainingcells(cell, size, size + 1, size - 1, 1);
            revealRemainingcells(cell, -size, -(size - 1), -(size + 1), -1);
        } else {
            null;
        }

    }



    function cornerCellsRevealNeighbourCells(valueOne, valueTwo, valueThree) {
        if (cells[valueOne].dataset.clicked == "false"
            && cells[valueOne].dataset.minesaround == 0
            && cells[valueOne].dataset.ismined == "false") {
            cellRevealBasic(cells[valueOne]);
            revealNeighbourCells(cells[valueOne])
        }
        else if (cells[valueOne].dataset.clicked == "false"
            && cells[valueOne].dataset.ismined == "false") {
            cellRevealBasic(cells[valueOne])
        }

        if (cells[valueTwo].dataset.clicked == "false"
            && cells[valueTwo].dataset.minesaround == 0
            && cells[valueTwo].dataset.ismined == "false") {
            cellRevealBasic(cells[valueTwo]);
            revealNeighbourCells(cells[valueTwo])
        }
        else if (cells[valueTwo].dataset.clicked == "false"
            && cells[valueTwo].dataset.ismined == "false") {
            cellRevealBasic(cells[valueTwo])
        }

        if (cells[valueThree].dataset.clicked == "false"
            && cells[valueThree].dataset.minesaround == 0
            && cells[valueThree].dataset.ismined == "false") {
            cellRevealBasic(cells[valueThree]);
            revealNeighbourCells(cells[valueThree])
        }
        else if (cells[valueThree].dataset.clicked == "false"
            && cells[valueThree].dataset.ismined == "false") {
            cellRevealBasic(cells[valueThree])
        }
    }



    function sideCellsRevealNeighbouringCells(cell, valueOne, valueTwo, valueThree, valueFour, valueFive) {
        var cellID = Number(cell.dataset.id);

        if (cells[cellID + valueOne].dataset.clicked == "false"
            && cells[cellID + valueOne].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueOne]);
            revealNeighbourCells(cells[cellID + valueOne])
        }
        else if (cells[cellID + valueOne].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueOne])
        }

        if (cells[cellID + valueTwo].dataset.clicked == "false"
            && cells[cellID + valueTwo].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueTwo]);
            revealNeighbourCells(cells[cellID + valueTwo])
        }
        else if (cells[cellID + valueTwo].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueTwo])
        }

        if (cells[cellID + valueThree].dataset.clicked == "false"
            && cells[cellID + valueThree].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueThree]);
            revealNeighbourCells(cells[cellID + valueThree])
        }
        else if (cells[cellID + valueThree].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueThree])
        }

        if (cells[cellID + valueFour].dataset.clicked == "false"
            && cells[cellID + valueFour].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueFour]);
            revealNeighbourCells(cells[cellID + valueFour])
        }
        else if (cells[cellID + valueFour].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueFour])
        }

        if (cells[cellID + valueFive].dataset.clicked == "false"
            && cells[cellID + valueFive].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueFive]);
            revealNeighbourCells(cells[cellID + valueFive])
        }
        else if (cells[cellID + valueFive].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueFive])
        }
    }


    function revealRemainingcells(cell, valueOne, valueTwo, valueThree, valueFour) {
        var cellID = Number(cell.dataset.id);
        if (cells[cellID + valueOne].dataset.clicked == "false" && cells[cellID + valueOne].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueOne]);
            revealNeighbourCells(cells[cellID + valueOne])
        }
        else if (cells[cellID + valueOne].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueOne])
        }

        if (cells[cellID + valueTwo].dataset.clicked == "false" && cells[cellID + valueTwo].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueTwo]);
            revealNeighbourCells(cells[cellID + valueTwo])
        }
        else if (cells[cellID + valueTwo].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueTwo])
        }

        if (cells[cellID + valueThree].dataset.clicked == "false" && cells[cellID + valueThree].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueThree]);
            revealNeighbourCells(cells[cellID + valueThree])
        }
        else if (cells[cellID + valueThree].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueThree])
        }

        if (cells[cellID + valueFour].dataset.clicked == "false" && cells[cellID + valueFour].dataset.minesaround == 0) {
            cellRevealBasic(cells[cellID + valueFour]);
            revealNeighbourCells(cells[cellID + valueFour])
        }
        else if (cells[cellID + valueFour].dataset.clicked == "false") {
            cellRevealBasic(cells[cellID + valueFour])
        }
    }


    function checkWin() {

        if (hasWonFunc()) {
            statsUpdate("wins");
            hasWon = true;
            hasLost = false;
            grid.style.backgroundColor = "green";
            alert("You Win")
        } else if (hasLost) {
            alert("You Lost")
        } else {
            alert("Not Yet");
        }
    }

    var hasWonFunc = function checkWinLoop() {
        var counter = 0;
        for (let i = 0; i < size * size; i++) {
            if (cells[i].dataset.ismined == "true"
                && cells[i].dataset.flagged == "true") {
                counter++;
            }
        }

        if (counter == minesNumber) {
            return true;
        } else {
            return false;
        }

    }


});


