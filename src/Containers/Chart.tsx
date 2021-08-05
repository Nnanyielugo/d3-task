import * as React from 'react';
import * as d3 from 'd3';

import { create } from '../Components/d3';
import SplitButton from '../Components/SplitButton';

import type { Ref } from '../interfaces';
interface ChartData {
  date: Date;
  value: number;
}

const valueMap = {
  total_revenue: 'total_rev',
  total_volume: 'total_vol',
};

const dataOptions = [
  { label: 'Total Revenue', value: 'total_revenue' },
  { label: 'Total Volume', value: 'total_volume' },
];
const chartTypeOptions = [
  { label: 'Tooltip and Animated Gradient', value: true },
  { label: 'Selectable Dates', value: false },
];

const Chart = () => {
  const ref: Ref = React.createRef();
  const [chartType, setChartType] = React.useState('total_revenue');
  const [showInteraction, setShowInteraction] = React.useState(true);

  React.useEffect(() => {
    d3.dsv(
      ',',
      `${process.env.PUBLIC_URL}/data/aggregated_stock_exchange.csv`,
      (d: any): ChartData => {
        return {
          date: new Date(d.date),
          value:
            chartType === 'total_revenue'
              ? +d[valueMap.total_revenue]
              : +d[valueMap.total_volume],
        };
      }
    ).then((data: ChartData[]) => {
      create(ref, data, showInteraction);
    });
  });

  const handleChangeChartType = (inputType: string) => {
    setChartType(inputType);
  };

  const handleChangeInteraction = (inputType: boolean) => {
    setShowInteraction(inputType);
  };

  return (
    <>
      <div id="chart" ref={ref} />
      <SplitButton handleClick={handleChangeChartType} options={dataOptions} />
      <SplitButton
        handleClick={handleChangeInteraction}
        options={chartTypeOptions}
      />
    </>
  );
};

export default Chart;
