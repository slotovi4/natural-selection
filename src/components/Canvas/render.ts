import {
    drawFood,
    drawArea,
    drawCreature,
    updateFood,
    updateCreature,
    checkEndDay,
    getDayResult,
    getNextDayCreatureArray,
    IResult,
} from './models';

const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const areaModel = drawArea(ctx, canvas);
    const area = areaModel.getArea();

    const creatureArray = drawCreature(canvas, area);
    const foodArray = drawFood(canvas, area.radius);

    return { foodArray, creatureArray, area };
};

export const renderNaturalSelectionWorld = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const { foodArray, creatureArray, area } = init(canvas, ctx);

        const resultArray: IResult[] = [];
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

                    newFoodArray = drawFood(canvas, area.radius);
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