import { Creature, IProps as ICreatureProps } from '../Creature';
import { getRandomColor } from '../../helpers';

export class Posterity extends Creature {
    private readonly canMutate: boolean;

    public constructor({ canMutate, ...props }: IProps) {
        super(props);

        this.canMutate = canMutate && this.checkCanMutate();

        if (this.canMutate) {
            this.fillStyle = getRandomColor();
            this.mutateVelocity();
        }

        // dependence variables
        this.setDependenceVariables();
    }

    private checkCanMutate() {
        return !this.isMutated ? Math.random() <= this.mutationChance : false;
    }

    private mutateVelocity() {
        const oldVelocity = this.velocity;
        const { newValue, color } = this.mutateParam(this.velocity);

        this.velocity = newValue;
        this.fillStyle = color;
        this.energyIntensity *= oldVelocity / this.velocity;
        this.isMutated = true;
    }

    private mutateParam(defaultValue: number) {
        const inc = defaultValue / 2;
        const min = defaultValue - inc;
        const max = defaultValue + inc;

        const newValue = Math.round((Math.random() * (max - min) + min) * 10) / 10;
        const color = this.getColorRelativeToParameter(newValue, min, max);
        return { newValue, color };
    }

    private getColorRelativeToParameter(value: number, minValue: number, maxValue: number) {
        const scale = (value - minValue / (maxValue - minValue)); // 0 - 1
        
        const r = Math.floor(255 * (value / maxValue));
        const g = 255 - (Math.abs(scale - 0.5)* 10) * 51;
        const b = Math.floor(255 * (minValue / value));

        return `rgb(${r}, ${g}, ${b})`;
    }
}

interface IProps extends ICreatureProps {
    canMutate: boolean;
}