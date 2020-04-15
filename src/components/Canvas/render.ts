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

const createCreatureArray = (ctx: CanvasRenderingContext2D, area: IArea, creatureControlParams: ICreatureControlParams, selectionControlParams: ISelectionControlParams) => {
    return drawCreature(ctx, area, creatureControlParams.creatureCount, selectionControlParams.selectionSpeed);
};

export const updateNaturalSelectionInitParams = ({ canvas, area, foodControlParams, creatureControlParams, selectionControlParams }: IUpdateInitProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArea(ctx, canvas);
        const foodArray = createFoodArray(ctx, area, foodControlParams);
        const creatureArray = createCreatureArray(ctx, area, creatureControlParams, selectionControlParams);
        
        return { foodArray, creatureArray, area };
    }

    return null;
};

export const init = ({ canvas, foodControlParams, creatureControlParams, selectionControlParams }: IInitProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const areaModel = drawArea(ctx, canvas);
        const area = areaModel.getArea();

        const foodArray = createFoodArray(ctx, area, foodControlParams);
        const creatureArray = createCreatureArray(ctx, area, creatureControlParams, selectionControlParams);
    
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
            const haveLiveCreatures = resultArray[day - 1] ? resultArray[day - 1].survivedCount > 0 : true;
            
            if (day !== selectionControlParams.selectionDays && haveLiveCreatures) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawArea(ctx, canvas);
                updateFood(newFoodArray);
                newCreatureArray = updateCreature(newCreatureArray, newFoodArray, dayEnd);

                dayEnd = checkEndDay(newCreatureArray);

                if (dayEnd) {
                    resultArray.push(getDayResult(newCreatureArray));

                    newFoodArray = drawFood(ctx, area, foodCount);
                    newCreatureArray = getNextDayCreatureArray(newCreatureArray, ctx, area, selectionControlParams.selectionSpeed);

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

interface IInitProps {
    canvas: HTMLCanvasElement;
    foodControlParams: IFoodControlParams;
    creatureControlParams: ICreatureControlParams;
    selectionControlParams: ISelectionControlParams;
}

interface IUpdateInitProps {
    canvas: HTMLCanvasElement;
    area: IArea;
    foodControlParams: IFoodControlParams;
    creatureControlParams: ICreatureControlParams;
    selectionControlParams: ISelectionControlParams;
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
    selectionSpeed: number;
    start: boolean;
}