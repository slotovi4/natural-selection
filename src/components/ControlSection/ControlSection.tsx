import React from 'react';
import {
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from '@material-ui/core';
import { cn } from '@bem-react/classname';
import selectionImg from './selectionImg.jpg';
import './ControlSection.scss';

const ControlSection = ({ onStartClick, onResetClick, disabled }: IProps) => {
    const cl = cn('ControlSection');

    return (
        <section className={cl()}>
            <Card>
                <CardMedia
                    image={selectionImg}
                    title="Selection Image"
                    className={cl('Image')}
                />
                <CardContent>
                    <span>Selection params</span>
                </CardContent>

                <CardActions>
                    <Button disabled={disabled} variant="contained" onClick={onStartClick}>Start</Button>
                    <Button disabled={disabled} variant="contained" onClick={onResetClick} className='ml-2'>Reset</Button>
                </CardActions>
            </Card>
        </section>
    );
};

export default ControlSection;

interface IProps {
    disabled: boolean;
    onResetClick: () => void;
    onStartClick: () => void;
}
