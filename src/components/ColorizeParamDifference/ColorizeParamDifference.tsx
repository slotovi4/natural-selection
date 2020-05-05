import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { cn } from '@bem-react/classname';
import './ColorizeParamDifference.scss';

const ColorizeParamDifference = ({ paramDifference }: IProps) => {
    const cl = cn('ColorizeParamDifference');

    return paramDifference && parseFloat(paramDifference.toFixed(2)) ? (
        <div className={cl()}>
            {paramDifference > 0
                ? <ArrowUpwardIcon className={cl('Icon', { up: true })} />
                : <ArrowDownwardIcon className={cl('Icon', { down: true })} />
            }
            <span className={cl('Text', { up: paramDifference > 0, down: paramDifference < 0 })}>
                {parseFloat(paramDifference.toFixed(2))}
            </span>
        </div>
    ) : null;
};

export default ColorizeParamDifference;

interface IProps {
    paramDifference?: number;
}
