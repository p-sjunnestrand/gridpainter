export function updateGridColors(gridStateRoute) {
    fetch(gridStateRoute)
        .then(result => result.json())
        .then(data => {
            for (let gridState in data) {
                let gridStatePixels = data[gridState];
                for (let pixel in gridStatePixels) {
                    if (gridStatePixels[pixel].color !== null) {
                        document.getElementById(gridStatePixels[pixel].id).style.backgroundColor = gridStatePixels[pixel].color;
                    } else {
                        document.getElementById(gridStatePixels[pixel].id).style.backgroundColor = "#f4eee2";
                    }
                }
            }
        })
}