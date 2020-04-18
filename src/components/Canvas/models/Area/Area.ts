import { areaParams } from './config';
import {IArea} from '../interface';

export class Area {
    public radius: number;
    public centerX: number;
    public centerY: number;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    public constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    public draw() {
        const { fillStyle, strokeStyle, borderWidth } = areaParams;
        const padding = 20;
        
        this.radius = this.centerY - borderWidth - padding;

        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public getArea(): IArea {
        return {
            radius: this.radius,
            centerX: this.centerX,
            centerY: this.centerY,
        };
    }
}