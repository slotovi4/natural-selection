import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { Chart } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';

const ChartContainer = (props: IProps) => {
    const [combineCharts, setCombineCharts] = React.useState(false);

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
            <Chart combineCharts={combineCharts} {...props} />
        </div>
    );
};

const mapState = (state: IRootState) => ({
    selectionResultData: state.selection.selectionResultData,
});

export default connect(mapState)(ChartContainer);

type IProps = ReturnType<typeof mapState>;
