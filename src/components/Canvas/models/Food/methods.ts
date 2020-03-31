import { Food } from './Food';
// import {randomIntFromRange} from '../../helpers';
import { calcPointDistance } from '../helpers';

// https://programming.guide/random-point-within-circle.html

export const createFood = (canvas: HTMLCanvasElement, areaRadius: number) => {
    const foodArray: Food[] = [];
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (ctx) {
        const foodRadius = 10;
        const foodDistance = foodRadius / 2;

        const areaSquare = Math.floor(Math.PI * Math.pow(areaRadius, 2));
        const foodSquare = Math.floor(Math.PI * Math.pow(foodRadius + foodDistance, 2));

        const maxFoodCount = Math.floor(areaSquare / foodSquare);

        for (let i = 0; i < maxFoodCount; i++) {
            // const angle = Math.random() * Math.PI * 2;
            // const areaBorderXCoordinate = centerX + Math.cos(angle) * areaRadius;
            // const areaBorderYCoordinate = centerY + Math.sin(angle) * areaRadius;


            // const x = minXCoordinate; // randomIntFromRange(minXCoordinate, minXCoordinate + areaRadius);
            // const y = minYCoordinate; // randomIntFromRange(minYCoordinate, minYCoordinate + areaRadius);

            const randomAngle = Math.random() * 2 * Math.PI;
            const randomRadius = (areaRadius - foodRadius) * Math.sqrt(Math.random());

            const x = randomRadius * Math.cos(randomAngle) + centerX;
            const y = randomRadius * Math.sin(randomAngle) + centerY;

            let newFood: Food | null = new Food(x, y, ctx);

            if (i !== 0) {
                for (let j = 0; j < foodArray.length; j++) {
                    const pointDistance = calcPointDistance(x, y, foodArray[j].x, foodArray[j].y);

                    if (pointDistance < foodRadius * 2) {
                        newFood = null;
                        break;
                    }
                }
            }

            if (newFood) {
                foodArray.push(newFood);
            }
        }
    }

    return foodArray;
};

export const drawFood = (canvas: HTMLCanvasElement, areaRadius: number) => {
    const foodArray = createFood(canvas, areaRadius);

    foodArray.forEach(food => {
        food.draw();
    });
};