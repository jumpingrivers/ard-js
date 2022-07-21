import { select } from 'd3-selection';
import 'd3-transition';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { v4 as uuid } from 'uuid';
import { processData } from './process-data.mjs';

const animationDuration = 1000;


const _createId = function(suffix) {
  return function(str = '') {
    return `${str}-${suffix}`;
  };
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
    .style('stroke-opacity', '0.25')
    .style('fill', 'none');
};


const drawNodeHover = function(hoveredNode, hoverData, lookup) {
  const container = select(this.viz);
  const svg = container.select('svg');
  const createId = _createId(svg.datum().suffix);
  const nSteps = hoverData.steps.length;
  const hoveredNodeData = hoveredNode.datum();
  const { id, stepNumber } = hoveredNodeData;
  const hoverNodeGroup = select(`#${createId('hover-node-group')}`);
  const hoverLinkGroup = select(`#${createId('hover-link-group')}`);

  const hoverNodes = hoverNodeGroup.selectAll('rect')
    .data(hoverData.sankeyNodes)
    .enter()
    .append('rect')
    .each(function(d) {
      const ud = select(`#${lookup[d.id]}`).datum();

      const data = {
        id: d.id,
        x0: ud.x0,
        x1: ud.x1,
        entries: d.entries,
        stepNumber: d.stepNumber, 
        countInUsed: d.stepNumber ? 0 : d.entries.length,
        countOutUsed: d.stepNumber  < nSteps - 1 ? 0 : d.entries.length
      };

      if (d.id === id) {
        data.y0 = ud.y0;
        data.y1 = ud.y1;
        d.countInUsed = d.entries.length;
        d.countOutUsed = d.entries.length;
      }

      select(this).datum(data);
    });

  const hoveredNodeLookup = hoverNodes.data().reduce(function(obj, d) {
    obj[d.id] = d;
    return obj;
  }, {});

  const hoverLinks = hoverLinkGroup.selectAll('path')
    .data(hoverData.sankeyLinks)
    .enter()
    .append('path');

  hoverLinks.filter(d => [d.sourceId, d.targetId].includes(id))
    .each(function(d) {
      const ld = select(`#${lookup[d.id]}`).datum();
      // Effectively copy these links from the base layer to the hover layer
      select(this)
        .datum(Object.assign({}, ld));

      const halfHeight = ld.width / 2;

      if (d.sourceId !== id) {
        const data = hoveredNodeLookup[d.sourceId];
        data.y0 = ld.y0 - halfHeight;
        data.y1 = ld.y0 + halfHeight;
        data.countOutUsed = data.entries.length;
      }
      else {
        const data = hoveredNodeLookup[d.targetId];
        data.y0 = ld.y1 - halfHeight;
        data.y1 = ld.y1 + halfHeight;
        data.countInUsed = data.entries.length;
      }
    });

  hoverNodes.filter(d => Math.abs(stepNumber - d.stepNumber) > 1)
    .each(function(d) {
      const ud = select(`#${lookup[d.id]}`).datum();
      const midpoint = (ud.y1 + ud.y0) / 2;
      const oldHeight = ud.y1 - ud.y0;
      const newHeight = oldHeight * (d.entries.length / ud.entries.length);

      d.y0 = midpoint - newHeight / 2;
      d.y1 = midpoint + newHeight / 2;
    });

  const addLinkLeft = function(link, source) {
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

  const addLinkRight = function(link, target) {
    const countUsed = target.countInUsed;
    const singleCountHeight = (target.y1 - target.y0) / target.entries.length;
    const count = link.entries.length;
    const height = count * singleCountHeight;
    const top = target.y0 + (countUsed * singleCountHeight);
    link.target = target;
    link.y1 = top + height / 2;
    target.countInUsed += count;
  };

  const sourceToLinkAndTarget = hoverLinks.data().reduce(function(obj, d) {
    if (!obj[d.sourceId]) { obj[d.sourceId] = []; }
    obj[d.sourceId].push( {link: d, target: hoveredNodeLookup[d.targetId] });
    return obj;
  }, {});

  Object.values(sourceToLinkAndTarget).forEach(function(arr) {
    arr.sort((a, b) => a.target.y0 - b.target.y0);
  });

  hoverNodes.filter(function(d) {
    const diff = d.stepNumber - stepNumber;
    return diff < -1 || (diff > 0 && (d.stepNumber < nSteps - 1));
  })
    .data()
    .sort((a, b) => a.y0 - b.y0)
    .forEach(function(source) {
      sourceToLinkAndTarget[source.id].forEach(function({link, target}) {
        addLinkLeft(link, source);
        addLinkRight(link, target);
      });
    });

  hoverNodes.call(drawNode, true);

  hoverLinks.call(drawLink, true);
};


const drawSankey = function(sankeyData) {
  const instance = this;
  const { sankeyNodes, sankeyLinks, steps } = sankeyData;
  const container = select(instance.viz);
  const textOffset = 5;
  const width = 1000;
  const height = width / instance.aspect();
  const padding = 10;
  const suffix = uuid();
  const lookup = {};

  const createId = _createId(suffix);

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
    .datum({suffix})
    .attr('id', createId('svg'))
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%');

  const baseLayer = svg.append('g')
    .attr('id', createId('base-layer'));

  const linkGroup = baseLayer.append('g')
    .attr('id', createId('base-link-group'));

  linkGroup.selectAll('path')
    .data(sankeyLinks)
    .enter()
    .append('path')
    .attr('id', function(d) {
      const id = createId(`link-${uuid()}`);
      lookup[d.id] = id;
      return id;
    })
    .call(drawLink);

  const nodeGroup = baseLayer.append('g')
    .attr('id', createId('base-node-group'));

  nodeGroup.selectAll('rect')
    .data(sankeyNodes)
    .enter()
    .append('rect')
    .attr('id', function(d) {
      const id = createId(`node-${uuid()}`);
      lookup[d.id] = id;
      return id;
    })
    .call(drawNode)
    .on('mouseover', function(_, d) {
      linkGroup.interrupt().style('opacity', 0);
      const filter = { key: d.group, value: d.name};
      const hoverData = processData(sankeyData.data, sankeyData.currentStepNames, [filter]);
      drawNodeHover.call(instance, select(this), hoverData, lookup);
    })
    .on('mouseout', function() {
      linkGroup.transition().duration(animationDuration).style('opacity', 1);
      hoverNodeGroup.text('');
      hoverLinkGroup.text('');
    });

  const textGroup = baseLayer.append('g')
    .style('pointer-events', 'none')
    .attr('id', createId('base-text-group'));

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

  const hoverLayer = svg.append('g')
    .attr('id', createId('hover-layer'))
    .style('pointer-events', 'none');

  const hoverLinkGroup = hoverLayer.append('g')
    .attr('id', createId('hover-link-group'));
  
  const hoverNodeGroup = hoverLayer.append('g')
    .attr('id', createId('hover-node-group'));
};


export { drawSankey };