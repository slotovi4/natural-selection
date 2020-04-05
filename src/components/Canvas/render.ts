import {
    drawFood,
    drawArea,
    drawCreature,
    updateFood,
    updateCreature,
} from './models';

const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const areaModel = drawArea(ctx, canvas);
    const area = areaModel.getArea();

    const creatureArray = drawCreature(canvas, area);
    const foodArray = drawFood(canvas, area.radius);

    return { foodArray, creatureArray };
};

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    // const fps = 60;

    if (ctx) {
        const { foodArray, creatureArray } = init(canvas, ctx);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawArea(ctx, canvas);
            updateFood(foodArray);
            updateCreature(creatureArray, foodArray);

            // setTimeout(() => {
                requestAnimationFrame(animate);
            // }, 1000 / fps);
        };

        animate();
    }
};