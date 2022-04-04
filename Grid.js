export function createGrid(size, screenWidth, grid, cells) {
    for (let i = 0; i < size * size; i++) {
        const createdCell = document.createElement("div");

        if (screenWidth < 1000) {
            if (size > 8) {
                //100 = 40 margin 30 padding and extra 30 for extending responsiveness
                let calc = (screenWidth - 110) / size;
                createdCell.style.width = calc + "px";
                createdCell.style.height = calc + "px";
                createdCell.style.fontSize = calc * 0.2;
                createdCell.style.lineHeight = calc * 0.06;
                grid.style.width = screenWidth - 70 + "px";
                // 70 = 40 margin and 30 padding subtracted from the inner width of screen
                grid.style.height = screenWidth - 70 + "px";
            } else {
                grid.style.width = 46 * size + "px";
                grid.style.height = 46 * size + "px";
            }
        } else {
            grid.style.width = 46 * size + "px";
            grid.style.height = 46 * size + "px";
        }

        grid.appendChild(createdCell);
        createdCell.classList.add("cell");
    }
    cells = document.querySelectorAll(".cell");
    return cells;
}

export function assignCells(size, cells, id) {
    for (let i = 0; i < size * size; i++) {
        cells[i].setAttribute("data-clicked", "false");
        cells[i].setAttribute("data-id", id);
        cells[i].setAttribute("data-ismined", "false");
        cells[i].setAttribute("data-flagged", "false");
        id++;
    }
}

export function generateMines(minesCounter, minesNumber, size) {
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
        generateMines(minesCounter, minesNumber, size);
    }
}
