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

const createFoodArray = ({ ctx, area, foodControlParams }: ICreateFoodProps) => {
    return drawFood({ ctx, area, ...foodControlParams });
};

const createCreatureArray = ({ ctx, area, creatureControlParams, selectionControlParams }: ICreateCreatureProps) => {
    return drawCreature({ ctx, area, ...creatureControlParams, ...selectionControlParams });
};

export const updateNaturalSelectionInitParams = ({
    canvas,
    area,
    foodControlParams,
    creatureControlParams,
    selectionControlParams
}: IUpdateInitProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArea(ctx, canvas);
        const foodArray = createFoodArray({ ctx, area, foodControlParams });
        const creatureArray = createCreatureArray({ ctx, area, creatureControlParams, selectionControlParams });

        return { foodArray, creatureArray, area };
    }

    return null;
};

export const init = ({
    canvas,
    foodControlParams,
    creatureControlParams,
    selectionControlParams
}: IInitProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const areaModel = drawArea(ctx, canvas);
        const area = areaModel.getAreaParams();

        const foodArray = createFoodArray({ ctx, area, foodControlParams });
        const creatureArray = createCreatureArray({ ctx, area, creatureControlParams, selectionControlParams });

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
    setSelectionResultData,
}: IRenderProps) => {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const resultArray: IDayResult[] = [];
        const { foodCount } = foodControlParams;
        const { selectionDays, selectionSpeed } = selectionControlParams;

        let day = 0;
        let dayEnd = false;
        let newCreatureArray = creatureArray;
        let newFoodArray = foodArray;

        const animate = () => {
            const haveLiveCreatures = resultArray[day - 1] ? resultArray[day - 1].survivedCount > 0 : true;

            if (day !== selectionDays && haveLiveCreatures) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawArea(ctx, canvas);
                updateFood(newFoodArray);
                newCreatureArray = updateCreature(newCreatureArray, newFoodArray, dayEnd);

                dayEnd = checkEndDay(newCreatureArray);

                if (dayEnd) {
                    resultArray.push(getDayResult(newCreatureArray));

                    newFoodArray = drawFood({ ctx, area, foodCount });
                    newCreatureArray = getNextDayCreatureArray({ endDayCreatureArray: newCreatureArray, ctx, area, selectionSpeed });

                    day += 1;
                }

                requestAnimationFrame(animate);
            } else {
                setSelectionResultData(resultArray);
                stopSelection();
            }
        };

        animate();
    }
};

interface IRenderProps extends IRenderAreaElements, IInitProps {
    stopSelection: () => void;
    setSelectionResultData: (data: IDayResult[]) => void;
}

interface IUpdateInitProps extends IInitProps {
    area: IArea;
}

interface ICreateFoodProps extends ICreateProps {
    foodControlParams: IFoodControlParams;
}

interface ICreateCreatureProps extends ICreateProps {
    creatureControlParams: ICreatureControlParams;
    selectionControlParams: ISelectionControlParams;
}

interface ICreateProps {
    ctx: CanvasRenderingContext2D;
    area: IArea;
}

interface IInitProps {
    canvas: HTMLCanvasElement;
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
}