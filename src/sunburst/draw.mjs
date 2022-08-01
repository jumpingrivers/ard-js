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
  
  const shadow = select(container.node().shadowRoot);

  shadow.html(vizTemplate);

  const svg = shadow.select('#graphic')
    .attr('viewBox', `${-radius} ${-radius} ${width} ${height}`)
    .datum(sunburstData);

  const arcLayer = svg.append('g')
    .attr('id', 'arc-layer');

  const pathGenerator = arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1));

  const part = partition()
    .size([2 * Math.PI, Math.pow(radius, 2)])(sunburstData);

  arcLayer.selectAll('path')
    .data(part.descendants().filter(function(d) {
      return d.depth;
    }))
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .style('fill', '#add8e6')
    .style('stroke', '#888888');
};


export { drawSunburst };