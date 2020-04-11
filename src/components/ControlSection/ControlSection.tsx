import React from 'react';
import {
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Slider,
} from '@material-ui/core';
import { cn } from '@bem-react/classname';
import selectionImg from './selectionImg.jpg';
import './ControlSection.scss';

const ControlSection = ({ onStartClick, onResetClick, disabled }: IProps) => {
    const cl = cn('ControlSection');

    return (
        <section className={cl()}>
            <Card className='mb-2'>
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

            <Card>
                <CardMedia
                    image={selectionImg}
                    title="Food Image"
                    className={cl('Image')}
                />
                <CardContent>
                    <span>Food params</span>

                    <div className='row'>
                        <span className={cl('Label')}>Food count</span>
                        <Slider
                            defaultValue={30}
                            // getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={110}
                        />
                    </div>
                </CardContent>
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
