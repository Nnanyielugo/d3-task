import * as React from 'react';
import * as d3 from 'd3';

import type { RefObject } from 'react';

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ExchangeData {
  date: string;
  total_rev: string;
  total_vol: string;
}

interface ChartData {
  date: Date;
  value: number;
}

const Chart = () => {
  const ref: RefObject<HTMLDivElement> = React.createRef();
  const margin: Margin = {
    top: 30,
    right: 40,
    bottom: 50,
    left: 80,
  };

  React.useEffect(() => {
    draw();
  });

  const width = 1200;
  const height = 700;

  const draw = async () => {
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const data: ChartData[] = await d3.dsv(
      ',',
      '/data/aggregated_stock_exchange.csv',
      (d: any): any => {
        return {
          date: new Date(d.date),
          value: +d.total_rev,
        };
      }
    );

    const xAxis = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        }) as unknown as Date[]
      )
      .range([0, width]);

    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.value) as number])
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xAxis));

    svg.append('g').call(d3.axisLeft(yAxis));

    //  draw
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<ChartData>()
          .x((d) => xAxis(d.date))
          .y((d) => yAxis(d.value))
      );
  };
  return <div ref={ref} />;
};

export default Chart;
