import { Creature, IProps as ICreatureProps } from '../Creature';
import { randomIntFromRange } from '../../helpers';

export class Posterity extends Creature {
    private readonly canMutate: boolean;

    public constructor({ canMutate, ...props }: IProps) {
        super(props);

        this.canMutate = canMutate && this.checkCanMutate();

        if (this.canMutate) {
            this.mutateVelocity();
            this.mutateVisibilityRadius();
        }

        // dependence variables
        this.setDependenceVariables();
    }

    private checkCanMutate() {
        return !this.isMutated ? Math.random() <= this.mutationChance : false;
    }

    private mutateVelocity() {
        const oldVelocity = this.velocity;
        const { newValue, color } = this.mutateParam(oldVelocity, true);

        this.velocity = newValue;
        this.fillStyle = color;
        this.energyIntensity *= (oldVelocity / this.velocity);
    }

    private mutateVisibilityRadius() {
        const oldVisibility = this.visibilityRadius;
        const { newValue, color } = this.mutateParam(oldVisibility);
        
        this.visibilityRadius = newValue;
        // this.fillStyle = color;
        this.energyIntensity *= (oldVisibility / this.visibilityRadius);
    }

    private mutateParam(defaultValue: number, includeSelectionSpeed?: boolean) {
        const selectionSpeed = includeSelectionSpeed ? this.selectionSpeed : 1;
        const inc = defaultValue / 2;
        const min = defaultValue - inc;
        const max = defaultValue + inc;
        const val = (randomIntFromRange((min / selectionSpeed) * 10, (max / selectionSpeed) * 10) / 10) * selectionSpeed;

        const newValue = val || defaultValue; // IF 0 -> defaultValue
        const color = this.getColorRelativeToParameter(newValue, max);

        this.isMutated = true;

        return { newValue, color };
    }

    private getColorRelativeToParameter(value: number, maxValue: number) {
        const h = 240 - ((value / maxValue) * 240);

        return (`hsl(${h}, 100%, 50%)`);
    }
}

interface IProps extends ICreatureProps {
    canMutate: boolean;
}