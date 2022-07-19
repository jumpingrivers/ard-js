import { create } from 'd3-selection';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';


const drawSankey = function(sankeyData) {
  const { sankeyNodes, sankeyLinks } = sankeyData;

  sankey()
    .nodeId(d => d.id)
    .nodes(sankeyNodes)
    .links(sankeyLinks)
    .extent([[10, 10], [990, 990]])
    ();

  const container = create('div')
    .style('width', '100%');

  const svg = container.append('svg:svg')
    .attr('viewBox', '0 0 1000 1000')
    .style('width', '100%');

  svg.selectAll('path')
    .data(sankeyLinks)
    .enter()
    .append('path')
    .attr('d', sankeyLinkHorizontal())
    .attr('stroke-width', d => d.width)
    .style('stroke', '#add8e6')
    .style('stroke-opacity', '0.25')
    .style('fill', 'none');

  svg.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', '#add8e6');

  return container;
};


export { drawSankey };