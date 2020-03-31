import { drawFood, drawArea } from './models';

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const areaModel = drawArea(ctx, canvas);
        const { radius } = areaModel.getArea();

        drawFood(canvas, radius);

        // setTimeout(() => {
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     requestAnimationFrame(() => {
        //         renderArea(canvas);
        //     });
        // }, 100);
    }
};