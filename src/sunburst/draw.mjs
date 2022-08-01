import { select } from 'd3-selection';
import 'd3-transition';
import { partition } from 'd3-hierarchy';
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

  const pathGenerator = arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1));

  const part = partition()
    .size([2 * Math.PI, Math.pow(radius, 2)])(sunburstData);

  const mouseover = function(_, d) {
    const data = d.ancestors().filter(d => d.depth);

    hoverLayer.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .style('fill', 'red')
      .style('stroke', 'black');

    const percent = (d.value / sunburstData.value) * 100;

    textLayer
      .append('text')
      .text(`${percent.toPrecision(2)}%`)
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
 
  baseLayer.selectAll('path')
    .data(part.descendants().filter(function(d) {
      return d.depth;
    }))
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .style('fill', '#add8e6')
    .style('stroke', '#888888')
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);
};


export { drawSunburst };