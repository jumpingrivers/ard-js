/* globals chartMaker */
import { data, steps } from '../../data/datasets.mjs';

const sankey = chartMaker
  .createSankey(data, steps)
  .render();

const container = document.querySelector('#sankey-container');
container.appendChild(sankey.viz);