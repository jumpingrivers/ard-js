# utviz.js

## Developing this repo

1. Clone the repo.
2. Run `npm ci` to install all the requisite node modules. You'll probably want to do this everytime you pull in changes.
3. Run `npm run prepare`. This is required for the pre-commit tests to work, but you should only have to do this once.

After the above you can:
* Build the scripts using `npm run build`.
* Build scripts and view examples on local server using `npm run start`.
* Run linting using `npm run lint` (or `npm run lint:fix`).
* Run tests using `npm run test`.

## Including utviz.js in a page

utviz.js depends on [Handlebars](https://handlebarsjs.com/) (tested on version 4.7.x) which must be included before utviz.js.

For development you'll probably want to include unminified versions of both:

``` html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.js"></script>
  <script src="scripts/utviz.js"></script>
```

For production use the minfied versions to reduce the bundle size:

``` html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
  <script src="scripts/utviz.min.js"></script>
```

Both options add a `utviz` object (and a `Handlebars` object) to the `window` object.

## `utviz.createSankey([data, [steps]])`

Creates and returns a new `sankey` object instance. The `data` and `steps` arguments are optional here but must be supplied at some point before `.render()` can actually render anything. See the `.data()` and `.steps()` methods below for more details.

All methods except `.render()` act as both getters and setters. That means that if they are called without an argument then the current stored value associated with the method is returned. If they are called with an argument then that argument is assigned as the stored value for that method and the instance is returned to allow for method chaining.


### sankey.viz

The instance's only read-only property, holding the actualy Sankey visualisation, including dropdowns and reset button. Append it to a container element and it will fill it:

``` js
document.querySelector('#my-sankey-container')
  .appendChild(sankey.viz);
```

### sankey.altClickHandler([value])

If supplied, `value` must be a function or `null`. If it is a function the function will be called whenever the user alt-clicks a node in the Sankey diagram and is passed the click event and the node's data as arguments while the `this` variable will correspond to the Sankey instance. If `value` is null then any previously-set alt-click handler will be removed.

### sankey.aspect([value])

If supplied, `value` should be a finite number greater than 0. This value sets the aspect ratio (width / height) of the Sankey (not including the dropdown menus and the reset button).

### sankey.color([value])

If supplied, `value` should be a string representing a color. This color is used to color all nodes that don't have an associated color override. Links emanating from these nodes will also be a translucent version of this color.

### sankey.colorOverrides([value])

If supplied, `value` should be an array of objects. Each object specifies some form of color override. To have any effect it must have a "color" property and at least one of a "name" property and a "group" property. The "name" property corresponds to the name or label of a node while the group property corresponds to the name associated with the column in the Sankey. This means the groups are derived from the keys in the supplied `data` while the names are the values associated with these keys. An override assigned to a node through a "name" property trumps an override assigned through a "group" property. An override assigned through a "name" and a "group" property in the same object will trump both of these.

### sankey.data([value])

If supplied, `value` must be an array of objects. Each object should represent a single entry, e.g. a single student. These data values, alongside the `steps` are then used to construct the Sankey chart.

### sankey.hoverColor([value])

If supplied, `value` should be a string representing a color. This color is used to highlight a node on hover. It is also used, in a translucent form, to highlight a link on hover.

### sankey.linkPopupTemplate([value])

If supplied, `value` should be a string representing a [Handlebars HTML template](https://handlebarsjs.com/guide/#simple-expressions) that will be used to construct a popup when hovering over a link. Alongside regular HTML constructs, the template can reference the following properties:
* {{sourceName}} the name of the source node of the link.
* {{targetName}} the name of the target node of the link.
* {{count}} the count of the link.
* {{totalCount}} the total count for the whole Sankey diagram.
* {{percentageOfSourceCount}} the (rounded) percentage value of all counts from the source node that go through this link.
* {{percentageOfTargetCount}} the (rounded) percentage value of all counts to the target node that go through this link.

### sankey.nodePopupTemplate([value])

If supplied, `value` should be a string representing a [Handlebars HTML template](https://handlebarsjs.com/guide/#simple-expressions) that will be used to construct a popup when hovering over a node. Alongside regular HTML constructs, the template can reference the following properties:
* {{name}} the name of the node.
* {{count}} the count of the node.
* {{totalCount}} the total count for the whole Sankey diagram.

### sankey.render()

Updates the viz based on the latest set of stored properties and returns the Sankey instance. The `data` and `steps` must have been defined prior to this method call for anything interesting to happen.

### sankey.steps([value])

If supplied, `steps` should be an array. The elements of the array can be either strings or arrays of strings. Each outer element of the `steps` array represents a vertical column of nodes, going from left to right. The strings should match keys in the `data`. If a given step is an array, then each element represents a drill-down stage for that column in the Sankey diagram, starting from the first element. For example, an array of `[["a", "b"], "c", "d"]` will create a Sankey with three steps or columns which initially shows data corresponding to the properties for the keys "a", "c", and "d" in the `data`. Clicking on any node in the first column will drill-down to show the data for the "b" key, filtered on a particular value for the "a" property.

## `utviz.createSunburst([data, [steps]])`

Creates and returns a new `sunburst` object instance. The `data` and `steps` arguments are optional here but must be supplied at some point before `.render()` can actually render anything. See the `.data()` and `.steps()` methods below for more details.

All methods except `.render()` act as both getters and setters. That means that if they are called without an argument then the current stored value associated with the method is returned. If they are called with an argument then that argument is assigned as the stored value for that method and the instance is returned to allow for method chaining.


### sunburst.viz

The instance's only read-only property, holding the actualy sunburst visualisation, including reset button. Append it to a container element and it will fill it:

``` js
document.querySelector('#my-sunburst-container')
  .appendChild(sunburst.viz);
```

### sunburst.altClickHandler([value])

If supplied, `value` must be a function or `null`. If it is a function the function will be called whenever the user alt-clicks a node in the sunburst diagram and is passed the click event and the ring-section's data as arguments while the `this` variable will correspond to the sunburst instance. If `value` is null then any previously-set alt-click handler will be removed.

### sunburst.colorOverrides([value])

If supplied, `value` should be an array of objects. Each object specifies some form of color override. To have any effect it must have a "color" property and at least one of a "name" property and a "group" property. The "name" property corresponds to the name or label for ring sections while the group property corresponds to the name associated with a whole ring. This means the groups are derived from the keys in the supplied `data` while the names are the values associated with these keys. An override assigned to a ring-section through a "name" property trumps an override assigned through a "group" property. An override assigned through a "name" and a "group" property in the same object will trump both of these.

### sunburst.data([value])

If supplied, `value` must be an array of objects. Each object should represent a single entry, e.g. a single student. These data values, alongside the `steps` are then used to construct the sunburst chart.

### sunburst.palette([value])

If supplied, `value` should be an array of strings where each string represents a color. These colors are used to color all the sections of the inner ring in order from largest to smallest. The colors of other ring-sections are then derived from the corresponding innermost ring color. Color-overrides are applied _after_ this assignment process.

### sunburst.render()

Updates the viz based on the latest set of stored properties and returns the sunburst instance. The `data` and `steps` must have been defined prior to this method call for anything interesting to happen.

### sunburst.steps([value])

If supplied, `steps` should be an array. The elements of the array should be strings. Each element of the `steps` array represents a ring, going from inside to outside. The strings should match keys in the `data`.
