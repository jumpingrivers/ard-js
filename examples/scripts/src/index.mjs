/* globals utviz */
import { data, steps } from '../../data/datasets.mjs';

const colorOverrides = [
  { group: 'student_type', color: 'teal' },
  { name: 'true', color: 'pink'},
  { group: 'student_type', name: 'transfer', color: '#446688' }
];

const sankey = utviz
  .createSankey(data, steps)
  .colorOverrides(colorOverrides)
  .render();

const sankeyContainer = document.querySelector('#sankey-container');
sankeyContainer.appendChild(sankey.viz);

const sunburst = utviz
  .createSunburst(data, steps.flat())
  .colorOverrides(colorOverrides)
  .render();

const sunburstContainer = document.querySelector('#sunburst-container');
sunburstContainer.appendChild(sunburst.viz);