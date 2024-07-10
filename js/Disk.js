class Disk {
    constructor(size) {
        this.size = size;
    }

    draw(ctx, x, y) {
        const diskWidth = this.size * 30;
        const diskHeight = 20;
        ctx.fillStyle = `hsl(${this.size * 60}, 100%, 50%)`;
        ctx.fillRect(x - diskWidth / 2, y - diskHeight, diskWidth, diskHeight);
    }
}