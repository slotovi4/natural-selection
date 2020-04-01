import { areaParams } from './params';

export class Area {
    public radius: number;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    public constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    public draw() {
        const { borderWidth, fillStyle, strokeStyle } = areaParams;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const padding = 20;
        
        this.radius = centerY - borderWidth - padding;

        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public getArea() {
        return {
            radius: this.radius,
        };
    }
}