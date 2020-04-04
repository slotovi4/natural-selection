import { creatureParams } from './params';

export class Creature {
    public x: number;
    public y: number;
    public radius: number;
    private velocity: number;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.radius = creatureParams.radius;
        this.velocity = creatureParams.velocity;
    }

    public draw() {
        const { fillStyle, strokeStyle, lineWidth } = creatureParams;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public update() {
        this.draw();

        this.x += this.velocity;
        this.y += this.velocity;
    }
}