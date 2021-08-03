import * as d3 from 'd3';
import type { ChartData, Margin, Ref } from './interfaces';

const WIDTH = 1200;
const HEIGHT = 700;

const margin: Margin = {
  top: 50,
  right: 40,
  bottom: 50,
  left: 80,
};

export default function draw(node: Ref, data: ChartData[]) {
  console.log(data);
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

  const xScale = d3.axisBottom(xAxis);

  const max = d3.max(data, (d) => +d.value) as number;
  const yAxis = d3.scaleLinear().domain([0, max]).range([HEIGHT, 0]);

  svg
    .append('g')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(
      xScale.ticks(d3.timeMonth).tickFormat(((d: Date) => {
        return d.getTime() <= d3.timeYear(d).getTime()
          ? d.getFullYear()
          : d.toLocaleString('en', {
              month: 'short',
            });
      }) as any)
    );
  // .call(xScale.ticks(d3.timeMonth));
  // .call(xScale.ticks(d3.timeMonth).tickFormat(d3.timeFormat('%b') as any));

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
    .attr('stroke', 'url(#line-gradient)')
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

  function formatDate(date: Date) {
    return date.toLocaleString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }

  const focus = svg
    .append('g')
    .append('circle')
    .style('fill', 'black')
    .attr('stroke', 'black')
    .attr('r', 2.5)
    .style('opacity', 0);

  const group = svg.append('g');
  const dateText = group
    .append('text')
    .attr('stroke', 'steelblue')
    .style('opacity', 0)
    .style('font-size', 10)
    .style('font-weight', '100');
  const valueText = group
    .append('text')
    .attr('stroke', 'steelblue')
    .style('opacity', 0)
    .style('font-size', 10)
    .style('font-weight', '100');

  const bisect = d3.bisector((d: ChartData) => d.date).left;

  function moveFn(evt: MouseEvent) {
    const x0 = xAxis.invert(d3.pointer(evt)[0]);
    const index = bisect(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    const d =
      x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime()
        ? d1
        : d0;
    const { date, value } = d;
    focus.attr('cx', xAxis(date)).attr('cy', yAxis(value)).style('opacity', 1);

    dateText
      .attr('x', WIDTH / 2)
      .attr('y', -20)
      .style('opacity', 1)
      .text(formatDate(date));

    valueText
      .attr('x', WIDTH / 2 + 80)
      .attr('y', -20)
      .style('opacity', 1)
      .text(value.toFixed(2));
  }

  function leaveFn() {
    focus.style('opacity', 0);
    dateText.style('opacity', 0);
    valueText.style('opacity', 0);
  }

  // create a rectangle on top the svg area to recover mouse positions
  svg
    .append('rect')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .on('touchmove mousemove', moveFn)
    .on('touchend mouseleave', leaveFn);
}
