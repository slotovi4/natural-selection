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
import { IArea } from './models/interface';
import { Food } from './models/Food/Food';
import { Creature } from './models/Creature/Creature';

export const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if(ctx) {
        const areaModel = drawArea(ctx, canvas);
        const area = areaModel.getArea();

        const creatureArray = drawCreature(ctx, area);
        const foodArray = drawFood(ctx, area);

        return { foodArray, creatureArray, area };
    }

    return null;
};

export const renderNaturalSelectionWorld = ({ canvas, stopSelection, foodArray, creatureArray, area }: IRenderProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
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
                stopSelection();
                console.log(resultArray);
            }
        };

        animate();
    }
};

interface IRenderProps extends IRenderAreaElements {
    canvas: HTMLCanvasElement;
    stopSelection: () => void;
}

export interface IRenderAreaElements {
    foodArray: Food[];
    creatureArray: Creature[];
    area: IArea;
}