import { creatureParams } from './params';
import { calcPointDistance, randomIntFromRange } from '../helpers';

export class Creature {
    public x: number;
    public y: number;
    public radius: number;
    private sensitivityRadius: number;
    private velocity: number;
    private foodWasGrabbed: boolean;
    private dX: number;
    private dY: number;
    private stepCount: number;
    private stepDirectionCount: number;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.radius = creatureParams.radius;
        this.velocity = creatureParams.velocity;
        this.sensitivityRadius = creatureParams.sensitivityRadius;
        this.foodWasGrabbed = false;
        this.stepCount = 0;
        this.stepDirectionCount = 0;

        this.dX = this.randomDirection();
        this.dY = this.randomDirection();
    }

    public draw() {
        const { fillStyle, strokeStyle, lineWidth } = creatureParams;

        // draw creature
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.closePath();

        // draw sensitivityRadius
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius + this.sensitivityRadius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public update(foodArray: IFood[], area: IArea) {
        if (!this.foodWasGrabbed) {
            const nearestFood = this.findFood(foodArray);

            if (nearestFood) {
                if (this.foodWasGrabbedCheck(nearestFood)) {
                    this.foodWasGrabbed = true;
                } {
                    this.moveToTheFood(nearestFood);
                }
            } else {
                this.move(area);
            }
        }

        this.stepCount += 1;
        this.stepDirectionCount += 1;
        this.draw();
    }

    private findFood(foodArray: IFood[]) {
        // отфильтровать еду и оставить только ту которая в радиусе чуствительности
        const sensitivityFoodArray = foodArray.filter(
            food => calcPointDistance(this.x, this.y, food.x, food.y) < this.radius + this.sensitivityRadius + food.radius
        );

        const sensitivityFoodArrayLength = sensitivityFoodArray.length;
        let nearestFood: IFood | null = null;

        // выбрать ближайший кусок еды из отфильтрованной еды
        for (let i = 0; i < sensitivityFoodArrayLength; i++) {
            const food = sensitivityFoodArray[i];
            const foodDistance = calcPointDistance(this.x, this.y, food.x, food.y);

            if (nearestFood) {
                const nearestFoodDistance = calcPointDistance(this.x, this.y, nearestFood.x, nearestFood.y);

                if (nearestFoodDistance > foodDistance) {
                    nearestFood = food;
                }
            } else {
                nearestFood = food;
            }
        }

        return nearestFood;
    }

    private moveToTheFood(food: IFood) {
        if (this.x > food.x) {
            this.x -= this.velocity;
        } else {
            this.x += this.velocity;
        }

        if (this.y > food.y) {
            this.y -= this.velocity;
        } else {
            this.y += this.velocity;
        }
    }

    private move(area: IArea) {
        // create move direction
        if (!(this.stepDirectionCount % 50)) {
            this.dX = this.randomDirection();
            this.dY = this.randomDirection();
        }

        // if creature outside area
        if(!this.creatureInsideArea(area)) {
            this.dX *= -1;
            this.dY *= -1;
            this.stepDirectionCount = 0;
        }

        // move creature
        this.x += this.dX;
        this.y += this.dY;
    }

    private foodWasGrabbedCheck(food: IFood) {
        return calcPointDistance(this.x, this.y, food.x, food.y) < this.radius + food.radius; // вынести как отд функцию
    }

    private creatureInsideArea(area: IArea) {
        return calcPointDistance(this.x + this.dX, this.y + this.dY, area.centerX, area.centerY) < this.radius + area.radius; // вынести как отд функцию
    }

    private randomDirection() {
        return randomIntFromRange(0, 1) ? this.velocity : -this.velocity;
    }
}

export interface IFood {
    x: number;
    y: number;
    radius: number;
}

export interface IArea {
    centerX: number;
    centerY: number;
    radius: number;
}