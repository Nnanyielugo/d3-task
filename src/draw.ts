import * as d3 from 'd3';
import './draw.css';
import type { ChartData, Margin, Ref } from './interfaces';

const WIDTH = 1200;
const HEIGHT = 700;

const margin: Margin = {
  top: 50,
  right: 40,
  bottom: 50,
  left: 80,
};

let svg: d3.Selection<SVGGElement, unknown, null, undefined>;
let xAxis: d3.ScaleTime<number, number, never>;
let yAxis: d3.ScaleLinear<number, number, never>;
let xScale: d3.Axis<Date | d3.NumberValue>;
let max: number;
let focus: d3.Selection<SVGCircleElement, unknown, null, undefined>;
let div: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
let bisect: (
  array: ArrayLike<ChartData>,
  x: Date,
  lo?: number | undefined,
  hi?: number | undefined
) => number;

export function create(node: Ref, data: ChartData[]) {
  cleanup();
  svg = d3
    .select(node.current)
    .append('svg')
    .attr('width', WIDTH + margin.left + margin.right)
    .attr('height', HEIGHT + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  xAxis = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      }) as unknown as Date[]
    )
    .range([0, WIDTH]);

  xScale = d3.axisBottom(xAxis);

  max = d3.max(data, (d) => +d.value) as number;
  yAxis = d3.scaleLinear().domain([0, max]).range([HEIGHT, 0]);

  focus = svg
    .append('g')
    .append('circle')
    .style('fill', 'grey')
    .attr('stroke', 'black')
    .attr('r', 4.5)
    .style('opacity', 0);

  bisect = d3.bisector((d: ChartData) => d.date).left;

  div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  draw(data);
}

export function cleanup() {
  d3.select('svg').remove();
}

export function draw(data: ChartData[]) {
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
      { offset: '0%', color: 'red' },
      { offset: '100%', color: 'blue' },
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
    .attr('stroke-width', 1.8)
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

  // create a rectangle on top the svg area to recover mouse positions
  svg
    .append('rect')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .on('touchmove mousemove', (evt: MouseEvent) => moveFn(evt, data))
    .on('touchend mouseleave', leaveFn);
}

function moveFn(evt: MouseEvent, data: ChartData[]) {
  const x0 = xAxis.invert(d3.pointer(evt)[0]);
  const index = bisect(data, x0, 1);
  const d0 = data[index - 1];
  const d1 = data[index];
  const d =
    x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime()
      ? d1
      : d0;
  const { date, value } = d;

  // use baseX and baseY to make the tooltip move with the pointer on the exact valie on the chart
  const baseX = xAxis(date);
  const baseY = yAxis(value);
  // use pointerX and pointerY to make the tooltip move with the mouse
  const [x, y] = d3.pointer(evt);

  div.style('opacity', 0.9);
  div
    .html(`${formatDate(date)}<br />${value.toFixed(2)}`)
    .style('left', `${baseX}px`)
    .style('top', `${baseY}px`);
  focus.attr('cx', baseX).attr('cy', baseY).style('opacity', 1);
}

function leaveFn() {
  focus.style('opacity', 0);
  div.style('opacity', 0);
}

function formatDate(date: Date) {
  return date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
