document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector(".grid");
    var cells = document.querySelectorAll(".cell");
    var btn = document.querySelector(".check-btn");
    btn.addEventListener("click", () => {
        checkWin();
    });
    var flagBtn = document.querySelector(".flag");

    var flag = false;
    var screenWidth = window.innerWidth;
    var id = 0;
    var minesAround = 0;
    var mines = 0;
    var leftSide = [9, 18, 27, 36, 45, 54, 63];
    var rightSide = [17, 26, 35, 44, 53, 62, 71];
    var topSide = [1, 2, 3, 4, 5, 6, 7];
    var bottomSide = [73, 74, 75, 76, 77, 78, 79];
    var corner = [0, 8, 72, 80];
    var flags = 0;


    /// function contains main functions and starts the game
    function game() {
        assignCells();
        generateMines();
        checkCells(); // contains three checking functions
        clickingCellFunction();
    }


    /// FUNCTIONS: 
    function assignCells() {
        for (i = 0; i < 81; i++) {
            cells[i].setAttribute("data-clicked", "false");
            cells[i].setAttribute("data-id", id);
            cells[i].setAttribute("data-ismined", "false");
            cells[i].setAttribute("data-flagged", "false");
            id++;
        }
    }

    function generateMines() {
        if (mines < 10) {
            var random = Math.floor((Math.random() * 80) + 1);

            //FOR TESTING///
            // for (i = 0; i < 10; i++) {
            if (document.querySelector(`[data-id = "${random}"]`).dataset.ismined == "false") {
                document.querySelector(`[data-id = "${random}"]`).setAttribute("data-ismined", "true");
                mines++
            }
            // }
            // recursion
            generateMines();
        }
    }


    function checkCells() {
        for (i = 0; i < 81; i++) {
            if (cells[i].dataset.id == 0 && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(1, 9, 10, cells[i]);
            }
            else if (cells[i].dataset.id == 8 && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(7, 16, 17, cells[i]);
            }
            else if (cells[i].dataset.id == 72 && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(63, 64, 73, cells[i]);
            }
            else if (cells[i].dataset.id == 80 && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(70, 71, 79, cells[i]);
            }
            else if (leftSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], -9, -8, 1, 9, 10, i);
            }
            else if (rightSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], -10, -9, -1, 8, 9, i);
            }
            else if (topSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], -1, 1, 8, 9, 10, i);
            }
            else if (bottomSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], 1, -1, -8, -9, -10, i);
            }
            else if (!bottomSide.includes(i)
                && !topSide.includes(i)
                && !rightSide.includes(i)
                && !leftSide.includes(i)
                && cells[i].dataset.ismined == "false") {
                checkRemainingCells(cells[i], 10, 9, 8, 1, i);
            } else {
                null;
            }
        }
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////// Functions inside checkCells() --  For assigning cell data///////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////    
    function cornerCellsCheckMinesAround(valueOne, valueTwo, valueThree, element) {
        minesAround = 0;
        if (cells[valueOne].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[valueTwo].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[valueThree].dataset.ismined == "true") {
            minesAround++;
        }
        element.setAttribute("data-minesaround", minesAround);

    }


    function sideCellsCheckMinesAround(element, valueOne, valueTwo, valueThree, valueFour, valueFive, index) {
        minesAround = 0;
        if (cells[index + valueOne].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueTwo].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueThree].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueFour].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueFive].dataset.ismined == "true") {
            minesAround++;
        } else {
            null;
        }
        element.setAttribute("data-minesaround", minesAround);
    }

    function checkRemainingCells(element, valueOne, valueTwo, valueThree, valueFour, index) {
        minesAround = 0;
        if (cells[index + valueOne].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueTwo].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueThree].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index + valueFour].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index - valueOne].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index - valueTwo].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index - valueThree].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[index - valueFour].dataset.ismined == "true") {
            minesAround++;
        }
        element.setAttribute("data-minesaround", minesAround);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////    


    //// Functionalities of cell clicing and cell revealing
    function clickingCellFunction() {
        for (i = 0; i < 81; i++) {
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
                if (cell.dataset.flagged == "false") {
                    cell.setAttribute("data-flagged", "true");
                    cell.innerHTML = "🚩";
                    flags++;
                } else {
                    cell.setAttribute("data-flagged", "false");
                    cell.innerHTML = "";
                    flags--;
                }
            })
        } else {
            flagBtn.addEventListener("click", () => {
                !flag ? flag = true : flag = false;
                flag ? flagBtn.style.backgroundColor = "red" : flagBtn.style.backgroundColor = "white";
            })

            cell.addEventListener("click", () => {
                if (!flag) {
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
                } else {
                    if (cell.dataset.flagged == "false" && cell.dataset.clicked == "false") {
                        cell.setAttribute("data-flagged", "true");
                        cell.innerHTML = "🚩";
                        flags++;
                    } else if (cell.dataset.flagged == "true" && cell.dataset.clicked == "false") {
                        cell.setAttribute("data-flagged", "false");
                        cell.innerHTML = "";
                        flags--;
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
        for (i = 0; i < 81; i++) {

            if (cells[i].dataset.ismined == "true") {
                cells[i].classList.add("cell-mine");
                cells[i].classList.remove("cell");
                cells[i].innerHTML = "💣";
            }
        }
        grid.style.backgroundColor = "red";
        alert("You Lost");
    }

    function revealNeighbourCells(cell) {
        if (Number(cell.dataset.id) == 0) {
            cornerCellsRevealNeighbourCells(1, 9, 10);
        }

        else if (Number(cell.dataset.id) == 8) {
            cornerCellsRevealNeighbourCells(7, 16, 17);
        }

        else if (Number(cell.dataset.id) == 72) {
            cornerCellsRevealNeighbourCells(63, 64, 73);
        }
        else if (Number(cell.dataset.id) == 80) {
            cornerCellsRevealNeighbourCells(70, 71, 79);
        }

        else if (topSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, -1, 1, 8, 9, 10);
        }
        else if (rightSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, -10, -9, -1, 8, 9);
        }
        else if (leftSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, -9, -8, 1, 9, 10);
        }
        else if (bottomSide.includes(Number(cell.dataset.id))) {
            sideCellsRevealNeighbouringCells(cell, 1, -1, -8, -9, -10);
        }
        else if (!bottomSide.includes(Number(cell.dataset.id))
            && !topSide.includes(Number(cell.dataset.id))
            && !rightSide.includes(Number(cell.dataset.id))
            && !leftSide.includes(Number(cell.dataset.id))
            && !corner.includes(Number(cell.dataset.id))) {
            revealRemainingcells(cell, 10, 9, 8, 1);
            revealRemainingcells(cell, -10, -9, -8, -1);
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
        var counter = 0;
        for (i = 0; i < 81; i++) {
            if (cells[i].dataset.ismined == "true"
                && cells[i].dataset.flagged == "true") {
                counter++;
            }
        }
        if (counter == mines) {
            grid.style.backgroundColor = "green";
            alert("You Win");
        } else {
            alert("Not Yet");
        }
    }


    game();
});


