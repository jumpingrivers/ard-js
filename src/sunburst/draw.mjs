import { select } from 'd3-selection';
import 'd3-transition';
import { hierarchy, partition } from 'd3-hierarchy';
import { arc } from 'd3-shape';
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
    else {
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
      .data(data)
      .attr('d', pathGenerator);

    paths.enter()
      .append('path')
      .attr('class', 'sunburst-section')
      .attr('d', pathGenerator)
      .style('fill', '#add8e6')
      .style('stroke', '#888888')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .filter(d => d.height)
      .style('cursor', 'pointer')
      .on('click', click);

    paths.exit().remove();

    resetButton.attr('disabled', stack.length > 1 ? null : 'disabled');
  };

  const resetButton = shadow.select('#reset button')
    .on('click', () => drawSunburst.call(instance, sunburstData));

  drawArcs();
};


export { drawSunburst };