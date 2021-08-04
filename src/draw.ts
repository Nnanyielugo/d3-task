import * as d3 from 'd3';
import './draw.css';
import type { ChartData, Margin, Ref } from './interfaces';

const WIDTH = 1200;
const HEIGHT = 600;

const margin: Margin = {
  top: 50,
  right: 40,
  bottom: 50,
  left: 80,
};

type D3SVGSelection = d3.Selection<SVGGElement, unknown, null, undefined>;
interface D3BrushEvent {
  selection: [number, number];
}
let svg: D3SVGSelection;
let xAxis: d3.ScaleTime<number, number, never>;
let yAxis: d3.ScaleLinear<number, number, never>;
let max: number;
let focus: d3.Selection<SVGCircleElement, unknown, null, undefined>;
let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
let tpDate: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
let tpValue: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

let bisect: (
  array: ArrayLike<ChartData>,
  x: Date,
  lo?: number | undefined,
  hi?: number | undefined
) => number;
let line: D3SVGSelection;
let drawX: D3SVGSelection;
let drawY: D3SVGSelection;
let idleTimeout: NodeJS.Timer | null;
let brush: any; // FIX ME

let graphData: ChartData[];
let showTPInteraction: boolean;
let parentNode: Ref;

export function create(node: Ref, data: ChartData[], showInteraction: boolean) {
  cleanup();
  graphData = data;
  showTPInteraction = showInteraction;
  parentNode = node;
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

  tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
  tpDate = tooltip.append('div').attr('class', 'tooltip-date');
  tpValue = tooltip.append('div');
  tpValue.append('span').attr('class', 'tooltip-value');

  draw(data, showInteraction);
}

export function cleanup() {
  d3.select('svg').remove();
}

export function draw(data: ChartData[], showInteraction: boolean) {
  drawX = svg.append('g').attr('transform', `translate(0, ${HEIGHT})`).call(
    d3.axisBottom(xAxis)
    // .ticks(d3.timeMonth)
    // .tickFormat(((d: Date) => {
    //   return d.getTime() <= d3.timeYear(d).getTime()
    //     ? d.getFullYear()
    //     : d.toLocaleString('en', {
    //         month: 'short',
    //       });
    // }) as any)
  );
  // .call(xScale.ticks(d3.timeMonth).tickFormat(d3.timeFormat('%b') as any));

  drawY = svg.append('g').call(d3.axisLeft(yAxis));

  // add a clipPath: everything outside the clip path won't be drawn
  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('x', 0)
    .attr('y', 0);

  brush = d3
    .brushX()
    .extent([
      [0, 0],
      [WIDTH, HEIGHT],
    ]) // select entire graph area
    .on('end', updateChart);

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

  line = svg.append('g').attr('clip-path', 'url(#clip)');

  //  draw
  const path = line
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('class', 'line')
    .attr('stroke', showInteraction ? 'url(#line-gradient)' : 'steelblue')
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

  // add brushing
  line.append('g').attr('class', 'brush').call(brush);

  // create a rectangle on top the svg area to recover mouse positions

  if (showInteraction) {
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

    // svg
    //   .append('rect')
    //   .style('fill', 'none')
    //   .style('pointer-events', 'all')
    //   .attr('width', WIDTH)
    //   .attr('height', HEIGHT)
    //   .on('touchmove mousemove', (evt: MouseEvent) => moveFn(evt, data))
    //   .on('touchend mouseleave', leaveFn);

    svg
      .append('g')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(d3.pairs(data))
      .join('rect')
      .attr('x', ([a, b]) => xAxis(a.date))
      .attr('height', HEIGHT)
      .attr('width', ([a, b]) => xAxis(b.date) - xAxis(a.date))
      .on('touchmove mousemove', (evt: MouseEvent) => moveFn(evt, data))
      .on('touchend mouseleave', leaveFn);
  }
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

  tooltip.style('opacity', 0.9);
  tooltip.select('.tooltip-date').text(formatDate(date));
  tooltip.select('.tooltip-value').text(value.toFixed(2));
  tooltip.style('left', `${evt.pageX}px`).style('top', `${evt.pageY}px`);
  focus.attr('cx', baseX).attr('cy', baseY).style('opacity', 1);
}

function leaveFn() {
  focus.style('opacity', 0);
  tooltip.style('opacity', 0);
}

function formatDate(date: Date) {
  return date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
function updateChart(evt: D3BrushEvent) {
  // find selected boundaries
  let extent = evt.selection;
  // if no selection, back to initial coordinates
  if (!extent) {
    if (!idleTimeout) {
      return (idleTimeout = setTimeout(idled, 350));
    }
    xAxis.domain([4, 8]);
  } else {
    xAxis.domain([xAxis.invert(extent[0]), xAxis.invert(extent[1])]);
    line.select('.brush').call(brush.move, null);
  }

  drawX.transition().duration(1000).call(d3.axisBottom(xAxis));

  line
    .select('.line')
    .transition()
    .duration(1000)
    .attr(
      'd',
      d3
        .line()
        .x((d: any) => xAxis(d.date))
        .y((d: any) => yAxis(d.value)) as any
    );
  svg.on('dblclick', reinitialize);
}
function idled() {
  idleTimeout = null;
}

function reinitialize() {
  // xAxis.domain(d3.extent(graphData, (d) => d.date) as any);
  // drawX.transition().call(d3.axisBottom(xAxis));
  // line
  //   .select('.line')
  //   .transition()
  //   .duration(1000)
  //   .attr(
  //     'd',
  //     d3
  //       .line()
  //       .x((d: any) => xAxis(d.date))
  //       .y((d: any) => yAxis(d.value)) as any
  //   );
  create(parentNode, graphData, showTPInteraction);
}
