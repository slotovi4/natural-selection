import { Creature, ICreatureParams } from './Creature';
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
    return new Posterity({ ...getCreatureData(props), ...props });
};

const createCreatureArray = ({ ctx, area, creatureCount, selectionSpeed, mutationChance, canMutate }: ICreateCreatureArrayProps) => {
    const creatureArray: Creature[] = [];

    for (let i = 0; i < creatureCount; i++) {
        creatureArray.push(createCreature({ ctx, area, selectionSpeed, mutationChance, canMutate }));
    }

    return creatureArray;
};

const getSurvivedCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => {
        const { grabbedFoodCount, isDie, returnedToHome } = creature.getCreatureParams();

        return grabbedFoodCount && !isDie && returnedToHome;
    });
};

const getDeadCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => creature.getCreatureParams().isDie);
};

const getOffspringCreatures = (creatureArray: Creature[]) => {
    return creatureArray.filter(creature => {
        const { grabbedFoodCount, isDie, returnedToHome } = creature.getCreatureParams();

        return grabbedFoodCount === 2 && !isDie && returnedToHome;
    });
};

const removeCreatureFromArray = (creature: Creature, creatureArray: Creature[]) => {
    return creatureArray.filter(nCreature => {
        const nParams = nCreature.getCreatureParams();
        const params = creature.getCreatureParams();

        return nParams.x !== params.x && nParams.y !== params.y;
    });
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
        newCreatureArray.push(creature.update(foodArray, removeCreatureFromArray(creature, newCreatureArray), dayEnd));
    });

    return newCreatureArray;
};

export const checkEndDay = (creatureArray: Creature[]) => creatureArray.every(creature => {
    const { isDie, returnedToHome } = creature.getCreatureParams();
    
    return isDie || returnedToHome;
});

export const getNextDayCreatureArray = ({ endDayCreatureArray, ...props }: IGetNextDayCreature) => {
    const nextDayCreatureArray = [];
    const posterityCreaturesArray = [];

    const survivedCreatures = getSurvivedCreatures(endDayCreatureArray);
    const offspringCreatures = getOffspringCreatures(endDayCreatureArray);
    const offspringCreaturesCount = offspringCreatures.length;

    for (let i = 0; i < offspringCreaturesCount; i++) {
        const { visibilitySize, velocity, energyIntensity, size } = offspringCreatures[i].getCreatureParams();

        posterityCreaturesArray.push(createPosterity({
            ...props,
            parentVelocity: velocity,
            parentVisibilitySize: visibilitySize,
            parentEnergyIntensity: energyIntensity,
            parentSize: size,
        }));
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
    parentVelocity: number;
    parentVisibilitySize: number;
    parentEnergyIntensity: number;
    parentSize: number;
    canMutateVelocity: boolean;
    canMutateVisibility: boolean;
    canMutateSize: boolean;
}

interface ICreateCreatureArrayProps extends ICreatureSettingsProps {
    creatureCount: number;
}

interface IGetNextDayCreature extends ICreatureSettingsProps {
    endDayCreatureArray: Creature[];
    canMutateVelocity: boolean;
    canMutateVisibility: boolean;
    canMutateSize: boolean;
}

interface IDefaultProps {
    ctx: CanvasRenderingContext2D;
    area: IArea;
}