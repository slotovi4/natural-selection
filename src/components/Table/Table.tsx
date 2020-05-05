import React from 'react';
import { ColorizeParamDifference } from '../ColorizeParamDifference';
import {
    Table as MaterialTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';

const Table = ({ rows, headers, showParamDifference }: IProps) => {
    const renderRowValue = (currentValue: number | string, prevValue?: number | string, ) => {
        if (showParamDifference && prevValue && typeof prevValue === 'number' && typeof currentValue === 'number') {
            return (
                <div className='d-flex'>
                    {currentValue}
                    <ColorizeParamDifference paramDifference={currentValue - prevValue} />
                </div>
            );
        }

        return currentValue;
    };

    return (
        <MaterialTable aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headers.map(({ title }, i) => <TableCell key={`header_${i}`}>{title}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(({ value }, i) => (
                    <TableRow hover key={`row_${i}`}>
                        {Object.keys(value).map((key, j) => (
                            <TableCell key={`row_ceil_${key}_${i}_${j}`}>
                                {renderRowValue(value[key], rows[i - 1] ? rows[i - 1].value[key] : undefined)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </MaterialTable>
    );
};

export default Table;

interface IProps {
    rows: IRow[];
    headers: IHeader[];
    showParamDifference?: boolean;
}

export interface IHeader {
    title: string;
}

export interface IRow {
    value: IRowValue;
}

interface IRowValue {
    [x: string]: number | string;
}
