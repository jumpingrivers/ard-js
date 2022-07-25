import { select } from 'd3-selection';
import 'd3-transition';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { processData } from './process-data.mjs';

const linkOpacity = 0.25;
const baseLinkOpacityOnHover = 0.5;
const animationDuration = 1000;


const getSvg = function(instance) {
  return select(instance.viz.shadowRoot).select('svg');
};


const drawNode = function(selection, hover) {
  selection.attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', hover ? 'red' : '#add8e6')
    .style('cursor', 'pointer');
};


const drawLink = function(selection, hover) {
  selection.attr('d', sankeyLinkHorizontal())
    .attr('stroke-width', d => d.width)
    .style('stroke', hover ? 'red' : '#add8e6')
    .style('stroke-opacity', linkOpacity)
    .style('fill', 'none');
};


const drawHoverLayer = function(hoveredElement, hoverData, lookup) {
  const { id, sourceId, targetId } = hoveredElement.datum();
  const { sankeyLinks, sankeyNodes, steps } = hoverData;
  const nSteps = steps.length;
  
  const svg = getSvg(this);
  const hoverLayer = svg.select('#hover-layer');
  const hoverNodeGroup = hoverLayer.append('g');
  const hoverLinkGroup = hoverLayer.append('g');

  // Determine which nodes will be off-center
  const offCenterNodes = {};
  if (sourceId !== undefined) {
    const ud = hoveredElement.datum();
    offCenterNodes[sourceId] =  ud.y0;
    offCenterNodes[targetId] =  ud.y1;
  }
  else {
    sankeyLinks.forEach(function(d) {
      if ([d.sourceId, d.targetId].includes(id)) {
        const ud = lookup[d.id];
        const findingSource = d.sourceId !== id;
        const nodeId = findingSource ? d.sourceId : d.targetId;
        const midpoint = findingSource ? ud.y0 : ud.y1;
        offCenterNodes[nodeId] = midpoint;
      }
    });
  }

  // Add the nodes to the DOM
  const hoverNodes = hoverNodeGroup.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .each(function(d) {
      const ud = lookup[d.id];
      const midpoint = offCenterNodes[d.id] !== undefined ? offCenterNodes[d.id] : (ud.y1 + ud.y0) / 2; 
      const oldHeight = ud.y1 - ud.y0;
      const height = oldHeight * (d.entries.length / ud.entries.length);

      const data = {
        id: d.id,
        x0: ud.x0,
        x1: ud.x1,
        y0: midpoint - height / 2,
        y1: midpoint + height / 2,
        entries: d.entries,
        stepNumber: d.stepNumber, 
        countInUsed: d.stepNumber ? 0 : d.entries.length,
        countOutUsed: d.stepNumber  < nSteps - 1 ? 0 : d.entries.length
      };

      select(this).datum(data);
    });

  // Create object that maps node id to node data
  const hoveredNodeLookup = hoverNodes.data().reduce(function(obj, d) {
    obj[d.id] = d;
    return obj;
  }, {});

  // Create object that links source node to link/target-node pairs
  const sourceToLinksAndTargets = sankeyLinks.reduce(function(obj, d) {
    if (!obj[d.sourceId]) { obj[d.sourceId] = []; }
    obj[d.sourceId].push({ link: d, target: hoveredNodeLookup[d.targetId] });
    return obj;
  }, {});

  // Sort target nodes from top to bottom to minimise link overlap
  Object.values(sourceToLinksAndTargets).forEach(function(arr) {
    arr.sort((a, b) => a.target.y0 - b.target.y0);
  });

  // Set y0 and width of link based on source node
  const addLinkStart = function(link, source) {
    const countUsed = source.countOutUsed;
    const singleCountHeight = (source.y1 - source.y0) / source.entries.length;
    const count = link.entries.length;
    const height = count * singleCountHeight;
    const top = source.y0 + (countUsed * singleCountHeight);
    link.source = source;
    link.y0 = top + height / 2;
    link.width = height;
    source.countOutUsed += count;
  };

  // Set y1 of link based on target node
  const addLinkEnd = function(link, target) {
    const countUsed = target.countInUsed;
    const singleCountHeight = (target.y1 - target.y0) / target.entries.length;
    const count = link.entries.length;
    const height = count * singleCountHeight;
    const top = target.y0 + (countUsed * singleCountHeight);
    link.target = target;
    link.y1 = top + height / 2;
    target.countInUsed += count;
  };

  // Add the links to the DOM
  const hoverLinks = hoverLinkGroup.selectAll('path')
    .data(sankeyLinks)
    .enter()
    .append('path');

  // Use node data to fill in link data
  hoverNodes
    .filter(function(d) { // We only want nodes that are a source of one or more links
      return d.stepNumber < nSteps - 1;
    })
    .data()
    .sort((a, b) => a.y0 - b.y0) // Sort from top to bottom
    .forEach(function(source) {
      const linksAndTargets = sourceToLinksAndTargets[source.id];
      linksAndTargets.forEach(function({link, target}) {
        addLinkStart(link, source); // Add link starting position and "width" (height)
        addLinkEnd(link, target); // Add link ending position
      });
    });

  // Render the nodes and links
  hoverNodes.call(drawNode, true);
  hoverLinks.call(drawLink, true);
};


const drawSankey = function(sankeyData) {
  const instance = this;
  const { sankeyNodes, sankeyLinks, steps } = sankeyData;
  const container = select(instance.viz);
  const shadow = select(container.node().shadowRoot);
  const textOffset = 5;
  const width = 1000;
  const height = width / instance.aspect();
  const padding = 10;
  const lookup = {};

  const getTextSide = function(d) {
    return (d.stepNumber >= steps.length / 2) ? 'left' : 'right';
  };

  // Clear the container of everything;
  shadow.text('');

  sankey()
    .nodeId(d => d.id)
    .nodes(sankeyNodes)
    .links(sankeyLinks)
    .extent([[padding, padding], [width - padding, height - padding]])
    ();

  const svg = shadow.append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%');

  const baseLayer = svg.append('g')
    .attr('id', 'base-layer');

  const linkGroup = baseLayer.append('g')
    .attr('id', 'base-link-group');

  const nodeGroup = baseLayer.append('g')
    .attr('id', 'base-node-group');

  const hoverLayer = svg.append('g')
    .attr('id', 'hover-layer')
    .style('pointer-events', 'none');

  const textLayer = svg.append('g')
    .style('pointer-events', 'none')
    .attr('id', 'text-layer');

  const mouseover = function(_, d) {
    linkGroup.transition().style('opacity', baseLinkOpacityOnHover);
    const filter = [];
    if (d.sourceId) {
      filter.push({ key: d.source.group, value: d.source.name });
      filter.push({ key: d.target.group, value: d.target.name });
    }
    else {
      filter.push({ key: d.group, value: d.name });
    }
    const hoverData = processData(sankeyData.data, sankeyData.currentStepNames, filter);
    drawHoverLayer.call(instance, select(this), hoverData, lookup);
  };

  const mouseout = function() {
    hoverLayer.text('');
    linkGroup.interrupt().transition().duration(animationDuration).style('opacity', 1);
  };

  linkGroup.selectAll('path')
    .data(sankeyLinks)
    .enter()
    .append('path')
    .call(drawLink)
    .each(function(d) { lookup[d.id] = d; })
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);

  nodeGroup.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .call(drawNode)
    .each(function(d) { lookup[d.id] = d; })
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);

  textLayer.selectAll('text')
    .data(sankeyNodes)
    .enter()
    .append('text')
    .text(d => d.name)
    .attr('x', function(d) { 
      return getTextSide(d) === 'right' ? d.x1 + textOffset : d.x0 - textOffset;
    })
    .attr('y', d => (d.y0 + d.y1) / 2)
    .attr('text-anchor', d => getTextSide(d) === 'right' ? 'start' : 'end')
    .attr('dominant-baseline', 'middle');
};


export { drawSankey };