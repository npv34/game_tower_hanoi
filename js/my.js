document.addEventListener('DOMContentLoaded', () => {
    const diskCountE = document.getElementById("diskCount");
    diskCountE.addEventListener("change", () => {
        const diskCount = parseInt(diskCountE.value);
        if (diskCount === MAX_TOTAL_DISK) {
            alert("The maximum number of disks is 6.");
            return;
        }
        start(diskCount);
    })

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
        start(DEFAULT_TOTAL_DISK);
    })
});

function start(diskCount) {
    const game = new GameMain('my-canvas', diskCount);
    game.init();
}

start(DEFAULT_TOTAL_DISK);