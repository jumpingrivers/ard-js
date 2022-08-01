/* globals chartMaker */
import { data, steps } from '../../data/datasets.mjs';

const sankey = chartMaker
  .createSankey(data, steps)
  .render();

const sankeyContainer = document.querySelector('#sankey-container');
sankeyContainer.appendChild(sankey.viz);


const sunburst = chartMaker
  .createSunburst(data, steps.flat())
  .render();

const sunburstContainer = document.querySelector('#sunburst-container');
sunburstContainer.appendChild(sunburst.viz);