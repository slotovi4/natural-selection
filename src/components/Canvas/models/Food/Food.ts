export class Food {
    public x: number;
    public y: number;
    public radius: number;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.ctx = ctx;
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.strokeStyle = 'green';
        this.ctx.stroke();
        this.ctx.closePath();
      }
}