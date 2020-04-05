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

    const creatureArray = drawCreature(canvas, area.radius);
    const foodArray = drawFood(canvas, area.radius);

    return { foodArray, creatureArray, area };
};

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const { foodArray, creatureArray, area } = init(canvas, ctx);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawArea(ctx, canvas);
            updateFood(foodArray);
            updateCreature(creatureArray, foodArray, area);

            requestAnimationFrame(animate);
        };

        animate();
    }
};