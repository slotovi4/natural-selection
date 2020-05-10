import { Creature, IProps as ICreatureProps } from '../Creature';
import { randomIntFromRange } from '../../helpers';
import { fixValue } from '../../../../helpers';

export class Posterity extends Creature {
    public constructor({
        canMutate,
        parentVelocity,
        parentVisibilitySize,
        parentEnergyIntensity,
        parentSize,
        canMutateVelocity,
        canMutateVisibility,
        canMutateSize,
        ...props
    }: IProps) {
        super(props);

        if (canMutate && this.checkCanMutate()) {
            this.energyIntensity = parentEnergyIntensity;

            if (canMutateVelocity) {
                this.velocity = parentVelocity * this.selectionSpeed;
                this.mutateVelocity();
            }

            if (canMutateVisibility) {
                this.visibilitySize = parentVisibilitySize;
                this.mutateVisibilitySize();
            }

            if (canMutateSize) {
                this.size = parentSize;
                this.mutateSize();
            }

            // dependence variables
            this.setDependenceVariables();
        }
    }

    private mutateVelocity() {
        const oldVelocity = this.velocity;
        const { newValue, color } = this.mutateParam(oldVelocity, true);

        this.velocity = newValue;
        this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldVelocity / this.velocity));
    }

    private mutateVisibilitySize() {
        const oldVisibilitySize = this.visibilitySize;
        const { newValue } = this.mutateParam(oldVisibilitySize);

        this.visibilitySize = newValue;
        // this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldVisibilitySize / this.visibilitySize));
    }

    private mutateSize() {
        const oldSize = this.size;
        const { newValue, color } = this.mutateParam(oldSize);

        this.size = newValue;
        this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldSize / this.size));
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

    private checkCanMutate() {
        return !this.isMutated ? Math.random() <= this.mutationChance : false;
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
    canMutateSize: boolean;
    parentVelocity: number;
    parentVisibilitySize: number;
    parentEnergyIntensity: number;
    parentSize: number;
}