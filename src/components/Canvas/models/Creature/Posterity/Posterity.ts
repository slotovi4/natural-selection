import { Creature, IProps as ICreatureProps } from '../Creature';
import { randomIntFromRange } from '../../helpers';
import { creatureParams } from '../config';
import { foodParams } from '../../Food/config';
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

            if (canMutateVisibility) {
                this.visibilitySize = parentVisibilitySize;
                this.mutateVisibilitySize();
            }

            if (canMutateSize) {
                this.size = parentSize;
                this.mutateSize();
            }

            // dependence from size mutation
            if (canMutateVelocity) {
                this.velocity = parentVelocity * this.selectionSpeed;
                this.mutateVelocity();
            }

            // dependence variables
            this.setDependenceVariables();
        }
    }

    private mutateVelocity() {
        const oldVelocity = this.velocity;
        const { newValue, color } = this.mutateParam(oldVelocity, true);

        this.velocity = this.checkPosterityVelocity(newValue);
        this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldVelocity / this.velocity));
    }

    private mutateVisibilitySize() {
        const oldVisibilitySize = this.visibilitySize;
        const { newValue, color } = this.mutateParam(oldVisibilitySize);

        this.visibilitySize = newValue;
        this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldVisibilitySize / this.visibilitySize));
    }

    private mutateSize() {
        const oldSize = this.size;
        const { newValue, color } = this.mutateParam(oldSize);

        this.size = this.checkPosteritySize(newValue);
        this.fillStyle = color;
        this.energyIntensity = fixValue(this.energyIntensity * (oldSize / this.size));
    }

    private mutateParam(defaultValue: number, includeSelectionSpeed?: boolean) {
        const selectionSpeed = includeSelectionSpeed ? this.selectionSpeed : 1;
        const inc = defaultValue / 2;
        const min = defaultValue - inc;
        const max = defaultValue + inc;
        const val = (randomIntFromRange((min / selectionSpeed) * 10, (max / selectionSpeed) * 10) / 10) * selectionSpeed;

        const newValue = fixValue(val) || fixValue(defaultValue); // IF 0 -> defaultValue
        const color = this.getColorRelativeToParameter(newValue, max);

        this.isMutated = true;

        return { newValue, color };
    }

    private checkPosterityVelocity(newVelocity: number) {
        const creatureRadius = fixValue(this.size * creatureParams.radius);
        const creatureAndFoodRadius = creatureRadius + foodParams.radius;

        if (newVelocity > creatureAndFoodRadius) {
            return fixValue(creatureAndFoodRadius);
        }

        return newVelocity;
    }

    private checkPosteritySize(newSize: number) {
        const newRadius = fixValue(newSize * creatureParams.radius);

        if (newRadius < 5) {
            return fixValue(5 / creatureParams.radius);
        } else if (newRadius > (this.area.radius / 10)) {
            return fixValue((this.area.radius / 10) / creatureParams.radius);
        }

        return newSize;
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