import { areaParams } from './config';
import { IArea } from '../interface';

export class Area {
    private readonly radius: number;
    private readonly centerX: number;
    private readonly centerY: number;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;

    public constructor({ ctx, canvas }: IProps) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;

        const padding = 20;
        this.radius = this.centerY - areaParams.borderWidth - padding;
    }

    public draw() {
        const { fillStyle, strokeStyle, borderWidth } = areaParams;

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

    public getAreaParams(): IArea {
        return {
            radius: this.radius,
            centerX: this.centerX,
            centerY: this.centerY,
        };
    }
}

interface IProps {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
}