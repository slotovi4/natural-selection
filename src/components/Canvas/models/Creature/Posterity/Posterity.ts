import { Creature, IProps as ICreatureProps } from '../Creature';
import { randomIntFromRange } from '../../helpers';

export class Posterity extends Creature {
    public constructor({
        canMutate,
        parentVelocity,
        parentVisibilityRadius,
        parentEnergyIntensity,
        canMutateVelocity,
        canMutateVisibility,
        ...props
    }: IProps) {
        super(props);

        this.velocity *= parentVelocity;
        this.visibilityRadius = parentVisibilityRadius * this.visibilityAreaSize;
        this.energyIntensity = parentEnergyIntensity * this.energyIntensityScale;

        if (canMutate && this.checkCanMutate()) {
            if (canMutateVelocity) {
                this.mutateVelocity();
            }

            if (canMutateVisibility) {
                this.mutateVisibilityRadius();
            }
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
        const { newValue } = this.mutateParam(oldVisibility);

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
    canMutateVelocity: boolean;
    canMutateVisibility: boolean;
    parentVelocity: number;
    parentVisibilityRadius: number;
    parentEnergyIntensity: number;
}