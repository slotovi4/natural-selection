import React from 'react';
import { cn } from '@bem-react/classname';
import {
    renderNaturalSelectionWorld,
    init,
    IRenderAreaElements,
    updateNaturalSelectionInitParams,
} from './render';
import { getMaxFoodCount } from './models';
import { IArea } from './models/interface';
import './Canvas.scss';

const Canvas = ({ start, stopSelection, setArea, setMaxFoodCount, foodControlParams }: IProps) => {
    const [areaElements, setAreaElements] = React.useState<IRenderAreaElements | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const cl = cn('Canvas');

    React.useEffect(() => {
        if (canvasRef.current && areaElements) {
            setAreaElements(updateNaturalSelectionInitParams(canvasRef.current, areaElements.area, foodControlParams));
        }
    }, [foodControlParams]);

    React.useEffect(() => {
        if (canvasRef.current && !areaElements) {
            const res = init(canvasRef.current, foodControlParams);

            if (res) {
                setAreaElements(res);
                setArea(res.area);
                setMaxFoodCount(getMaxFoodCount(res.area) / 10);
            }
        }
    }, []);

    React.useEffect(() => {
        if (start && areaElements && canvasRef.current) {
            renderNaturalSelectionWorld({
                canvas: canvasRef.current,
                stopSelection,
                foodControlParams,
                ...areaElements
            });
        }
    }, [start]);

    return (
        <section className={cl()}>
            <canvas ref={canvasRef} width={500} height={500} />
        </section>
    );
};

export default Canvas;

interface IProps {
    start: boolean;
    foodControlParams: IFood;
    stopSelection: () => void;
    setArea: (area: IArea) => void;
    setMaxFoodCount: (maxFoodCount: number) => void;
}

interface IFood {
    foodCount: number;
}
