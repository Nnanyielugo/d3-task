import * as d3 from 'd3';
import type { ChartData, Margin, Ref } from './interfaces';

const WIDTH = 1200;
const HEIGHT = 700;

const margin: Margin = {
  top: 30,
  right: 40,
  bottom: 50,
  left: 80,
};

export default function draw(node: Ref, data: ChartData[]) {
  const svg = d3
    .select(node.current)
    .append('svg')
    .attr('width', WIDTH + margin.left + margin.right)
    .attr('height', HEIGHT + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      }) as unknown as Date[]
    )
    .range([0, WIDTH]);
  const max = d3.max(data, (d) => +d.value) as number;
  const yAxis = d3.scaleLinear().domain([0, max]).range([HEIGHT, 0]);

  svg
    .append('g')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(xAxis));

  svg.append('g').call(d3.axisLeft(yAxis));

  // set gradient
  svg
    .append('linearGradient')
    .attr('id', 'line-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('y1', yAxis(0))
    .attr('x2', 0)
    .attr('y2', yAxis(max))
    .selectAll('stop')
    .data([
      { offset: '0%', color: 'blue' },
      { offset: '100%', color: 'red' },
    ])
    .enter()
    .append('stop')
    .attr('offset', (d) => d.offset)
    .attr('stop-color', (d) => d.color);

  //  draw
  const path = svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'url(#line-gradient')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line<ChartData>()
        .x((d) => xAxis(d.date))
        .y((d) => yAxis(d.value))
    );

  const pathLength = path.node()!.getTotalLength();

  // add transition
  path
    .attr('stroke-dash-offset', pathLength)
    .attr('stroke-dasharray', pathLength)
    .transition()
    .duration(3500)
    .ease(d3.easeSin)
    .attrTween('stroke-dasharray', function () {
      return d3.interpolate(`0,${pathLength}`, `${pathLength},${pathLength}`);
    });
}
