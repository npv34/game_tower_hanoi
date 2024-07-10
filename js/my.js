document.addEventListener('DOMContentLoaded', () => {
    const diskCountE = document.getElementById("diskCount");
    diskCountE.addEventListener("change", () => {
        const diskCount = parseInt(diskCountE.value);
        if (diskCount === 6) {
            alert("The maximum number of disks is 6.");
            return;
        }
        start(diskCount);
    })

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
        start();
    })
});

function start(diskCount = 3) {
    const game = new GameMain('my-canvas', diskCount);
    game.init();
}

start();