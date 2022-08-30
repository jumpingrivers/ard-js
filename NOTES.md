# Version Notes

## 1.0.0

Includes:
* Function for creating a Sankey graphic.
* Function for creating a Sunburst graphic.
* Property expressing the current semantic version number.

### Sankey

Components:
* Main graphic.
* Dropdown menus for drilling up and down.
* "Reset" button.

Interactions:
* Mouseover node to highlight flows that go through that node.
* Mouseover link to highlight flows that include the nodes at either end of the link.
* Click nodes to drill down to the next level.
* Shift-click nodes to "drill" up to the previous level.
* Select levels using dropdown menus.
* Click "Reset" button to return to initial view.

Popups:
* Mouseover a node to see details about that node.
* Mouseover a link to see details about that link and the nodes at either end of it.

### Sunburst

Components:
* Main graphic.
* "Reset" button.

Interactions:
* Mouseover ring section to see the path to that ring section highlighted and breadcrumb describing that path.
* Click ring section to zoom in and show only the descendants of that ring section.
* Shift-click inner ring section to zoom back out one step.
* Click "Reset" button to return to initial view.