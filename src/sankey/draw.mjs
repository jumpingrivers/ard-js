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


const drawHoverLayer = function(hoveredEntity, hoverData, lookup) {
  const nSteps = hoverData.steps.length;
  const { id, sourceId, targetId } = hoveredEntity.datum();

  const svg = getSvg(this);
  const hoverLayer = svg.select('#hover-layer');
  const hoverNodeGroup = hoverLayer.append('g');
  const hoverLinkGroup = hoverLayer.append('g');

  const offCenterNodes = new Map();

  if (sourceId !== undefined) {
    const ud = hoveredEntity.datum();
    offCenterNodes.set(sourceId, ud.y0);
    offCenterNodes.set(targetId, ud.y1);
  }
  else {
    hoverData.sankeyLinks.forEach(function(d) {
      if ([d.sourceId, d.targetId].includes(id)) {
        const ud = select(lookup[d.id]).datum();
        const findingSource = d.sourceId !== id;
        const nodeId = findingSource ? d.sourceId : d.targetId;
        const midpoint = findingSource ? ud.y0 : ud.y1;
        offCenterNodes.set(nodeId, midpoint);
      }
    });
  }

  const hoverNodes = hoverNodeGroup.selectAll('rect')
    .data(hoverData.sankeyNodes)
    .enter()
    .append('rect')
    .each(function(d) {
      const ud = select(lookup[d.id]).datum();
      const midpoint = offCenterNodes.has(d.id) ? offCenterNodes.get(d.id) : (ud.y1 + ud.y0) / 2; 
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

  const hoveredNodeLookup = hoverNodes.data().reduce(function(obj, d) {
    obj[d.id] = d;
    return obj;
  }, {});

  const sourceToLinkAndTarget = hoverData.sankeyLinks.reduce(function(obj, d) {
    if (!obj[d.sourceId]) { obj[d.sourceId] = []; }
    obj[d.sourceId].push( {link: d, target: hoveredNodeLookup[d.targetId] });
    return obj;
  }, {});

  Object.values(sourceToLinkAndTarget).forEach(function(arr) {
    arr.sort((a, b) => a.target.y0 - b.target.y0);
  });

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

  const hoverLinks = hoverLinkGroup.selectAll('path')
    .data(hoverData.sankeyLinks)
    .enter()
    .append('path');

  hoverNodes.filter(function(d) {
    return d.stepNumber < nSteps - 1;
  })
    .data()
    .sort((a, b) => a.y0 - b.y0)
    .forEach(function(source) {
      sourceToLinkAndTarget[source.id].forEach(function({link, target}) {
        addLinkStart(link, source);
        addLinkEnd(link, target);
      });
    });

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

  const textGroup = baseLayer.append('g')
    .style('pointer-events', 'none')
    .attr('id', 'base-text-group');

  const hoverLayer = svg.append('g')
    .attr('id', 'hover-layer')
    .style('pointer-events', 'none');

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
    .each(function(d) { lookup[d.id] = this; })
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);

  nodeGroup.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .call(drawNode)
    .each(function(d) { lookup[d.id] = this; })
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);

  textGroup.selectAll('text')
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