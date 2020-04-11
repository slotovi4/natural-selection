import { IPoint } from "./interface";

export const calcPointDistance = (x1: number, y1: number, x2: number, y2: number) => {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

export const randomIntFromRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getNearestPointFromPointsArray = <T extends IPoint, N extends IPoint>(pointsArray: T[], parentPoint: N) => {
    const { length } = pointsArray;
    const parPoint = parentPoint;
    let nearestPoint: T | null = null;

    for (let i = 0; i < length; i++) {
        const point = pointsArray[i];
        const foodDistance = calcPointDistance(parPoint.x, parPoint.y, point.x, point.y);

        if (nearestPoint) {
            const nearestPointDistance = calcPointDistance(parPoint.x, parPoint.y, nearestPoint.x, nearestPoint.y);

            if (nearestPointDistance > foodDistance) {
                nearestPoint = point;
            }
        } else {
            nearestPoint = point;
        }
    }

    return nearestPoint;
};