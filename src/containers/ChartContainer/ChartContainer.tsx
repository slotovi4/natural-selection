import React from 'react';
import { FormControlLabel, Switch, Card } from '@material-ui/core';
import { LineChart, BarChart } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';
import { cn } from '@bem-react/classname';
import './ChartContainer.scss';

const ChartContainer = ({ selectionResultData }: IProps) => {
    const cl = cn('ChartContainer');
    const [combineCharts, setCombineCharts] = React.useState(false);
    const finalResult = selectionResultData.length ? selectionResultData[selectionResultData.length - 1] : null;
    const finalLastResult = finalResult ? finalResult[finalResult.length - 1] : null;

    return (
        <div className={cl()}>
            <section style={{width: '70%'}}>
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
                <section>
                    <LineChart combineCharts={combineCharts} selectionResultData={selectionResultData} />
                </section>

                <section>
                    <BarChart survivedCreatures={finalLastResult ? finalLastResult.survivedCreatures : []} />
                </section>
            </section>
            <Card style={{width: '30%'}}>
                <span>params</span>
            </Card>
        </div>
    );
};

const mapState = (state: IRootState) => ({
    selectionResultData: state.selection.selectionResultData,
});

export default connect(mapState)(ChartContainer);

type IProps = ReturnType<typeof mapState>;
