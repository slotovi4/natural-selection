import { Food } from './Food';
import { calcPointDistance } from '../helpers';
import { foodParams } from './params';
/**
 * Создание массива еды для области
 * https://programming.guide/random-point-within-circle.html
 * @param canvas 
 * @param areaRadius 
 */
const createFood = (canvas: HTMLCanvasElement, areaRadius: number) => {
    const foodArray: Food[] = [];
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (ctx) {
        const foodRadius = foodParams.radius;
        const foodDistance = foodRadius;

        const areaSquare = Math.floor(Math.PI * Math.pow(areaRadius, 2));
        const foodSquare = Math.floor(Math.PI * Math.pow(foodRadius + foodDistance, 2));

        const maxFoodCount = Math.floor(areaSquare / foodSquare);
        const foodCount = Math.floor(maxFoodCount / 20); // !!1 custom

        for (let i = 0; i < 3; i++) {
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomRadius = (areaRadius - foodRadius) * Math.sqrt(Math.random());

            const x = randomRadius * Math.cos(randomAngle) + centerX;
            const y = randomRadius * Math.sin(randomAngle) + centerY;

            let newFood: Food | null = new Food(x, y, ctx);

            if (i !== 0) {
                for (let j = 0; j < foodArray.length; j++) {
                    const pointDistance = calcPointDistance(x, y, foodArray[j].x, foodArray[j].y);
                    const minimumDistance = foodRadius * 2 + foodDistance;

                    if (pointDistance < minimumDistance) {
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

export const drawFood = (canvas: HTMLCanvasElement, areaRadius: number, arr?: Food[]) => {
    const foodArray = arr || createFood(canvas, areaRadius);

    foodArray.forEach(food => {
        food.draw();
    });

    return foodArray;
};

export const updateFood = (foodArray: Food[]) => {
    foodArray.forEach(food => {
        food.draw();
    });
};