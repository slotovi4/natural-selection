import React from 'react';
import { cn } from '@bem-react/classname';
import { renderNaturalSelectionWorld } from './render';
import './Canvas.scss';

const Canvas = ({ start }: IProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const cl = cn('Canvas');

    React.useEffect(() => {
        if (canvasRef.current && start) {
            renderNaturalSelectionWorld(canvasRef.current);
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
    start?: boolean;
}
