import React from 'react';
import { LineChart, BarChart, SelectionDetails } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';

const ChartContainer = ({ selectionResultData }: IProps) => {
    const finalResult = selectionResultData.length ? selectionResultData[selectionResultData.length - 1] : null;
    const finalLastResult = finalResult ? finalResult[finalResult.length - 1] : null;
    const previousLastResult = selectionResultData.length ? selectionResultData[selectionResultData.length - 2] : null;
    const previousSelectionResultData = previousLastResult ? previousLastResult[previousLastResult.length - 1] : null;

    return (
        <div className='d-flex'>
            <section className='w-70'>
                <LineChart selectionResultData={selectionResultData} />

                <BarChart survivedCreatures={finalLastResult ? finalLastResult.survivedCreatures : []} />
            </section>

            <section className='w-30'>
                {finalLastResult ? (
                    <SelectionDetails
                        selectionResultData={selectionResultData}
                        finalLastResult={finalLastResult}
                        previousSelectionResultData={previousSelectionResultData}
                    />
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
