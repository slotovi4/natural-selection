export class Area {
    public radius: number;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    public constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    public draw() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const borderWidth = 5;
        this.radius = centerY - borderWidth;

        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeStyle = '#003300';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public getArea() {
        return { 
            radius: this.radius,
        };
    }
}