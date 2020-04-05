import { Creature, IFood, IArea } from './Creature';
import { calcPointDistance } from '../helpers';
import { creatureParams } from './params';

const createCreature = (canvas: HTMLCanvasElement, areaRadius: number) => {
    const creatureArray: Creature[] = [];
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (ctx) {
        const creatureRadius = creatureParams.radius;

        for (let i = 0; i < 1; i++) {
            const randomAngle = Math.random() * 2 * Math.PI;

            const x = (areaRadius - creatureRadius) * Math.cos(randomAngle) + centerX;
            const y = (areaRadius - creatureRadius) * Math.sin(randomAngle) + centerY;

            let newCreature: Creature | null = new Creature(x, y, ctx);

            if (i !== 0) {
                for (let j = 0; j < creatureArray.length; j++) {
                    const pointDistance = calcPointDistance(x, y, creatureArray[j].x, creatureArray[j].y);

                    if (pointDistance < creatureRadius * 2) {
                        newCreature = null;
                        break;
                    }
                }
            }

            if (newCreature) {
                creatureArray.push(newCreature);
            }
        }
    }

    return creatureArray;
};

export const drawCreature = (canvas: HTMLCanvasElement, areaRadius: number) => {
    const creatureArray = createCreature(canvas, areaRadius);

    creatureArray.forEach(creature => {
        creature.draw();
    });

    return creatureArray;
};

export const updateCreature = (creatureArray: Creature[], foodArray: IFood[], area: IArea) => {
    creatureArray.forEach(creature => {
        creature.update(foodArray, area);
    });
};

