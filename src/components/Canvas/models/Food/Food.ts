import { foodParams } from './config';

export class Food {
    public x: number;
    public y: number;
    public radius: number;
    public eaten: boolean;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.radius = foodParams.radius;
        this.ctx = ctx;
        this.eaten = false;
    }

    public draw() {
        if (!this.eaten) {
            const { fillStyle, strokeStyle } = foodParams;

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.save();
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
            this.ctx.restore();
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    public eat() {
        this.eaten = true;
    }
}