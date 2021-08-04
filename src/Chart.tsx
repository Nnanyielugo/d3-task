import * as React from 'react';
import * as d3 from 'd3';

import type { Ref } from './interfaces';
import { create, cleanup } from './draw';
interface ChartData {
  date: Date;
  value: number;
}

const Chart = () => {
  const ref: Ref = React.createRef();

  React.useEffect(() => {
    d3.dsv(',', '/data/aggregated_stock_exchange.csv', (d: any): ChartData => {
      return {
        date: new Date(d.date),
        value: +d.total_rev,
      };
    }).then((data: ChartData[]) => {
      create(ref, data, true);
    });
  });

  return <div id="chart" ref={ref} />;
};

export default Chart;
