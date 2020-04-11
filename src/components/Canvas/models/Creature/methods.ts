import { Creature } from './Creature';
import { creatureParams } from './config';
import { IArea, IFood } from "../interface";

const createCreature = (ctx: CanvasRenderingContext2D, area: IArea) => {
    const creatureRadius = creatureParams.radius;
    const randomAngle = Math.random() * 2 * Math.PI;

    const x = (area.radius - creatureRadius) * Math.cos(randomAngle) + area.centerX;
    const y = (area.radius - creatureRadius) * Math.sin(randomAngle) + area.centerY;

    return new Creature(x, y, ctx, area);
};

const createCreatureArray = (ctx: CanvasRenderingContext2D, area: IArea) => {
    const creatureArray: Creature[] = [];

    for (let i = 0; i < 5; i++) {
        creatureArray.push(createCreature(ctx, area));
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

export const drawCreature = (ctx: CanvasRenderingContext2D, area: IArea) => {
    const creatureArray = createCreatureArray(ctx, area);

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

export const getNextDayCreatureArray = (endDayCreatureArray: Creature[], ctx: CanvasRenderingContext2D, area: IArea) => {
    const nextDayCreatureArray = [];
    const posterityCreaturesArray = [];

    const survivedCreatures = getSurvivedCreatures(endDayCreatureArray);
    const offspringCreaturesCount = getOffspringCreatures(endDayCreatureArray).length;

    for (let i = 0; i < offspringCreaturesCount; i++) {
        posterityCreaturesArray.push(createCreature(ctx, area));
    }

    nextDayCreatureArray.push(...survivedCreatures, ...posterityCreaturesArray);

    return nextDayCreatureArray;
};

export const getDayResult = (endDayCreatureArray: Creature[]): IDayResult => {
    return ({
        dieCount: getDeadCreatures(endDayCreatureArray).length,
        survivedCount: getSurvivedCreatures(endDayCreatureArray).length,
        offspringCount: getOffspringCreatures(endDayCreatureArray).length,
    });
};

export interface IDayResult {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
}