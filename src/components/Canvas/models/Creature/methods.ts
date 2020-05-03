import { Creature } from './Creature';
import { Posterity } from './Posterity';
import { creatureParams } from './config';
import { IArea, IFood } from '../interface';

const getCreatureData = (props: ICreatureSettingsProps) => {
    const creatureRadius = creatureParams.radius;
    const randomAngle = Math.random() * 2 * Math.PI;
    const R = props.area.radius - creatureRadius - 3;

    const x = R * Math.cos(randomAngle) + props.area.centerX;
    const y = R * Math.sin(randomAngle) + props.area.centerY;

    return { x, y, ...props };
};

const createCreature = (props: ICreatureSettingsProps) => {
    return new Creature(getCreatureData(props));
};

const createPosterity = (props: ICreatePosterityProps) => {
    return new Posterity({ ...getCreatureData(props), canMutate: props.canMutate });
};

const createCreatureArray = ({ ctx, area, creatureCount, selectionSpeed, mutationChance, canMutate }: ICreateCreatureArrayProps) => {
    const creatureArray: Creature[] = [];

    for (let i = 0; i < creatureCount; i++) {
        creatureArray.push(createCreature({ ctx, area, selectionSpeed, mutationChance, canMutate }));
    }

    return creatureArray;
};

const getSurvivedCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => creature.grabbedFoodCount && !creature.isDie && creature.returnedToHome);
};

const getDeadCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => creature.isDie);
};

const getOffspringCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => creature.grabbedFoodCount === 2 && !creature.isDie && creature.returnedToHome);
};

export const drawCreature = ({ ctx, area, creatureCount, selectionSpeed, mutationChance, canMutate }: ICreateCreatureArrayProps) => {
    const creatureArray = createCreatureArray({ ctx, area, creatureCount, selectionSpeed, mutationChance, canMutate });

    creatureArray.forEach(creature => {
        creature.draw();
    });

    return creatureArray;
};

export const updateCreature = (creatureArray: Creature[], foodArray: IFood[], dayEnd: boolean) => {
    const newCreatureArray: Creature[] = [];

    creatureArray.forEach(creature => {
        newCreatureArray.push(creature.update(foodArray, dayEnd));
    });

    return newCreatureArray;
};

export const checkEndDay = (creatureArray: Creature[]) => creatureArray.every(creature => creature.isDie || creature.returnedToHome);

export const getNextDayCreatureArray = ({ endDayCreatureArray, ctx, area, selectionSpeed, mutationChance, canMutate }: IGetNextDayCreature) => {
    const nextDayCreatureArray = [];
    const posterityCreaturesArray = [];

    const survivedCreatures = getSurvivedCreatures(endDayCreatureArray);
    const offspringCreaturesCount = getOffspringCreatures(endDayCreatureArray).length;

    for (let i = 0; i < offspringCreaturesCount; i++) {
        posterityCreaturesArray.push(createPosterity({ ctx, area, selectionSpeed, mutationChance, canMutate }));
    }

    nextDayCreatureArray.push(...survivedCreatures, ...posterityCreaturesArray);

    return nextDayCreatureArray;
};

export const getDayResult = (endDayCreatureArray: Creature[]): IDayResult => {
    const survivedCreatures = getSurvivedCreatures(endDayCreatureArray);

    return ({
        dieCount: getDeadCreatures(endDayCreatureArray).length,
        survivedCount: survivedCreatures.length,
        offspringCount: getOffspringCreatures(endDayCreatureArray).length,
        survivedCreatures: survivedCreatures.map(creature => creature.getCreatureParams())
    });
};

export interface IDayResult {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
    survivedCreatures: ICreatureParams[];
}

interface ICreatureSettingsProps extends IDefaultProps {
    selectionSpeed: number;
    mutationChance: number;
    canMutate: boolean;
}

interface ICreatePosterityProps extends ICreatureSettingsProps {
    canMutate: boolean;
}

interface ICreateCreatureArrayProps extends ICreatureSettingsProps {
    creatureCount: number;
}

interface IGetNextDayCreature extends ICreatureSettingsProps {
    endDayCreatureArray: Creature[];
    canMutate: boolean;
}

interface IDefaultProps {
    ctx: CanvasRenderingContext2D;
    area: IArea;
}

interface ICreatureParams {
    velocity: number;
}