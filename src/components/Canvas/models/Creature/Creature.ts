import { creatureParams } from './params';
import { calcPointDistance, randomIntFromRange, getNearestPointFromPointsArray } from '../helpers';

export class Creature {
    public x: number;
    public y: number;
    public radius: number;

    private visibilityRadius: number;
    private velocity: number;
    private grabbedFoodCount: number;
    private dX: number;
    private dY: number;
    private stepDirectionCount: number;
    private stepDirectionChangeNum: number;
    private onAreaCenter: boolean;
    private returnedToHome: boolean;
    private step: number;
    private energy: number;
    private energyIntensity: number;

    private area: IArea;
    private ctx: CanvasRenderingContext2D;

    public constructor(x: number, y: number, ctx: CanvasRenderingContext2D, area: IArea) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.area = area;

        this.radius = creatureParams.radius;
        this.velocity = creatureParams.velocity;
        this.visibilityRadius = creatureParams.visibilityRadius;
        this.stepDirectionCount = 0;
        this.onAreaCenter = false;
        this.grabbedFoodCount = 0;
        this.returnedToHome = false;
        this.step = 0;
        this.energyIntensity = 2;
        this.energy = 100 * this.energyIntensity;

        this.stepDirectionChangeNum = this.randomStepDirectionChangeNum();
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

    public update(foodArray: IFood[]) {
        if (!this.returnedToHome && !this.checkDeath()) {
            if (!this.grabbedFoodCount) {
                this.searchFood(foodArray);
            }

            else if (this.grabbedFoodCount === 1) {
                this.goHome();
            }

            if (this.onAreaCenter) {
                this.stepDirectionCount += 1;
            }

            this.step += 1;
            this.draw();
        }
    }

    private searchFood(foodArray: IFood[]) {
        const nearestFood = this.findNearestFood(foodArray);

        if (nearestFood) {
            if (this.foodWasGrabbedCheck(nearestFood)) {
                this.grabbedFoodCount += 1;
                this.energy = 100;
                nearestFood.eat();
            } {
                this.moveToThePoint(nearestFood);
            }
        } else {
            this.move();
        }
    }

    private goHome() {
        if (!this.creatureInsideArea()) {
            this.returnedToHome = true;
        } else {
            const areaPoints = this.getAreaPoints();
            const nearestAreaExitPoint = getNearestPointFromPointsArray(areaPoints, { x: this.x, y: this.y });

            if (nearestAreaExitPoint) {
                this.moveToThePoint(nearestAreaExitPoint);
            }
        }
    }

    private findNearestFood(foodArray: IFood[]) {
        // отфильтровать еду и оставить только ту которая в радиусе видимости и не съедена
        const visibilityFoodArray = foodArray.filter(
            food => !food.eaten && calcPointDistance(this.x, this.y, food.x, food.y) < this.radius + this.visibilityRadius + food.radius
        );

        // выбрать ближайший кусок еды из еды в области видимости
        const nearestFood = getNearestPointFromPointsArray(visibilityFoodArray, { x: this.x, y: this.y });

        return nearestFood;
    }

    private move() {
        // if creature position not on area center
        if (!this.onAreaCenter) {
            this.moveToAreaCenter();
        }

        // if creature reached area center
        if (this.creatureReachedAreaCenter() || this.onAreaCenter) {
            this.moveToRandomDirection();
        }
    }

    private moveToRandomDirection() {
        this.onAreaCenter = true;

        // create move direction
        if (!(this.stepDirectionCount % this.stepDirectionChangeNum)) {
            this.dX = this.randomDirection();
            this.dY = this.randomDirection();
            this.stepDirectionCount = 0;
            this.stepDirectionChangeNum = this.randomStepDirectionChangeNum();
        }

        // if creature outside area
        if (!this.creatureInsideArea()) {
            this.dX *= -1;
            this.dY *= -1;
            this.stepDirectionCount = 0;
        }

        // move creature
        this.x += this.dX;
        this.y += this.dY;
        this.wasteOfEnergy();
    }

    private moveToThePoint(point: IPoint) {
        this.wasteOfEnergy();

        if (this.x > point.x) {
            this.x -= this.velocity;
        } else {
            this.x += this.velocity;
        }

        if (this.y > point.y) {
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
     * https://www.geeksforgeeks.org/check-if-a-circle-lies-inside-another-circle-or-not/
     * @param area 
     */
    private creatureInsideArea() {
        const pointDistance = calcPointDistance(this.x + this.dX, this.y + this.dY, this.area.centerX, this.area.centerY);

        return pointDistance + this.radius <= this.area.radius;
    }

    /**
     * Проверка, дошла ли сущность до центра области
     * @param area 
     */
    private creatureReachedAreaCenter() {
        return calcPointDistance(this.x, this.y, this.area.centerX, this.area.centerY) <= this.radius * 2;
    }

    /**
     * Получить точки выхода из области
     */
    private getAreaPoints() {
        const areaPoints = [];
        const steps = this.area.radius / 2;

        for (let i = 0; i < steps; i++) {
            areaPoints.push({
                x: this.area.centerX + this.area.radius * Math.cos(2 * Math.PI * i / steps),
                y: this.area.centerY + this.area.radius * Math.sin(2 * Math.PI * i / steps)
            });
        }

        return areaPoints;
    }

    private moveToAreaCenter() {
        this.moveToThePoint({ x: this.area.centerX, y: this.area.centerY });
    }

    private wasteOfEnergy() {
        const wasteEnergyPerSec = Math.floor(this.area.radius / 60);
        
        if (!(this.step % wasteEnergyPerSec)) {
            this.energy -= 1;
        }
    }

    private checkDeath() {
        return this.energy === 0;
    }

    private randomDirection() {
        return randomIntFromRange(0, 1) ? this.velocity : -this.velocity;
    }

    private randomStepDirectionChangeNum() {
        return randomIntFromRange(30, 50);
    }
}

export interface IFood {
    x: number;
    y: number;
    radius: number;
    eaten: boolean;
    eat: () => void;
}

export interface IArea {
    centerX: number;
    centerY: number;
    radius: number;
}

interface IPoint {
    x: number;
    y: number;
}