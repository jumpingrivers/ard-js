import { select } from 'd3-selection';
import 'd3-transition';
import { descending } from 'd3-array';
import { hierarchy, partition } from 'd3-hierarchy';
import { arc } from 'd3-shape';
import { interpolateNumber } from 'd3-interpolate';
import { easeSinInOut as ease } from 'd3-ease';
import { hcl } from 'd3-color';
import { createColourLookup } from '../utils/index.mjs';
import vizTemplate from './viz-templates/index.html';

const baseWidth = 1000;
const animationDuration = 2000;
const hoverBackgroundOpacity = 0.5;


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

  const breadcrumb = shadow.select('#breadcrumb');

  const tempLayer = svg.append('g')
    .attr('id', 'temp-layer');

  const baseLayer = svg.append('g')
    .attr('id', 'base-layer');

  const textLayer = svg.append('g')
    .attr('id', 'text-layer');

  const hoverLayer = svg.append('g')
    .attr('id', 'hover-layer')
    .style('pointer-events', 'none');

  const lookupMap = new Map();
  let pathGenerator;

  const drawBreadcrumb = function(data) {
    if (data === undefined) { data = stack.slice(1); }

    breadcrumb.text('');

    breadcrumb.selectAll('span')
      .data(data)
      .enter()
      .append('span')
      .text(function(d) {
        const suffix = '  ';
        return `${d.name}${suffix}`;
      })
      .style('background-color', d => getColor(d))
      .style('border-left-color', d => getColor(d));
  };

  const getPathToRingSection = function(data) {
    return lookupMap.get(data.data)
      .ancestors()
      .filter(d => d.depth)
      .reverse();
  };

  const summarisePath = function(path) {
    const totalCount = svg.datum().value;
    return path.map(function(d) {
      return {
        group: d.data.group,
        name: d.data.name,
        value: d.value,
        percentage: (d.value / totalCount) * 100,
        color: getColor(d.data)
      };
    });
  };

  const clearHighlighting = function() {
    baseLayer.classed('background', false);
    hoverLayer.text('');
    textLayer.text('');
    drawBreadcrumb();
  };

  const mouseover = function(evt, d) {
    clearHighlighting();
    const data = d.ancestors().filter(d => d.depth);
    
    baseLayer.classed('background', true);

    hoverLayer.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .style('fill', d => getColor(d.data))
      .style('stroke', 'black');

    const totalCount = svg.datum().value;
    const percent = (d.value / totalCount) * 100;

    textLayer
      .append('text')
      .text(`${percent >= 100 ? '100' : percent.toPrecision(2)}%`)
      .style('text-anchor', 'middle')
      .style('font-size', '75px')
      .style('dominant-baseline', 'middle');

    const path = getPathToRingSection(d);
    const breadData = path.map(d => d.data);
    drawBreadcrumb(breadData);

    if (instance.mouseoverHandler()) {
      const handler = instance.mouseoverHandler().bind(instance);
      handler(evt, d, summarisePath(path));
    }
  };

  const mouseout = function(evt, d) {
    clearHighlighting();
    if (instance.mouseoutHandler()) {
      const handler = instance.mouseoutHandler().bind(instance);
      const path = getPathToRingSection(d);
      handler(evt, d, summarisePath(path));
    } 
  };

  let stack = [sunburstData];

  const click = function(evt, d) {
    if (evt.altKey && instance.altClickHandler()) {
      const handler = instance.altClickHandler().bind(instance);
      const path = getPathToRingSection(d);
      handler(evt, d, summarisePath(path));
      return;
    }
    
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

  const groupCounts = sunburstData.groupCounts;

  const constructHierarchy = function() {
    const root = stack[stack.length - 1];

    return hierarchy(root)
      .sum(d => d.value || 0)
      .sort(function(a, b) {
        const aCount = groupCounts[a.data.group].get(a.data.name);
        const bCount = groupCounts[b.data.group].get(b.data.name);
        return  descending(aCount, bCount);
      });
  };
  
  const getColor = createColourLookup(instance.colorOverrides(), function(d) {
    const palette = instance.palette();
    let color =  hcl(palette[d.wedgeIndex % palette.length]);
    // Next three numbers are very much experimental
    const chromaPower = 1/2;
    const luminancePower = 1;
    const luminanceDenominator = 5;
    color.c = color.c / Math.pow(d.depth, chromaPower);
    const lRemaining = 100 - color.l;
    const lExtra = lRemaining * (Math.pow(d.depth-1, luminancePower)/luminanceDenominator);
    color.l = color.l + lExtra;
    return color.toString();
  });

  constructHierarchy()
    .each(function(d, i) {
      if (!i) { return; }
      d.data.wedgeIndex = d.depth === 1 ? i - 1 : d.parent.data.wedgeIndex;
      d.color = getColor(d.data);
      lookupMap.set(d.data, d);
    });

  const drawArcs = function(animateEntrance = true) {
    const part = partition()
      .size([2 * Math.PI, Math.pow(radius, 2)])(constructHierarchy());

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
    textLayer.classed('hidden', true);

    const pathTween = function(from, to) {
      const x0 = interpolateNumber(from.x0, to.x0);
      const x1 = interpolateNumber(from.x1, to.x1);
      const y0 = interpolateNumber(from.y0, to.y0);
      const y1 = interpolateNumber(from.y1, to.y1);
      
      return function(t) {
        const props = { x0: x0(t), x1: x1(t), y0: y0(t), y1: y1(t) };
        return pathGenerator(props);
      };
    };

    const scaleDisappear = function() {
      return function(t) {
        return `scale(${1-t})`;
      };
    };

    const scaleAppear = function() {
      return function(t) {
        return `scale(${t})`;
      };
    };

    if (animateEntrance) { baseLayer.classed('animating', true); }

    paths
      .transition()
      .duration(animationDuration)
      .ease(ease)
      .attrTween('d', d => pathTween(d.data.start, d))
      .on('end', function(d) {
        const { x0, x1, y0, y1 } = d;
        d.data.start = { x0, x1, y0, y1 };
      })
      .end()
      .then(function() {
        baseLayer.classed('animating', false);
        hoverLayer.classed('hidden', false);
        textLayer.classed('hidden', false);
      });

    const pathsEnter = paths.enter()
      .append('path')
      .attr('class', 'sunburst-section')
      .attr('d', pathGenerator)
      .classed('inner-annulus', d => d.depth === 1)
      .classed('outer-annulus', d => !d.height)
      .style('fill', d => getColor(d.data))
      .style('stroke', '#000')
      .style('stroke-width', '0.25px')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('click', click)
      .each(function(d) {
        const { x0, x1, y0, y1 } = d;
        d.data.start = { x0, x1, y0, y1};
      });

    if (animateEntrance) {
      const enterLayer = tempLayer.append('g');

      pathsEnter
        .each(function() { enterLayer.node().appendChild(this); });

      enterLayer
        .style('opacity', 0)
        .transition()
        .duration(animationDuration)
        .ease(ease)
        .style('opacity', 1)
        .styleTween('transform', scaleAppear)
        .remove()
        .end()
        .then(function() {
          pathsEnter
            .each(function() { baseLayer.node().appendChild(this); });
        });
    }

    const exitLayer = tempLayer.append('g')
      .style('pointer-events', 'none');

    paths.exit()
      .each(function() { exitLayer.node().appendChild(this); });

    exitLayer
      .style('opacity', hoverBackgroundOpacity)
      .transition()
      .duration(animationDuration)
      .ease(ease)
      .style('opacity', 0)
      .styleTween('transform', scaleDisappear)
      .remove();

    resetButton.attr('disabled', stack.length > 1 ? null : 'disabled');
    baseLayer.classed('drilled-down', stack.length > 1);
  };

  const resetButton = shadow.select('#reset button')
    .on('click', () => drawSunburst.call(instance, sunburstData));

  drawArcs(false);

  select(document)
    .on('keydown.shift', function(evt) {
      if (evt.key === 'Shift') { baseLayer.classed('shift-pressed', true); }
    })
    .on('keyup.shift', function(evt) {
      if (evt.key === 'Shift') { baseLayer.classed('shift-pressed', false); }
    });

  // Rescale the breadcrumb font as the space for the breadcrumb changes
  new ResizeObserver(() => {
    const breadcrumbWidth = breadcrumb.node().getBoundingClientRect().width;
    breadcrumb.style('font-size', `${30 * (breadcrumbWidth / baseWidth)}px`);
  }).observe(breadcrumb.node());
};


export { drawSunburst };