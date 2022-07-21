import { select } from 'd3-selection';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';


const drawSankey = function(sankeyData) {
  const { sankeyNodes, sankeyLinks, steps } = sankeyData;
  const container = select(this.viz);
  const textOffset = 5;
  const width = 1000;
  const height = width / this.aspect();
  const padding = 10;

  const getTextSide = function(d) {
    return (d.stepNumber >= steps.length / 2) ? 'left' : 'right';
  };

  // Clear the container of everything;
  container.text('');

  sankey()
    .nodeId(d => d.id)
    .nodes(sankeyNodes)
    .links(sankeyLinks)
    .extent([[padding, padding], [width - padding, height - padding]])
    ();

  const svg = container.append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%');

  const linkGroup = svg.append('g');

  linkGroup.selectAll('path')
    .data(sankeyLinks)
    .enter()
    .append('path')
    .attr('d', sankeyLinkHorizontal())
    .attr('stroke-width', d => d.width)
    .style('stroke', '#add8e6')
    .style('stroke-opacity', '0.25')
    .style('fill', 'none');

  const nodeGroup = svg.append('g');

  nodeGroup.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', '#add8e6');

  const textGroup = svg.append('g')
    .style('pointer-events', 'none');

  textGroup.selectAll('text')
    .data(sankeyNodes)
    .enter()
    .append('text')
    .text(d => d.name)
    .attr('x', function(d) { 
      return getTextSide(d) === 'right' ? d.x1 + textOffset : d.x0 - textOffset;
    })
    .attr('y', d => (d.y0 + d.y1) / 2)
    .attr('text-anchor', d => getTextSide(d) === 'right' ? 'start' : 'end');
};


export { drawSankey };