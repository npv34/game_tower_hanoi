
class GameMain {
    constructor(canvasId, numDisks) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.numDisks = numDisks;
        this.towers = [];
        this.draggingDisk = null;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.counterMove = new CounterMove();
    }

    init() {

        this.createTower();

        for (let i = this.numDisks; i > 0; i--) {
            this.towers[0].addDisk(new Disk(i));
        }

        this.canvas.addEventListener('mousedown', this.startDrag.bind(this));
        this.canvas.addEventListener('mousemove', this.drag.bind(this));
        this.canvas.addEventListener('mouseup', this.endDrag.bind(this));

        this.draw();

    }

    drawCountMove(){
        this.counterMove.draw(this.ctx)
    }

    createTower() {
        for (let i = 0; i < TOTAL_TOWER; i++) {
            const tower = new Tower(i)
            this.towers.push(tower);
        }
    }

    draw() {
        this.clearScreen();
        this.drawCountMove();

        const startX = 150;
        const startY = 300;

        for (let i = 0; i < 3; i++) {
            this.towers[i].draw(this.ctx, startX + i * 150, startY);
        }

        if (this.draggingDisk) {
            const { x, y } = this.draggingDisk.position;
            this.draggingDisk.disk.draw(this.ctx, x, y);
        }
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getTowerIndex(x) {
        const startX = 150;
        for (let i = 0; i < 3; i++) {
            if (x >= startX + i * 150 - 50 && x <= startX + i * 150 + 50) {
                return i;
            }
        }
        return null;
    }

    startDrag(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const towerIndex = this.getTowerIndex(x);

        if (towerIndex !== null && this.towers[towerIndex].disks.length > 0) {
            const disk = this.towers[towerIndex].removeDisk();

            this.draggingDisk = {
                disk: disk,
                from: towerIndex,
                position: { x: x, y: y }
            };
            this.dragOffsetX = x - (150 + towerIndex * 150);
            this.dragOffsetY = y - (300 - this.towers[towerIndex].disks.length * 20);
        }

    }

    drag(event) {
        if (this.draggingDisk) {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left - this.dragOffsetX;
            const y = event.clientY - rect.top - this.dragOffsetY;

            this.draggingDisk.position = { x: x, y: y };
            this.draw();
        }
    }

    endDrag(event) {
        if (this.draggingDisk) {
            const rect = this.canvas.getBoundingClientRect();
            const endX = event.clientX - rect.left;
            const towerIndex = this.getTowerIndex(endX);
            if (towerIndex !== null && this.towers[towerIndex].canAddDisk(this.draggingDisk.disk)) {
                if (this.changPositionDisk(towerIndex)) {
                    this.changeCounterMoves();
                }

                this.towers[towerIndex].addDisk(this.draggingDisk.disk);
            } else {
                this.towers[this.draggingDisk.from].addDisk(this.draggingDisk.disk);
            }
            this.clearDragDiskCurrent();
            this.draw();
        }
    }

    clearDragDiskCurrent() {
        this.draggingDisk = null;
    }

    changeCounterMoves() {
        this.counterMove.incrementMove(this.ctx);
    }

    changPositionDisk(towerIndex) {
        return this.draggingDisk.from !== towerIndex;
    }
}