import { select } from 'd3-selection';
import 'd3-transition';
import { hierarchy, partition } from 'd3-hierarchy';
import { arc } from 'd3-shape';
import { interpolateNumber } from 'd3-interpolate';
import vizTemplate from './viz-templates/index.html';

const baseWidth = 1000;


const drawSunburst = function(sunburstData) {
  const instance = this;
  const container = select(instance.viz);
  
  const width = baseWidth;
  const height = baseWidth;
  const radius = width / 2;
  const breadcrumbHeight = 50;
  
  const shadow = select(container.node().shadowRoot);

  shadow.html(vizTemplate);

  const svg = shadow.select('#graphic')
    .attr('viewBox', `${-radius} ${-radius} ${width} ${height}`)
    .datum(sunburstData);

  const breadcrumb = shadow.select('#breadcrumb')
    .attr('viewBox', `0 0 ${width} ${breadcrumbHeight}`);

  const baseLayer = svg.append('g')
    .attr('id', 'base-layer');

  const textLayer = svg.append('g')
    .attr('id', 'text-layer');

  const hoverLayer = svg.append('g')
    .attr('id', 'hover-layer')
    .style('pointer-events', 'none');

  let pathGenerator;

  const mouseover = function(_, d) {
    mouseout();
    const data = d.ancestors().filter(d => d.depth);

    hoverLayer.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .style('fill', 'red')
      .style('stroke', 'black');

    const percent = (d.value / svg.datum().value) * 100;

    textLayer
      .append('text')
      .text(`${percent >= 100 ? '100' : percent.toPrecision(2)}%`)
      .style('text-anchor', 'middle')
      .style('font-size', '75px')
      .style('dominant-baseline', 'middle');

    breadcrumb.selectAll('span')
      .data(data.slice().reverse())
      .enter()
      .append('span')
      .text(function(d) {
        const prefix = '';
        const suffix = '';
        return `${prefix}${d.data.name}${suffix}`;
      });
  };

  const mouseout = function() {
    hoverLayer.text('');
    textLayer.text('');
    breadcrumb.text('');
  };

  let stack = [sunburstData];

  const click = function(evt, d) {
    let drilled = false;

    if (evt.shiftKey) {
      if (d.depth === 1 && stack.length > 1) {
        const root = stack.pop();
        drawArcs(root);
        drilled = true;
      }
    }
    else if (d.height) {
      const ancestors = d.ancestors().reverse().map(d => d.data);
      for (const ancestor of ancestors) {
        if (!stack.includes(ancestor)) { stack.push(ancestor); }
      }
      drawArcs();
      drilled = true;
    }

    if (!drilled) { return; }

    const x = evt.clientX;
    const y = evt.clientY;
    const newSelection = select(shadow.node().elementFromPoint(x, y));
    if (!newSelection.classed('sunburst-section')) { return; }
    newSelection.dispatch('mouseover');
  };
  

  const drawArcs = function() {
    const root = stack[stack.length - 1];

    const h = hierarchy(root)
      .sum(d => d.value || 0)
      .sort((a, b) => b.value - a.value);

    const part = partition()
      .size([2 * Math.PI, Math.pow(radius, 2)])(h);

    svg.datum(part);

    const data = part.descendants().filter(d => d.depth);

    pathGenerator = arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => Math.sqrt(d.y0))
      .outerRadius(d => Math.sqrt(d.y1));

    const paths =  baseLayer.selectAll('path')
      .data(data, d => d.data.id)
      .classed('inner-annulus', d => d.depth === 1)
      .classed('outer-annulus', d => !d.height);

    hoverLayer.classed('hidden', true);

    paths
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const start = d.data.start;
        const x0 = interpolateNumber(start.x0, d.x0);
        const x1 = interpolateNumber(start.x1, d.x1);
        const y0 = interpolateNumber(start.y0, d.y0);
        const y1 = interpolateNumber(start.y1, d.y1);
        d.data.start = d;
        return function(t) {
          const props = { x0: x0(t), x1: x1(t), y0: y0(t), y1: y1(t) };
          return pathGenerator(props);
        };
      })
      .end()
      .then(function() {
        hoverLayer.classed('hidden', false);
      });

    paths.enter()
      .append('path')
      .attr('class', 'sunburst-section')
      .attr('d', pathGenerator)
      .classed('inner-annulus', d => d.depth === 1)
      .classed('outer-annulus', d => !d.height)
      .style('fill', '#add8e6')
      .style('stroke', '#888888')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('click', click)
      .each(function(d) {
        const { x0, x1, y0, y1 } = d;
        d.data.start = { x0, x1, y0, y1};
      });

    paths.exit().remove();

    resetButton.attr('disabled', stack.length > 1 ? null : 'disabled');
    baseLayer.classed('drilled-down', stack.length > 1);
  };

  const resetButton = shadow.select('#reset button')
    .on('click', () => drawSunburst.call(instance, sunburstData));

  drawArcs();

  select(document)
    .on('keydown.shift', function(evt) {
      if (evt.key === 'Shift') { baseLayer.classed('shift-pressed', true); }
    })
    .on('keyup.shift', function(evt) {
      if (evt.key === 'Shift') { baseLayer.classed('shift-pressed', false); }
    });
};


export { drawSunburst };