import {
    calcPointDistance,
    randomIntFromRange,
    getNearestPointFromPointsArray,
    getRandomColor
} from '../helpers';
import { IArea, IFood, IPoint } from '../interface';
import { creatureParams } from './config';

export class Creature {
    public readonly radius: number;
    public x: number;
    public y: number;
    public returnedToHome: boolean;
    public isDie: boolean;
    public grabbedFoodCount: number;

    private readonly visibilityRadius: number;
    private readonly wasteEnergyPerMove: number;
    private readonly selectionSpeed: number;
    private readonly mutationChance: number;
    private readonly isPosterity: boolean;
    private readonly isMutate: boolean;
    private readonly fillStyle: string;
    private readonly area: IArea;
    private readonly ctx: CanvasRenderingContext2D;

    private dX: number;
    private dY: number;
    private velocity: number;
    private reachedTheAreaCenter: boolean;
    private noFoodForPosterity: boolean;
    private energyIntensity: number;
    private energy: number;
    private isMutated: boolean;

    public constructor({ x, y, ctx, area, selectionSpeed, mutationChance, isPosterity }: IProps) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.area = area;

        this.selectionSpeed = selectionSpeed;
        this.mutationChance = mutationChance;
        this.radius = creatureParams.radius;
        this.velocity = creatureParams.velocity * selectionSpeed;
        this.visibilityRadius = creatureParams.visibilityRadius;
        this.isMutated = false;

        this.grabbedFoodCount = 0;
        this.energyIntensity = 2;
        this.returnedToHome = false;
        this.isDie = false;
        this.reachedTheAreaCenter = false;
        this.noFoodForPosterity = false;
        this.isPosterity = isPosterity !== undefined ? isPosterity : false;
        this.isMutate = this.getIsMutate();
        this.fillStyle = this.getFillStyle();

        // mutation
        if (this.isMutate) {
            this.mutateVelocity();
        }

        // dependence variables
        this.wasteEnergyPerMove = Math.floor(this.area.radius / 60);
        this.energy = this.replenishEnergy();
        this.dX = this.randomDirection();
        this.dY = this.randomDirection();
    }

    public draw() {
        const { dieFillStyle, strokeStyle, lineWidth } = creatureParams;

        // draw creature
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.save();
        this.ctx.fillStyle = this.checkDeath() ? dieFillStyle : this.fillStyle;
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

        // draw energy
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`${Math.floor(this.energy)}`, this.x + this.radius + 2, this.y + (this.radius / 2.5));
        this.ctx.closePath();
    }

    public update(foodArray: IFood[], dayEnd: boolean) {
        if (!this.checkDeath()) {
            // if not returned to home
            if (!this.returnedToHome) {
                if (!this.grabbedFoodCount) {
                    this.searchFood(foodArray);
                }

                else if (this.grabbedFoodCount === 1 && !this.noFoodForPosterity) {
                    this.tryFindFoodForPosterity(foodArray);
                }

                else if (this.grabbedFoodCount === 2 || this.noFoodForPosterity) {
                    this.goHome();
                }
            }

            // if returned to home
            else if (this.returnedToHome && dayEnd) {
                this.resetState();
            }

            this.draw();
        } else if (this.ctx.fillStyle === creatureParams.fillStyle) {
            // if die draw die color
            this.draw();
        }

        return this;
    }

    public getCreatureParams() {
        return {
            velocity: this.velocity / this.selectionSpeed,
        };
    }

    private searchFood(foodArray: IFood[]) {
        const nearestFood = this.findNearestFood(foodArray);

        if (nearestFood) {
            if (this.foodWasGrabbedCheck(nearestFood)) {
                this.grabbedFoodCount += 1;
                this.energy = this.replenishEnergy();
                nearestFood.eat();
            } {
                this.moveToThePoint(nearestFood);
            }
        } else {
            this.move();
        }
    }

    private goHome() {
        if (this.creatureOutsideArea()) {
            this.returnedToHome = true;
        } else {
            const nearestAreaExitPoint = this.getNearestAreaExitPoint();

            if (nearestAreaExitPoint) {
                this.moveToThePoint(nearestAreaExitPoint);
            }
        }
    }

    private tryFindFoodForPosterity(foodArray: IFood[]) {
        const nearestAreaExitPoint = this.getNearestAreaExitPoint();

        if (nearestAreaExitPoint) {
            // расстояние до ближайшей точки выхода
            const nearestAreaExitPointDistance = calcPointDistance(this.x, this.y, nearestAreaExitPoint.x, nearestAreaExitPoint.y);
            // количество шагов до точки выхода
            const stepsCountToExitPoint = Math.floor(nearestAreaExitPointDistance / this.velocity);
            // количество энергии требуемой для выхода
            const amountEnergyToExit = Math.floor((stepsCountToExitPoint * this.selectionSpeed) / this.wasteEnergyPerMove);

            if (this.energy > amountEnergyToExit) {
                this.searchFood(foodArray);
            } else {
                this.noFoodForPosterity = true;
                this.goHome();
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
        // if (!this.reachedTheAreaCenter) {
        //     this.moveToAreaCenter();
        // }

        // if creature reached area center
        // if (this.creatureReachedAreaCenter() || this.reachedTheAreaCenter) {
        this.moveToRandomDirection();
        // }
    }

    private moveToRandomDirection() {
        this.reachedTheAreaCenter = true;

        // random acceleration
        this.randomAcceleration();

        this.x += this.dX;
        this.y += this.dY;

        // if creature outside area
        if (this.creatureOutsideArea()) {
            const dx = this.x - this.area.centerX;
            const dy = this.y - this.area.centerY;
            const theta = Math.atan2(dy, dx);
            const R = this.area.radius - this.radius;

            this.x = R * Math.cos(theta) + this.area.centerX;
            this.y = R * Math.sin(theta) + this.area.centerY;

            this.dX *= Math.random() > 0.5 ? 1 : -1;
            this.dY *= Math.random() > 0.5 ? 1 : -1;
        }

        // move creature
        this.wasteOfEnergy();
    }

    private moveToThePoint(point: IPoint) {
        this.dX = this.velocity;
        this.dY = this.velocity;

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

    private getNearestAreaExitPoint() {
        const areaPoints = this.getAreaPoints();
        const nearestAreaExitPoint = getNearestPointFromPointsArray(areaPoints, { x: this.x, y: this.y });

        return nearestAreaExitPoint;
    }

    private resetState() {
        if (!this.checkDeath()) {
            this.grabbedFoodCount = 0;

            this.reachedTheAreaCenter = false;
            this.returnedToHome = false;
            this.noFoodForPosterity = false;

            this.dX = this.randomDirection();
            this.dY = this.randomDirection();
            this.energy = this.replenishEnergy();
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
    private creatureOutsideArea() {
        const pointDistance = calcPointDistance(this.x, this.y, this.area.centerX, this.area.centerY);

        return pointDistance + this.radius > this.area.radius;
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

    private randomAcceleration() {
        const maxVelocity = this.velocity * 2;

        this.dX += this.randomizeDValue();
        this.dY += this.randomizeDValue();

        if (this.dX > maxVelocity) {
            this.dX = maxVelocity;
        } else if (this.dX < -maxVelocity) {
            this.dX = -maxVelocity;
        }

        if (this.dY > maxVelocity) {
            this.dY = maxVelocity;
        } else if (this.dY < -maxVelocity) {
            this.dY = -maxVelocity;
        }
    }

    private randomizeDValue(): number {
        const randAccel = 0.3 * this.selectionSpeed;
        const value = (1 - 2 * Math.random()) * randAccel;

        return value === 0 ? this.randomizeDValue() : value;
    }

    private moveToAreaCenter() {
        this.moveToThePoint({ x: this.area.centerX, y: this.area.centerY });
    }

    /**
     * Расход энергии
     */
    private wasteOfEnergy() {
        const xVelocity = Math.abs(this.dX);
        const yVelocity = Math.abs(this.dY);
        const velocity = (xVelocity + yVelocity) / 2;

        this.energy -= (1 * velocity) / this.wasteEnergyPerMove; // * this.selectionSpeed;
    }

    private mutateVelocity() {
        const oldVelocity = this.velocity;

        this.velocity = this.mutateParam(this.velocity);
        this.energyIntensity *= oldVelocity / this.velocity;
        this.isMutated = true;
    }

    private checkDeath() {
        if (this.energy <= 0) {
            this.isDie = true;
        }

        return this.isDie;
    }

    private replenishEnergy() {
        return this.energy = 100 * this.energyIntensity;
    }

    private randomDirection() {
        return randomIntFromRange(0, 1) ? this.velocity : -this.velocity;
    }

    private getIsMutate() {
        return this.isPosterity && !this.isMutated ? Math.random() <= this.mutationChance : false;
    }

    private getFillStyle() {
        return this.isMutate ? getRandomColor() : creatureParams.fillStyle;
    }

    private mutateParam(defaultValue: number) {
        const min = defaultValue >= 2 ? defaultValue / 2 : 1;
        const max = defaultValue >= 0.5 ? defaultValue * 2 : 1;

        return randomIntFromRange(min, max);
    }
}

interface IProps {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    area: IArea;
    selectionSpeed: number;
    mutationChance: number;
    isPosterity?: boolean;
}