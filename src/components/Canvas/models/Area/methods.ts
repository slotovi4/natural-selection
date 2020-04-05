import { Area } from './Area';

export const drawArea = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const area = new Area(ctx, canvas);

    area.draw();

    return area;
};