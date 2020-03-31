import React from 'react';
import { cn } from '@bem-react/classname';
import { renderNaturalSelectionWorld } from './render';
import './Canvas.scss';

const Canvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const cl = cn('Canvas');

    React.useEffect(() => {
        if (canvasRef.current) {
            renderNaturalSelectionWorld(canvasRef.current);
        }
    }, []);

    return (
        <div className={cl()}>
            <canvas ref={canvasRef} width={500} height={500} />
        </div>
    );
};

export default Canvas;
