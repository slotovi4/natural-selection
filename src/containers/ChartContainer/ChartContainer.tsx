import React from 'react';
import { LineChart, BarChart, SelectionDetails } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';

const ChartContainer = ({ selectionResultData }: IProps) => {
    return (
        <div className='d-flex'>
            <section className='w-70'>
                <LineChart selectionResultData={selectionResultData} />

                <BarChart selectionResultData={selectionResultData} />
            </section>

            <section className='w-30'>
                {selectionResultData.length ? (
                    <SelectionDetails selectionResultData={selectionResultData} />
                ) : null}
            </section>
        </div>
    );
};

const mapState = (state: IRootState) => ({
    selectionResultData: state.selection.selectionResultData,
});

export default connect(mapState)(ChartContainer);

type IProps = ReturnType<typeof mapState>;
