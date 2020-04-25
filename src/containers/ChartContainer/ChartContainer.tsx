import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { LineChart, BarChart } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';

const ChartContainer = ({ selectionResultData }: IProps) => {
    const [combineCharts, setCombineCharts] = React.useState(false);
    const finalResult = selectionResultData.length ? selectionResultData[selectionResultData.length - 1] : null;
    const finalLastResult = finalResult ? finalResult[finalResult.length - 1] : null;

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={combineCharts}
                        onChange={() => setCombineCharts(!combineCharts)}
                        name="combineChartsSwitch"
                        color="primary"
                    />
                }
                label="Combine charts"
            />
            <LineChart combineCharts={combineCharts} selectionResultData={selectionResultData} />

            {finalLastResult ? (
                <BarChart survivedCreatures={finalLastResult.survivedCreatures} />
            ) : null}
        </div>
    );
};

const mapState = (state: IRootState) => ({
    selectionResultData: state.selection.selectionResultData,
});

export default connect(mapState)(ChartContainer);

type IProps = ReturnType<typeof mapState>;
