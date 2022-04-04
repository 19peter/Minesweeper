export function checkCells(cells, size, corner, leftSide, rightSide, topSide, bottomSide, minesAround) {
    for (let i = 0; i < size * size; i++) {
        if (corner[0] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
            cornerCellsCheckMinesAround(corner[0] + 1, corner[0] + size, corner[0] + size + 1, cells[i], minesAround, cells);
        }
        else if (corner[1] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
            cornerCellsCheckMinesAround(corner[1] - 1, corner[1] + size - 2, corner[1] + size - 1, cells[i], minesAround, cells);
        }
        else if (corner[2] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
            cornerCellsCheckMinesAround(corner[2] - size, corner[2] - size + 1, corner[2] + 1, cells[i], minesAround, cells);
        }
        else if (corner[3] == cells[i].dataset.id && cells[i].dataset.ismined == "false") {
            cornerCellsCheckMinesAround(corner[3] - 1, corner[3] - size, corner[3] - size - 1, cells[i], minesAround, cells);
        }
        else if (leftSide.includes(i) && cells[i].dataset.ismined == "false") {
            sideCellsCheckMinesAround(cells[i], (i - size), (i + size), (i - size + 1), (i + 1), (i + size + 1), minesAround, cells);
        }
        else if (rightSide.includes(i) && cells[i].dataset.ismined == "false") {
            sideCellsCheckMinesAround(cells[i], (i - size), (i + size), (i - size - 1), (i - 1), (i + size - 1), minesAround, cells);
        }
        else if (topSide.includes(i) && cells[i].dataset.ismined == "false") {
            sideCellsCheckMinesAround(cells[i], (i - 1), (i + 1), (i + size - 1), (i + size), (i + size + 1), minesAround, cells);
        }
        else if (bottomSide.includes(i) && cells[i].dataset.ismined == "false") {
            sideCellsCheckMinesAround(cells[i], (i - 1), (i + 1), (i - size - 1), (i - size), (i - size + 1), minesAround, cells);
        }
        else if (!bottomSide.includes(i)
            && !topSide.includes(i)
            && !rightSide.includes(i)
            && !leftSide.includes(i)
            && cells[i].dataset.ismined == "false") {
            checkRemainingCells(cells[i], size, 1, size + 1, size - 1, i, minesAround, cells);
        } else {
            null;
        }
    }
}

function cornerCellsCheckMinesAround(valueOne, valueTwo, valueThree, element, minesAround, cells) {
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


function sideCellsCheckMinesAround(element, valueOne, valueTwo, valueThree, valueFour, valueFive, minesAround, cells) {
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

function checkRemainingCells(element, valueOne, valueTwo, valueThree, valueFour, index, minesAround, cells) {
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