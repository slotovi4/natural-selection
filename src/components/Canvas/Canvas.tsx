import React from 'react';
import { cn } from '@bem-react/classname';
import { renderNaturalSelectionWorld, init, IRenderAreaElements } from './render';
import { IArea } from './models/interface';
import './Canvas.scss';

const Canvas = ({ start, stopSelection, setArea }: IProps) => {
    const [areaElements, setAreaElements] = React.useState<IRenderAreaElements | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const cl = cn('Canvas');

    React.useEffect(() => {
        if (canvasRef.current) {
            if (!areaElements) {
                const res = init(canvasRef.current);

                if(res) {
                    setAreaElements(res);
                    setArea(res.area);
                }
            }

            if (start && areaElements) {
                const { foodArray, creatureArray, area } = areaElements;

                renderNaturalSelectionWorld({
                    canvas: canvasRef.current,
                    foodArray,
                    creatureArray,
                    area,
                    stopSelection,
                });
            }
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
    stopSelection: () => void;
    setArea: (area: IArea) => void;
}
