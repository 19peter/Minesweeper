export function createGrid(size, screenWidth, grid, cells) {
    for (let i = 0; i < size * size; i++) {
        const createdCell = document.createElement("div");

        if (screenWidth >= 1000) {
            createdCell.style.width = 40 + "px";
            createdCell.style.height = 40 + "px";
            grid.style.width = 42 * size + "px";
            grid.style.height = 42 * size + "px";
        } else if (screenWidth > 700 && screenWidth < 1000) {
            createdCell.style.width = 38 + "px";
            createdCell.style.height = 38 + "px";
            grid.style.width = 40 * size + "px";
            grid.style.height = 40 * size + "px";
        } else if (screenWidth < 700 && screenWidth > 400) {
            createdCell.style.width = 35 + "px";
            createdCell.style.height = 35 + "px";
            grid.style.width = 37 * size + "px";
            grid.style.height = 37 * size + "px";
        } else {
            createdCell.style.width = 30 + "px";
            createdCell.style.height = 30 + "px";
            grid.style.width = 32 * size + "px";
            grid.style.height = 32 * size + "px";
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