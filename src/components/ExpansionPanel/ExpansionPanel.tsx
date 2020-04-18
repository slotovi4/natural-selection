import React from 'react';
import {
    ExpansionPanel as MaterialExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { cn } from '@bem-react/classname';
import './ExpansionPanel.scss';

const ExpansionPanel = ({ children, id, title, secondaryText, disabled }: IProps) => {
    const cl = cn('ExpansionPanel');

    return (
        <MaterialExpansionPanel disabled={disabled}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="controlSelection"
                id={id}
            >
                <div className={cl('Expansion-Header')}>
                    <span className={cl('Title')}>{title}</span>
                    <span className={cl('Text', { secondary: true })}>{secondaryText}</span>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {children}
            </ExpansionPanelDetails>
        </MaterialExpansionPanel>
    );
};

export default ExpansionPanel;

interface IProps {
    children: React.ReactNode;
    title: string;
    id: string;
    disabled?: boolean;
    secondaryText?: string;
}
