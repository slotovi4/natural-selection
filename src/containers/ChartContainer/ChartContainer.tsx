import React from 'react';
import { LineChart, BarChart, SelectionDetails } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';

const ChartContainer = ({ selectionResultData }: IProps) => {
    return (
        <div className='d-flex'>
            <section className='w-70 pr-2'>
                <div className='mt-3'>
                    <LineChart selectionResultData={selectionResultData} />
                </div>

                <div className='mt-3'>
                    <BarChart selectionResultData={selectionResultData} />
                </div>
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
