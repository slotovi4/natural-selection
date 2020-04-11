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

export interface IPoint {
    x: number;
    y: number;
}