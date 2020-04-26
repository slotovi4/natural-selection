import React from 'react';
import {
    Table as MaterialTable,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@material-ui/core';

const Table = ({ rows, headers }: IProps) => {
    return (
        <TableContainer component={Paper}>
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
                                <TableCell
                                    key={`row_ceil_${key}_${i}`}
                                    align={j !== Object.keys(value).length - 1 ? 'left' : 'right'}
                                >
                                    {value[key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MaterialTable>
        </TableContainer>
    );
};

export default Table;

interface IProps {
    rows: IRow[];
    headers: IHeader[];
}

export interface IHeader {
    title: string;
}

export interface IRow {
    value: object;
}
