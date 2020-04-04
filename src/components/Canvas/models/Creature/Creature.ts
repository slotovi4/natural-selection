import { creatureParams } from './params';
import { calcPointDistance, randomIntFromRange } from '../helpers';

export class Creature {
    public x: number;
    public y: number;
    public radius: number;
    private visibilityRadius: number;
    private velocity: number;
    private foodWasGrabbed: boolean;
    private dX: number;
    private dY: number;
    private stepDirectionCount: number;
    private onAreaCenter: boolean;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.radius = creatureParams.radius;
        this.velocity = creatureParams.velocity;
        this.visibilityRadius = creatureParams.visibilityRadius;
        this.foodWasGrabbed = false;
        this.stepDirectionCount = 0;
        this.onAreaCenter = false;

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

        // draw visibilityRadius
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius + this.visibilityRadius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public update(foodArray: IFood[], area: IArea) {
        if (!this.foodWasGrabbed) {
            this.searchFood(foodArray, area);
        }

        if (this.onAreaCenter) {
            this.stepDirectionCount += 1;
        }

        this.draw();
    }

    private searchFood(foodArray: IFood[], area: IArea) {
        const nearestFood = this.findNearestFood(foodArray);

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

    private findNearestFood(foodArray: IFood[]) {
        // отфильтровать еду и оставить только ту которая в радиусе видимости
        const visibilityFoodArray = foodArray.filter(
            food => calcPointDistance(this.x, this.y, food.x, food.y) < this.radius + this.visibilityRadius + food.radius
        );

        const visibilityFoodArrayLength = visibilityFoodArray.length;
        let nearestFood: IFood | null = null;

        // выбрать ближайший кусок еды из еды в области видимости
        for (let i = 0; i < visibilityFoodArrayLength; i++) {
            const food = visibilityFoodArray[i];
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
        // if creature position not on area center
        if (!this.onAreaCenter) {
            this.moveToAreaCenter(area);
        }

        // if creature reached area center
        if (this.creatureReachedAreaCenter(area) || this.onAreaCenter) {
            this.moveToRandomDirection(area);
        }
    }

    private moveToRandomDirection(area: IArea) {
        this.onAreaCenter = true;

        // create move direction
        if (!(this.stepDirectionCount % 50)) {
            this.dX = this.randomDirection();
            this.dY = this.randomDirection();
        }

        // if creature outside area
        if (!this.creatureInsideArea(area)) {
            this.dX *= -1;
            this.dY *= -1;
            this.stepDirectionCount = 0;
        }

        // move creature
        this.x += this.dX;
        this.y += this.dY;
    }

    private moveToAreaCenter(area: IArea) {
        if (this.x > area.centerX) {
            this.x -= this.velocity;
        } else {
            this.x += this.velocity;
        }

        if (this.y > area.centerY) {
            this.y -= this.velocity;
        } else {
            this.y += this.velocity;
        }
    }

    /**
     * Проверка, добыла ли еду сущность
     * @param food 
     */
    private foodWasGrabbedCheck(food: IFood) {
        return calcPointDistance(this.x, this.y, food.x, food.y) <= this.radius + food.radius;
    }

    /**
     * Проверка, на нахождение сущности в пределах области
     * @param area 
     */
    private creatureInsideArea(area: IArea) {
        return calcPointDistance(this.x + this.dX, this.y + this.dY, area.centerX, area.centerY) <= this.radius + area.radius; // FIX & UPDATE
    }

    /**
     * Проверка, дошла ли сущность до центра области
     * @param area 
     */
    private creatureReachedAreaCenter(area: IArea) {
        return calcPointDistance(this.x, this.y, area.centerX, area.centerY) <= this.radius * 2;
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