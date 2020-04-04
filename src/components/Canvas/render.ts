import {
    drawFood,
    drawArea,
    drawCreature,
    updateFood,
    updateCreature,
} from './models';

const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const areaModel = drawArea(ctx, canvas);
    const { radius } = areaModel.getArea();

    const creatureArray = drawCreature(canvas, radius);
    const foodArray = drawFood(canvas, radius);

    return { foodArray, creatureArray };
};

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const { foodArray, creatureArray } = init(canvas, ctx);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawArea(ctx, canvas);
            updateFood(foodArray);
            updateCreature(creatureArray);

            requestAnimationFrame(animate);
        };

        animate();
    }
};