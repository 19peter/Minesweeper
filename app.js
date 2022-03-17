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

    var flag = false;
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
    var customSize = false;
    var customMines = false;

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
                grid.style.width = 45 * size + "px";
                grid.style.height = 45 * size + "px";

                //Topside Array
                for (j = 1; j < size - 1; j++) {
                    topSide.push(j);
                }

                //leftSide Array
                for (j = size; j < size * (size - 1); j += size) {
                    leftSide.push(j);
                }

                //rightSide Array
                for (j = (size + size - 1); j < size * (size - 1); j += size) {
                    rightSide.push(j);
                }

                //bottomSide Array
                for (j = size * (size - 1) + 1; j < (size * size) - 1; j++) {
                    bottomSide.push(j);
                }

                //corner Array
                corner.push((size - 1), (size * (size - 1)), (size * size - 1));

                game();
            }
    })




    /// function contains main functions and starts the game
    function game() {
        createCells();
        assignCells();
        generateMines();
        checkCells(); // contains three checking functions
        clickingCellFunction();
    }


    function createCells() {
        for (i = 0; i < size * size; i++) {
            const createdCell = document.createElement("div");
            grid.appendChild(createdCell);
            createdCell.classList.add("cell");
        }
        cells = document.querySelectorAll(".cell");
    }


    /// FUNCTIONS: 
    function assignCells() {
        for (i = 0; i < size * size; i++) {
            cells[i].setAttribute("data-clicked", "false");
            cells[i].setAttribute("data-id", id);
            cells[i].setAttribute("data-ismined", "false");
            cells[i].setAttribute("data-flagged", "false");
            id++;
        }
    }

    function generateMines() {
        if (minesCounter < minesNumber) {
            var random = Math.floor((Math.random() * (size * size - 1)) + 1);

            //FOR TESTING///
            // for (i = 0; i < 10; i++) {
            if (document.querySelector(`[data-id = "${random}"]`).dataset.ismined == "false") {
                document.querySelector(`[data-id = "${random}"]`).setAttribute("data-ismined", "true");
                minesCounter++
            }
            // }
            // recursion
            generateMines();
        }
    }


    function checkCells() {
        for (i = 0; i < size * size; i++) {
            if (corner[0] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(corner[0] + 1, corner[0] + size, corner[0] + size + 1, cells[i]);
            }
            else if (corner[1] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(corner[1] - 1, corner[1] + size - 2, corner[1] + size - 1, cells[i]);
            }
            else if (corner[2] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(corner[2] - size, corner[2] - size + 1, corner[2] + 1, cells[i]);
            }
            else if (corner[3] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
                cornerCellsCheckMinesAround(corner[3] - 1, corner[3] - size, corner[3] - size - 1, cells[i]);
            }
            else if (leftSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], (i - size), (i + size), (i - size + 1), (i + 1), (i + size + 1));
            }
            else if (rightSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], (i - size), (i + size), (i - size - 1), (i - 1), (i + size - 1));
            }
            else if (topSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], (i - 1), (i + 1), (i + size - 1), (i + size), (i + size + 1));
            }
            else if (bottomSide.includes(i) && cells[i].dataset.ismined == "false") {
                sideCellsCheckMinesAround(cells[i], (i - 1), (i + 1), (i - size - 1), (i - size), (i - size + 1));
            }
            else if (!bottomSide.includes(i)
                && !topSide.includes(i)
                && !rightSide.includes(i)
                && !leftSide.includes(i)
                && cells[i].dataset.ismined == "false") {
                checkRemainingCells(cells[i], size, 1, size + 1, size - 1, i);
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


    function sideCellsCheckMinesAround(element, valueOne, valueTwo, valueThree, valueFour, valueFive) {
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
        if (cells[valueFour].dataset.ismined == "true") {
            minesAround++;
        }
        if (cells[valueFive].dataset.ismined == "true") {
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
        for (i = 0; i < size * size; i++) {
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
        for (i = 0; i < size * size; i++) {

            if (cells[i].dataset.ismined == "true") {
                cells[i].setAttribute("data-clicked", "true");
                cells[i].classList.add("cell-mine");
                cells[i].classList.remove("cell");
                cells[i].innerHTML = "💣";
            }
        }
        hasLost = true;
        grid.style.backgroundColor = "red";
        // alert("You Lost");
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
        var counter = 0;
        for (i = 0; i < size * size; i++) {
            if (cells[i].dataset.ismined == "true"
                && cells[i].dataset.flagged == "true") {
                counter++;
            }
        }
        if (counter == minesCounter) {
            grid.style.backgroundColor = "green";
            alert("You Win");
        } else if (hasLost = true) {
            alert("You Lost");

        } else {
            alert("Not Yet");
        }
    }


});


