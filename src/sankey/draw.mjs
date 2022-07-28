import { create, select } from 'd3-selection';
import 'd3-transition';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import Handlebars from 'handlebars';
import { processData } from './process-data.mjs';
import vizTemplate from './viz-templates/index.html';
import nodeTemplateString from './popup-templates/node.html';
import linkTemplateString from './popup-templates/link.html';
import popupStyleString from './popup-templates/popup.css';
import { ascending } from 'd3-array';

const linkOpacity = 0.25;
const baseLinkOpacityOnHover = 0.5;
const baseWidth = 1000;
const padding = 10;
const bottomPadding = 3 * padding;
const animationDuration = 1000;

const nodeTemplate = Handlebars.compile(nodeTemplateString);
const linkTemplate = Handlebars.compile(linkTemplateString);

const getSvg = function(instance) {
  return select(instance.viz.shadowRoot).select('#graphic');
};


const drawNode = function(selection, hover) {
  selection
    .attr('class', 'node')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', hover ? 'red' : '#add8e6')
    .style('cursor', 'pointer');
};


const drawLink = function(selection, hover) {
  selection
    .attr('class', 'link')
    .attr('d', sankeyLinkHorizontal())
    .attr('stroke-width', d => d.width)
    .style('stroke', hover ? 'red' : '#add8e6')
    .style('stroke-opacity', linkOpacity)
    .style('fill', 'none');
};


const drawText = function(selection, nSteps) {
  const textOffset = 5;

  const getTextSide = function(d) {
    return (d.stepNumber >= nSteps / 2) ? 'left' : 'right';
  };

  selection.text(d => d.name)
    .attr('x', function(d) { 
      return getTextSide(d) === 'right' ? d.x1 + textOffset : d.x0 - textOffset;
    })
    .attr('y', d => (d.y0 + d.y1) / 2)
    .attr('text-anchor', d => getTextSide(d) === 'right' ? 'start' : 'end')
    .attr('dominant-baseline', 'middle');
};


const drawHoverLayer = function(hoveredSelection, hoverData, lookup) {
  const { id, sourceId, targetId } = hoveredSelection.datum();
  const { sankeyLinks, sankeyNodes, steps } = hoverData;
  const nSteps = steps.length;
  
  const svg = getSvg(this);
  const hoverLayer = svg.select('#hover-layer');
  const hoverNodeGroup = hoverLayer.append('g');
  const hoverLinkGroup = hoverLayer.append('g');

  // Determine which nodes will be off-center
  const offCenterNodes = {};
  if (sourceId !== undefined) {
    const ud = hoveredSelection.datum();
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


const getPopup = function(instance) {
  return select(instance.viz.shadowRoot).select('#popup');
};

const getPopupContent = function(instance) {
  const popup = getPopup(instance);
  return select(popup.node().shadowRoot).select('#popup-content');
};


const showPopup = function(hoveredSelection, totalCount) {
  const instance = this;
  const popup = getPopup(instance);
  popup.classed('hidden' , false);
  const popupContent = getPopupContent(instance);

  const data = hoveredSelection.datum();
  const isLink = data.sourceId !== undefined;
  
  if (isLink) {
    const templateString = instance.linkPopupTemplate();
    if (templateString === '') { return; }
    const template = templateString ? Handlebars.compile(templateString) : linkTemplate;

    const count = data.entries.length;
    const sourceCount = data.source.entries.length;
    const targetCount = data.target.entries.length;
    const props = {
      sourceName: data.sourceName,
      targetName: data.targetName,
      count,
      totalCount,
      percentageOfSourceCount: Math.round((count/sourceCount)*100),
      percentageOfTargetCount: Math.round((count/targetCount)*100),
    };
    popupContent.html(template(props));
  }
  else {
    const templateString = instance.nodePopupTemplate();
    if (templateString === '') { return; }
    const template = templateString ? Handlebars.compile(templateString) : nodeTemplate;

    const props = {
      name: data.name,
      count: data.entries.length,
      totalCount
    };
    popupContent.html(template(props));
  }
};


const hidePopup = function() {
  const instance = this;
  getPopup(instance).classed('hidden' , true);
};


const positionPopup = function(hoveredSelection, coords) {
  const instance = this;
  const svg = getSvg(instance);
  const popup = getPopup(instance);
  const svgBounds = svg.node().getBoundingClientRect();
  const data = hoveredSelection.datum();
  const px = v => `${v}px`;

  popup
    .style('top', px(coords.y))
    .style('left', px(coords.x));

  const top = 'translateY(-100%) translateY(-5px)';
  const right = 'translateX(20px)';
  const bottom = 'translateY(20px)';
  const left = 'translateX(-100%) translateX(-5px)';

  const topRight = `${right} ${top}`;
  const bottomRight = `${right} ${bottom}`;
  const bottomLeft = `${left} ${bottom}`;
  const topLeft = `${left} ${top}`;  

  let order = [bottomRight, topLeft, topRight, bottomLeft];
  if (data.sourceId !== undefined) {
    if (data.y1 > data.y0) {
      order = [bottomLeft, topRight, topLeft, bottomRight];
    }
  }

  const isContained = function({top, right, bottom, left}) {
    if (top < svgBounds.top) { return false; }
    if (right > svgBounds.right) { return false; }
    if (bottom > svgBounds.bottom) { return false; }
    if (left < svgBounds.left) { return false; }
    return true;
  };

  for(const transform of order) {
    popup.style('transform', transform);
    const bounds = popup.node().getBoundingClientRect();
    if (isContained(bounds)) { break; }
  }
};


const updateDropdown = function(dropdown, instance) {
  const currentData = getSvg(instance).datum();
  const { filters } = currentData;
  const { levels, stepNumber } = dropdown.datum();

  const options = [{ name: 'All' }];
  let counter = 0;
  for (const s of levels) {
    const filter = filters.find(f => f.key === s);
    if (filter === undefined) { break; }
    options.push({ name: filter.value, group: filter.key});
    counter++;
  }

  const selectedIndex = counter;

  if (counter <= levels.length - 1) {
    const drillOptions = currentData.sankeyNodes
      .filter(d => d.stepNumber === stepNumber)
      .sort((a, b) => ascending(a.y0, b.y0));

    options.push(...drillOptions);
  }

  dropdown
    .text('')
    .attr('data-selected-index', selectedIndex)
    .selectAll('option')
    .data(options)
    .enter()
    .append('option')
    .attr('value', (_, i) => i)
    .attr('selected', (_, i) => i === selectedIndex ? 'selected' : null)
    .text(function(d, i) {
      let prefix = '';
      const diff = i - counter;
      prefix = diff <= 0 ? '↑'.repeat(Math.abs(diff)) : '↓';
      if (i) {
        prefix += ` ${d.group} =`;
      }
      return `${prefix} ${d.name}`;
    })
    .filter((_, i) => i === 'selected');
};


const addSankeyCoordinates = function({sankeyNodes, sankeyLinks}, {width, height}) {
  sankey()
    .nodeId(d => d.id)
    .nodes(sankeyNodes)
    .links(sankeyLinks)
    .extent([[padding, padding], [width - padding, height - bottomPadding]])
    ();
};


const drawSankey = function(sankeyData) {
  const instance = this;
  const { sankeyNodes, sankeyLinks, steps } = sankeyData;
  const container = select(instance.viz);
  const width = baseWidth;
  const height = width / instance.aspect();
  const shadow = select(container.node().shadowRoot);

  addSankeyCoordinates(sankeyData, {width, height});

  shadow.html(vizTemplate);

  const svg = shadow.select('#graphic')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .datum(sankeyData);

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
    .attr('id', 'text-layer')
    .style('pointer-events', 'none');

  const labelLayer = svg.append('g')
    .attr('id', 'label-layer')
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
    const currentData = svg.datum();
    const hoverData = processData(currentData.data, currentData.currentStepNames, filter);
    drawHoverLayer.call(instance, select(this), hoverData, currentData.lookup);
    showPopup.call(instance, select(this), sankeyData.data.length);
  };

  const mouseout = function() {
    hoverLayer.text('');
    linkGroup.interrupt().transition().duration(animationDuration).style('opacity', 1);
    hidePopup.call(instance);
  };

  const mousemove = function(evt) {
    const bbox = instance.viz.getBoundingClientRect();
    const coords = { x: evt.clientX - bbox.left, y: evt.clientY - bbox.top };
    positionPopup.call(instance, select(this), coords);
  };

  const click = function(evt, d) {
    const drillFunc = evt.shiftKey ? drillUp : drillDown;
    const drilled =  drillFunc(evt.shiftKey ? d.stepNumber : d);
    if (!drilled) { return; }
    select(this).dispatch('mouseout');
    const x = evt.clientX;
    const y = evt.clientY;
    const newSelection = select(shadow.node().elementFromPoint(x, y));
    if (!newSelection.classed('node')) { return; }
    newSelection.dispatch('mouseover').dispatch('mousemove');
  };

  const drillDown = function(nodeData) {
    const { group, name, stepNumber } = nodeData;
    const filters = svg.datum().filters.slice();
    filters.push({ key: group, value: name, stepNumber });
    return drill(filters, stepNumber);
  };

  const drillUp = function(stepNumber, nSteps = 1) {
    const filters = svg.datum().filters.slice();
    for (let i = 0; i < nSteps; i++) {
      const index = filters.findLastIndex(d => d.stepNumber === stepNumber);
      if (index !== -1) { filters.splice(index, 1); }
      else { break; }
    }
    return drill(filters, stepNumber);
  };

  const drill = function(filters, stepNumber) {
    const currentFilters = svg.datum().filters;
    if (filters.length === currentFilters.length) { return; }

    const newData = processData(sankeyData.data, sankeyData.steps, filters);
    svg.datum(newData);

    const nSteps = newData.steps.length;
  
    addSankeyCoordinates(newData, {width, height});
  
    // Links
    const linkUpdate = svg.select('#base-link-group')
      .selectAll('path')
      .data(newData.sankeyLinks, d => d.id);
  
    linkUpdate.enter()
      .append('path')
      .call(drawLink)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('mousemove', mousemove);
  
    linkUpdate
      .call(drawLink);
  
    linkUpdate.exit().remove();
  
    // Nodes
    const nodeUpdate = svg.select('#base-node-group')
      .selectAll('rect')
      .data(newData.sankeyNodes, d => d.id);
  
    nodeUpdate.enter()
      .append('rect')
      .call(drawNode)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('mousemove', mousemove)
      .on('click', click);
  
    nodeUpdate
      .call(drawNode);
  
    nodeUpdate.exit().remove();
  
    // Text
    const textUpdate = svg.select('#text-layer')
      .selectAll('text')
      .data(newData.sankeyNodes, d => d.id);
  
    textUpdate.enter()
      .append('text')
      .call(drawText, nSteps);
  
    textUpdate
      .call(drawText, nSteps);
  
    textUpdate.exit().remove();

    // Step labels
    svg.select('#label-layer')
      .selectAll('text')
      .data(newData.currentStepNames)
      .text(d => d);
    
    // Dropdown labels
    dropdowns.selectAll('select')
      .filter(d => d.stepNumber === stepNumber)
      .call(updateDropdown, instance);

    return true;
  };

  linkGroup.selectAll('path')
    .data(sankeyLinks, d => d.id)
    .enter()
    .append('path')
    .call(drawLink)
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('mousemove', mousemove);

  nodeGroup.selectAll('rect')
    .data(sankeyNodes, d => d.id)
    .enter()
    .append('rect')
    .call(drawNode)
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('mousemove', mousemove)
    .on('click', click);

  textLayer.selectAll('text')
    .data(sankeyNodes, d => d.id)
    .enter()
    .append('text')
    .text(d => d.name)
    .call(drawText, steps.length);

  const popup = shadow.select('#popup');

  const popupStyles = create('style')
    .text(popupStyleString);

  const popupContent = create('div')
    .append('div')
    .attr('id', 'popup-content')
    .attr('class', 'popup-content');

  popup.node().attachShadow({mode: 'open'});
  popup.node().shadowRoot.appendChild(popupStyles.node());
  popup.node().shadowRoot.appendChild(popupContent.node());

  const dropdowns = shadow.select('#dropdowns');

  dropdowns
    .selectAll('div')
    .data(steps.map((d, i) => ({levels: d, stepNumber: i})))
    .enter()
    .append('div')
    .each(function({ stepNumber }) {
      const dropdown = select(this).append('select');

      dropdown
        .call(updateDropdown, instance)
        .on('change', function() {
          const oldIndex = parseInt(dropdown.node().dataset.selectedIndex);
          const newIndex = dropdown.property('value');
          if (newIndex > oldIndex) {
            const data = dropdown.selectAll('option').data()[newIndex];
            drillDown(data);
          }
          else { drillUp(stepNumber, oldIndex - newIndex); }
        });
    });

  labelLayer
    .selectAll('text')
    .data(sankeyData.currentStepNames)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', function(_, i) {
      const { x0, x1 } = sankeyNodes.find(d => d.stepNumber === i);
      if (i === 0) { return x0; }
      else if (i === steps.length - 1) { return x1; }
      else { return (x0 + x1) / 2; }
    }) 
    .attr('y', function() {
      const offset = 8;
      return height - (bottomPadding - offset);
    })
    .attr('text-anchor', function(_, i) {
      if (i === 0) { return 'start'; }
      else if (i === steps.length -1) { return 'end'; }
      else { return 'middle'; }
    })
    .attr('dominant-baseline', 'hanging')
    .style('font-weight', 'bold');
};


export { drawSankey };