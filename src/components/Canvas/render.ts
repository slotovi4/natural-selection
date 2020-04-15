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

const createFoodArray = (ctx: CanvasRenderingContext2D, area: IArea, foodControlParams: IFoodControlParams) => {
    return drawFood(ctx, area, foodControlParams.foodCount);
};

const createCreatureArray = (ctx: CanvasRenderingContext2D, area: IArea, creatureControlParams: ICreatureControlParams) => {
    return drawCreature(ctx, area, creatureControlParams.creatureCount);
};

export const updateNaturalSelectionInitParams = ({ canvas, area, foodControlParams, creatureControlParams }: IUpdateInitProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArea(ctx, canvas);
        const foodArray = createFoodArray(ctx, area, foodControlParams);
        const creatureArray = createCreatureArray(ctx, area, creatureControlParams);

        return { foodArray, creatureArray, area };
    }

    return null;
};

export const init = (canvas: HTMLCanvasElement, foodControlParams: IFoodControlParams, creatureControlParams: ICreatureControlParams) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const areaModel = drawArea(ctx, canvas);
        const area = areaModel.getArea();

        const foodArray = createFoodArray(ctx, area, foodControlParams);
        const creatureArray = createCreatureArray(ctx, area, creatureControlParams);

        return { foodArray, creatureArray, area };
    }

    return null;
};

export const renderNaturalSelectionWorld = ({
    area,
    canvas,
    stopSelection,
    foodArray,
    creatureArray,
    foodControlParams,
    selectionControlParams,
}: IRenderProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const resultArray: IDayResult[] = [];
        const { foodCount } = foodControlParams;

        let day = 0;
        let dayEnd = false;
        let newCreatureArray = creatureArray;
        let newFoodArray = foodArray;

        const animate = () => {
            if (day !== selectionControlParams.selectionDays) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawArea(ctx, canvas);
                updateFood(newFoodArray);
                newCreatureArray = updateCreature(newCreatureArray, newFoodArray, dayEnd);

                dayEnd = checkEndDay(newCreatureArray);

                if (dayEnd) {
                    resultArray.push(getDayResult(newCreatureArray));

                    newFoodArray = drawFood(ctx, area, foodCount);
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
    foodControlParams: IFoodControlParams;
    creatureControlParams: ICreatureControlParams;
    selectionControlParams: ISelectionControlParams;
    stopSelection: () => void;
}

interface IUpdateInitProps {
    canvas: HTMLCanvasElement;
    area: IArea;
    foodControlParams: IFoodControlParams;
    creatureControlParams: ICreatureControlParams;
}

export interface IRenderAreaElements {
    foodArray: Food[];
    creatureArray: Creature[];
    area: IArea;
}

export interface IFoodControlParams {
    foodCount: number;
}

export interface ICreatureControlParams {
    creatureCount: number;
}

export interface ISelectionControlParams {
    selectionDays: number;
    start: boolean;
}