import { Creature } from './Creature';
import { creatureParams } from './config';
import { IArea, IFood } from '../interface';

const createCreature = ({ ctx, area, selectionSpeed, isPosterity, mutationChance }: ICreateCreatureProps) => {
    const creatureRadius = creatureParams.radius;
    const randomAngle = Math.random() * 2 * Math.PI;
    const R = area.radius - creatureRadius - 3;

    const x = R * Math.cos(randomAngle) + area.centerX;
    const y = R * Math.sin(randomAngle) + area.centerY;

    return new Creature({ x, y, ctx, area, selectionSpeed, isPosterity, mutationChance });
};

const createCreatureArray = ({ ctx, area, creatureCount, selectionSpeed, mutationChance }: ICreateCreatureArrayProps) => {
    const creatureArray: Creature[] = [];

    for (let i = 0; i < creatureCount; i++) {
        creatureArray.push(createCreature({ ctx, area, selectionSpeed, mutationChance }));
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

export const drawCreature = ({ ctx, area, creatureCount, selectionSpeed, mutationChance }: ICreateCreatureArrayProps) => {
    const creatureArray = createCreatureArray({ ctx, area, creatureCount, selectionSpeed, mutationChance });

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
        posterityCreaturesArray.push(createCreature({ ctx, area, selectionSpeed, mutationChance, isPosterity: canMutate }));
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

interface ICreateCreatureProps extends IDefaultProps {
    selectionSpeed: number;
    mutationChance: number;
}

interface ICreateCreatureArrayProps extends ICreateCreatureProps {
    creatureCount: number;
}

interface IGetNextDayCreature extends ICreateCreatureProps {
    endDayCreatureArray: Creature[];
    canMutate: boolean;
}

interface IDefaultProps {
    ctx: CanvasRenderingContext2D;
    area: IArea;
    isPosterity?: boolean;
}

interface ICreatureParams {
    velocity: number;
}