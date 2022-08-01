import { select } from 'd3-selection';
import 'd3-transition';
import vizTemplate from './viz-templates/index.html';

const baseWidth = 1000;
const padding = 10;
const topPadding = 5 * padding;


const drawSunburst = function(sunburstData) {
  const instance = this;
  const container = select(instance.viz);
  
  const width = baseWidth;
  const height = baseWidth;
  const widthWithPadding = width + 2 * padding;
  const heightWithPadding = height + padding + topPadding;
  
  const shadow = select(container.node().shadowRoot);

  shadow.html(vizTemplate);

  shadow.select('#graphic')
    .attr('viewBox', `0 0 ${widthWithPadding} ${heightWithPadding}`)
    .datum(sunburstData);
};


export { drawSunburst };