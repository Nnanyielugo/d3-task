import * as React from 'react';
import * as d3 from 'd3';

import type { Ref } from './interfaces';
import { create, cleanup, draw } from './draw';
interface ChartData {
  date: Date;
  value: number;
}

const Chart = () => {
  const ref: Ref = React.createRef();
  const [chartType, setChartType] = React.useState('total_revenue');
  const [showInteraction, setShowInteraction] = React.useState(true);
  const valueMap = {
    total_revenue: 'total_rev',
    total_volume: 'total_vol',
  };

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
      <button onClick={() => handleChangeChartType('total_revenue')}>
        See total revenue
      </button>
      <button onClick={() => handleChangeChartType('total_volume')}>
        See total volume
      </button>
      <br />
      <br />
      <br />
      <button onClick={() => handleChangeInteraction(true)}>
        Show Tooltip and animated gradient
      </button>
      <button onClick={() => handleChangeInteraction(false)}>
        Show selectable dates
      </button>
    </>
  );
};

export default Chart;
