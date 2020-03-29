import React from 'react';
import { cn } from '@bem-react/classname';
import {renderArea} from './helpers';
import './Canvas.scss';

const Canvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const cl = cn('Canvas');

    React.useEffect(() => {
        if (canvasRef.current) {
            renderArea(canvasRef.current);
        }
    }, []);

    return (
        <div className={cl()}>
            <canvas ref={canvasRef} width={300} height={300} />
        </div>
    );
};

export default Canvas;
