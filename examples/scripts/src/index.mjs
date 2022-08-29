/* globals utviz */
import { data, steps } from '../../data/datasets.mjs';

const sankey = utviz
  .createSankey(data, steps)
  .render();

const sankeyContainer = document.querySelector('#sankey-container');
sankeyContainer.appendChild(sankey.viz);

const sunburst = utviz
  .createSunburst(data, steps.map(d => d[0]))
  .render();

const sunburstContainer = document.querySelector('#sunburst-container');
sunburstContainer.appendChild(sunburst.viz);