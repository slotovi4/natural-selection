import {
    drawFood,
    drawArea,
    drawCreature,
    updateFood,
    updateCreature,
    checkEndDay,
    getDayResult,
    getNextDayCreatureArray,
    IDayResult,
} from './models';

const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const areaModel = drawArea(ctx, canvas);
    const area = areaModel.getArea();

    const creatureArray = drawCreature(ctx, area);
    const foodArray = drawFood(ctx, area);

    return { foodArray, creatureArray, area };
};

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const { foodArray, creatureArray, area } = init(canvas, ctx);

        const resultArray: IDayResult[] = [];
        let day = 0;
        let dayEnd = false;
        let newCreatureArray = creatureArray;
        let newFoodArray = foodArray;

        const animate = () => {
            if (day !== 5) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawArea(ctx, canvas);
                updateFood(newFoodArray);
                newCreatureArray = updateCreature(newCreatureArray, newFoodArray, dayEnd);

                dayEnd = checkEndDay(newCreatureArray);

                if (dayEnd) {
                    resultArray.push(getDayResult(newCreatureArray));

                    newFoodArray = drawFood(ctx, area);
                    newCreatureArray = getNextDayCreatureArray(newCreatureArray, ctx, area);

                    day += 1;
                }

                requestAnimationFrame(animate);
            } else {
                console.log(resultArray);
            }
        };

        animate();
    }
};