(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utviz = {}));
})(this, (function (exports) { 'use strict';

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find$1 = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find$1.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$4(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$4(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending$1;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending$1(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames$1(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function create$1(name) {
    return select(creator(name).call(document.documentElement));
  }

  const _addReadOnlyProp = function(obj) {
    return function(name, value) {
      Object.defineProperty(obj, name, {
        get: () => value,
        enumerable: true
      });
    };
  };


  const properlyDefined = function(value) {
    return value !== undefined && value !== null;
  };


  const createColourLookup = function(colorReference, defaultFunc) {
    if (!Array.isArray(colorReference)) {
      throw new Error('colorReference must be an array');
    }
    if (typeof defaultFunc !== 'function') {
      throw new Error('defaultFunc must be a function');
    }

    const lookup = { both: {}, name: {}, group: {} };

    colorReference.forEach(function(obj) {
      const { group, name, color } = obj;
      if (!color) { return; }

      if (name) {
        if (group) {
          if (!obj.both[name]) { obj.both[name]; }
          lookup.both[name][group] = color;
        }
        else { lookup.name[name] = color; }
      }
      else if (group) { lookup.group[group] = color; }
    });

    return function(data) {
      const { group, name } = data;
      if (lookup.both[name] && lookup.both[name][group]) { return lookup.both[name][group]; }
      else if (lookup.name[name]) { return lookup.name[name]; }
      else if (lookup.group[group]) { return lookup.group[group]; }
      else { return defaultFunc(data); }
    };
  };

  const validateData$1 = function(data) {
    if (!Array.isArray(data)) {
      throw new Error('data must be an array');
    }
  };


  const validateSteps$1 = function(steps) {
    if (!Array.isArray(steps)) {
      throw new Error('steps must be an array');
    }

    if (steps.length < 2) {
      throw new Error('steps array must have at least two elements');
    }

    const stepTypesGood = steps.every(function(step) {
      if (typeof step === 'string') { return true; }
      if (Array.isArray(step) && step.every(s => typeof s === 'string')) {
        return true;
      }
      return false;
    });

    if (!stepTypesGood) {
      throw new Error('steps elements must be strings or arrays of strings');
    }

    const flatSteps = steps.flat();
    if ((new Set(flatSteps).size < flatSteps.length)) {
      throw new Error('steps cannot contain a repeated value');
    }
  };

  function ascending(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function descending(a, b) {
    return a == null || b == null ? NaN
      : b < a ? -1
      : b > a ? 1
      : b >= a ? 0
      : NaN;
  }

  class InternMap extends Map {
    constructor(entries, key = keyof) {
      super();
      Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
      if (entries != null) for (const [key, value] of entries) this.set(key, value);
    }
    get(key) {
      return super.get(intern_get(this, key));
    }
    has(key) {
      return super.has(intern_get(this, key));
    }
    set(key, value) {
      return super.set(intern_set(this, key), value);
    }
    delete(key) {
      return super.delete(intern_delete(this, key));
    }
  }

  function intern_get({_intern, _key}, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }

  function intern_set({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) return _intern.get(key);
    _intern.set(key, value);
    return value;
  }

  function intern_delete({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(key);
      _intern.delete(key);
    }
    return value;
  }

  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function identity$1(x) {
    return x;
  }

  function groups(values, ...keys) {
    return nest(values, Array.from, identity$1, keys);
  }

  function flatten(groups, keys) {
    for (let i = 1, n = keys.length; i < n; ++i) {
      groups = groups.flatMap(g => g.pop().map(([key, value]) => [...g, key, value]));
    }
    return groups;
  }

  function flatGroup(values, ...keys) {
    return flatten(groups(values, ...keys), keys);
  }

  function rollup(values, reduce, ...keys) {
    return nest(values, identity$1, reduce, keys);
  }

  function rollups(values, reduce, ...keys) {
    return nest(values, Array.from, reduce, keys);
  }

  function nest(values, map, reduce, keys) {
    return (function regroup(values, i) {
      if (i >= keys.length) return reduce(values);
      const groups = new InternMap();
      const keyof = keys[i++];
      let index = -1;
      for (const value of values) {
        const key = keyof(value, ++index, values);
        const group = groups.get(key);
        if (group) group.push(value);
        else groups.set(key, [value]);
      }
      for (const [key, values] of groups) {
        groups.set(key, regroup(values, i));
      }
      return map(groups);
    })(values, 0);
  }

  const separator = ':---:';


  const constructFilterFunction = function(filters) {
    if (!filters.length) { return () => true; }
    return function(d) {
      return filters.every(({group, name}) => `${d[group]}` === name);
    };
  };


  const createObjectifySankeyNodeFunction = function(group, stepNumber) {
    return function([name, entries]) {
      return {
        name: `${name}`,
        id: `${group}${separator}${name}`,
        entries,
        fixedValue: entries.length,
        group,
        stepNumber
      };
    };
  };


  const createObjectifySankeyLinkFunction = function(sourceGroup, targetGroup) {
    return function([sourceName, targetName, entries]) {
      const source = `${sourceGroup}${separator}${sourceName}`;
      const target = `${targetGroup}${separator}${targetName}`;
      return {
        sourceName: `${sourceName}`,
        targetName: `${targetName}`,
        source,
        target,
        sourceId: source,
        targetId: target,
        id: `${source}${separator}${target}`,
        entries,
        value: entries.length
      };
    };
  };


  const processData$1 = function(inputData, inputSteps, inputFilters = []) {
    const steps = inputSteps.map(function(d) {
      return Array.isArray(d) ? d.slice() : [d];
    });

    const filters = inputFilters.slice();

    const filterFunction = constructFilterFunction(filters);
    const filterGroupSet = new Set(filters.map(d => d.group));

    const data = inputData.filter(filterFunction);

    const currentStepNames = steps.map(function(step) {
      return step.find(k => !filterGroupSet.has(k)) || step[step.length - 1];
    });

    const sankeyNodeGroups = currentStepNames.map(function(stepName, stepNumber) {
      const objectifySankeyNode = createObjectifySankeyNodeFunction(stepName, stepNumber);
      return {
        group: stepName,
        sankeyNodes: flatGroup(data, d => d[stepName]).map(objectifySankeyNode)
      };
    });

    const sankeyNodes = sankeyNodeGroups.map(d => d.sankeyNodes).flat();

    const sankeyStepPairs = [];
    for (let i = 0; i < sankeyNodeGroups.length - 1; i++) {
      sankeyStepPairs.push({source: sankeyNodeGroups[i].group, target: sankeyNodeGroups[i+1].group});
    }

    const sankeyLinks = sankeyStepPairs.map(function({source, target}) {
      const objectifySankeyLink = createObjectifySankeyLinkFunction(source, target);
      return flatGroup(data, d => d[source], d => d[target])
        .map(objectifySankeyLink);
    })
      .flat();

    const lookup = {};

    sankeyNodes.forEach(d => lookup[d.id] = d);
    sankeyLinks.forEach(d => lookup[d.id] = d);

    return({ data, steps, sankeyNodes, sankeyLinks, currentStepNames, filters, lookup });
  };

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
      reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
      reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
      reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
      reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
      reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHex8() {
    return this.rgb().formatHex8();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }

  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }

  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }

  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }

  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));

  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }

  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  const radians = Math.PI / 180;
  const degrees$1 = 180 / Math.PI;

  // https://observablehq.com/@mbostock/lab-and-rgb
  const K = 18,
      Xn = 0.96422,
      Yn = 1,
      Zn = 0.82521,
      t0 = 4 / 29,
      t1 = 6 / 29,
      t2 = 3 * t1 * t1,
      t3 = t1 * t1 * t1;

  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
        g = rgb2lrgb(o.g),
        b = rgb2lrgb(o.b),
        y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) x = z = y; else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }

  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }

  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Lab, lab, extend(Color, {
    brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(
        lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
        lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
        lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
        this.opacity
      );
    }
  }));

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * degrees$1;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }

  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }

  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * radians;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  define(Hcl, hcl, extend(Color, {
    brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb() {
      return hcl2lab(this).rgb();
    }
  }));

  var constant$3 = x => () => x;

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$3(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  var degrees = 180 / Math.PI;

  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var pi$2 = Math.PI;

  function sinInOut(t) {
    return (1 - Math.cos(pi$2 * t)) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  function max$1(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  function min$1(values, valueof) {
    let min;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (min > value || (min === undefined && value >= value))) {
          min = value;
        }
      }
    }
    return min;
  }

  function sum(values, valueof) {
    let sum = 0;
    if (valueof === undefined) {
      for (let value of values) {
        if (value = +value) {
          sum += value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if (value = +valueof(value, ++index, values)) {
          sum += value;
        }
      }
    }
    return sum;
  }

  function justify(node, n) {
    return node.sourceLinks.length ? node.depth : n - 1;
  }

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function ascendingSourceBreadth(a, b) {
    return ascendingBreadth(a.source, b.source) || a.index - b.index;
  }

  function ascendingTargetBreadth(a, b) {
    return ascendingBreadth(a.target, b.target) || a.index - b.index;
  }

  function ascendingBreadth(a, b) {
    return a.y0 - b.y0;
  }

  function value(d) {
    return d.value;
  }

  function defaultId(d) {
    return d.index;
  }

  function defaultNodes(graph) {
    return graph.nodes;
  }

  function defaultLinks(graph) {
    return graph.links;
  }

  function find(nodeById, id) {
    const node = nodeById.get(id);
    if (!node) throw new Error("missing: " + id);
    return node;
  }

  function computeLinkBreadths({nodes}) {
    for (const node of nodes) {
      let y0 = node.y0;
      let y1 = y0;
      for (const link of node.sourceLinks) {
        link.y0 = y0 + link.width / 2;
        y0 += link.width;
      }
      for (const link of node.targetLinks) {
        link.y1 = y1 + link.width / 2;
        y1 += link.width;
      }
    }
  }

  function Sankey() {
    let x0 = 0, y0 = 0, x1 = 1, y1 = 1; // extent
    let dx = 24; // nodeWidth
    let dy = 8, py; // nodePadding
    let id = defaultId;
    let align = justify;
    let sort;
    let linkSort;
    let nodes = defaultNodes;
    let links = defaultLinks;
    let iterations = 6;

    function sankey() {
      const graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
      computeNodeLinks(graph);
      computeNodeValues(graph);
      computeNodeDepths(graph);
      computeNodeHeights(graph);
      computeNodeBreadths(graph);
      computeLinkBreadths(graph);
      return graph;
    }

    sankey.update = function(graph) {
      computeLinkBreadths(graph);
      return graph;
    };

    sankey.nodeId = function(_) {
      return arguments.length ? (id = typeof _ === "function" ? _ : constant$2(_), sankey) : id;
    };

    sankey.nodeAlign = function(_) {
      return arguments.length ? (align = typeof _ === "function" ? _ : constant$2(_), sankey) : align;
    };

    sankey.nodeSort = function(_) {
      return arguments.length ? (sort = _, sankey) : sort;
    };

    sankey.nodeWidth = function(_) {
      return arguments.length ? (dx = +_, sankey) : dx;
    };

    sankey.nodePadding = function(_) {
      return arguments.length ? (dy = py = +_, sankey) : dy;
    };

    sankey.nodes = function(_) {
      return arguments.length ? (nodes = typeof _ === "function" ? _ : constant$2(_), sankey) : nodes;
    };

    sankey.links = function(_) {
      return arguments.length ? (links = typeof _ === "function" ? _ : constant$2(_), sankey) : links;
    };

    sankey.linkSort = function(_) {
      return arguments.length ? (linkSort = _, sankey) : linkSort;
    };

    sankey.size = function(_) {
      return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankey) : [x1 - x0, y1 - y0];
    };

    sankey.extent = function(_) {
      return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankey) : [[x0, y0], [x1, y1]];
    };

    sankey.iterations = function(_) {
      return arguments.length ? (iterations = +_, sankey) : iterations;
    };

    function computeNodeLinks({nodes, links}) {
      for (const [i, node] of nodes.entries()) {
        node.index = i;
        node.sourceLinks = [];
        node.targetLinks = [];
      }
      const nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d]));
      for (const [i, link] of links.entries()) {
        link.index = i;
        let {source, target} = link;
        if (typeof source !== "object") source = link.source = find(nodeById, source);
        if (typeof target !== "object") target = link.target = find(nodeById, target);
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
      }
      if (linkSort != null) {
        for (const {sourceLinks, targetLinks} of nodes) {
          sourceLinks.sort(linkSort);
          targetLinks.sort(linkSort);
        }
      }
    }

    function computeNodeValues({nodes}) {
      for (const node of nodes) {
        node.value = node.fixedValue === undefined
            ? Math.max(sum(node.sourceLinks, value), sum(node.targetLinks, value))
            : node.fixedValue;
      }
    }

    function computeNodeDepths({nodes}) {
      const n = nodes.length;
      let current = new Set(nodes);
      let next = new Set;
      let x = 0;
      while (current.size) {
        for (const node of current) {
          node.depth = x;
          for (const {target} of node.sourceLinks) {
            next.add(target);
          }
        }
        if (++x > n) throw new Error("circular link");
        current = next;
        next = new Set;
      }
    }

    function computeNodeHeights({nodes}) {
      const n = nodes.length;
      let current = new Set(nodes);
      let next = new Set;
      let x = 0;
      while (current.size) {
        for (const node of current) {
          node.height = x;
          for (const {source} of node.targetLinks) {
            next.add(source);
          }
        }
        if (++x > n) throw new Error("circular link");
        current = next;
        next = new Set;
      }
    }

    function computeNodeLayers({nodes}) {
      const x = max$1(nodes, d => d.depth) + 1;
      const kx = (x1 - x0 - dx) / (x - 1);
      const columns = new Array(x);
      for (const node of nodes) {
        const i = Math.max(0, Math.min(x - 1, Math.floor(align.call(null, node, x))));
        node.layer = i;
        node.x0 = x0 + i * kx;
        node.x1 = node.x0 + dx;
        if (columns[i]) columns[i].push(node);
        else columns[i] = [node];
      }
      if (sort) for (const column of columns) {
        column.sort(sort);
      }
      return columns;
    }

    function initializeNodeBreadths(columns) {
      const ky = min$1(columns, c => (y1 - y0 - (c.length - 1) * py) / sum(c, value));
      for (const nodes of columns) {
        let y = y0;
        for (const node of nodes) {
          node.y0 = y;
          node.y1 = y + node.value * ky;
          y = node.y1 + py;
          for (const link of node.sourceLinks) {
            link.width = link.value * ky;
          }
        }
        y = (y1 - y + py) / (nodes.length + 1);
        for (let i = 0; i < nodes.length; ++i) {
          const node = nodes[i];
          node.y0 += y * (i + 1);
          node.y1 += y * (i + 1);
        }
        reorderLinks(nodes);
      }
    }

    function computeNodeBreadths(graph) {
      const columns = computeNodeLayers(graph);
      py = Math.min(dy, (y1 - y0) / (max$1(columns, c => c.length) - 1));
      initializeNodeBreadths(columns);
      for (let i = 0; i < iterations; ++i) {
        const alpha = Math.pow(0.99, i);
        const beta = Math.max(1 - alpha, (i + 1) / iterations);
        relaxRightToLeft(columns, alpha, beta);
        relaxLeftToRight(columns, alpha, beta);
      }
    }

    // Reposition each node based on its incoming (target) links.
    function relaxLeftToRight(columns, alpha, beta) {
      for (let i = 1, n = columns.length; i < n; ++i) {
        const column = columns[i];
        for (const target of column) {
          let y = 0;
          let w = 0;
          for (const {source, value} of target.targetLinks) {
            let v = value * (target.layer - source.layer);
            y += targetTop(source, target) * v;
            w += v;
          }
          if (!(w > 0)) continue;
          let dy = (y / w - target.y0) * alpha;
          target.y0 += dy;
          target.y1 += dy;
          reorderNodeLinks(target);
        }
        if (sort === undefined) column.sort(ascendingBreadth);
        resolveCollisions(column, beta);
      }
    }

    // Reposition each node based on its outgoing (source) links.
    function relaxRightToLeft(columns, alpha, beta) {
      for (let n = columns.length, i = n - 2; i >= 0; --i) {
        const column = columns[i];
        for (const source of column) {
          let y = 0;
          let w = 0;
          for (const {target, value} of source.sourceLinks) {
            let v = value * (target.layer - source.layer);
            y += sourceTop(source, target) * v;
            w += v;
          }
          if (!(w > 0)) continue;
          let dy = (y / w - source.y0) * alpha;
          source.y0 += dy;
          source.y1 += dy;
          reorderNodeLinks(source);
        }
        if (sort === undefined) column.sort(ascendingBreadth);
        resolveCollisions(column, beta);
      }
    }

    function resolveCollisions(nodes, alpha) {
      const i = nodes.length >> 1;
      const subject = nodes[i];
      resolveCollisionsBottomToTop(nodes, subject.y0 - py, i - 1, alpha);
      resolveCollisionsTopToBottom(nodes, subject.y1 + py, i + 1, alpha);
      resolveCollisionsBottomToTop(nodes, y1, nodes.length - 1, alpha);
      resolveCollisionsTopToBottom(nodes, y0, 0, alpha);
    }

    // Push any overlapping nodes down.
    function resolveCollisionsTopToBottom(nodes, y, i, alpha) {
      for (; i < nodes.length; ++i) {
        const node = nodes[i];
        const dy = (y - node.y0) * alpha;
        if (dy > 1e-6) node.y0 += dy, node.y1 += dy;
        y = node.y1 + py;
      }
    }

    // Push any overlapping nodes up.
    function resolveCollisionsBottomToTop(nodes, y, i, alpha) {
      for (; i >= 0; --i) {
        const node = nodes[i];
        const dy = (node.y1 - y) * alpha;
        if (dy > 1e-6) node.y0 -= dy, node.y1 -= dy;
        y = node.y0 - py;
      }
    }

    function reorderNodeLinks({sourceLinks, targetLinks}) {
      if (linkSort === undefined) {
        for (const {source: {sourceLinks}} of targetLinks) {
          sourceLinks.sort(ascendingTargetBreadth);
        }
        for (const {target: {targetLinks}} of sourceLinks) {
          targetLinks.sort(ascendingSourceBreadth);
        }
      }
    }

    function reorderLinks(nodes) {
      if (linkSort === undefined) {
        for (const {sourceLinks, targetLinks} of nodes) {
          sourceLinks.sort(ascendingTargetBreadth);
          targetLinks.sort(ascendingSourceBreadth);
        }
      }
    }

    // Returns the target.y0 that would produce an ideal link from source to target.
    function targetTop(source, target) {
      let y = source.y0 - (source.sourceLinks.length - 1) * py / 2;
      for (const {target: node, width} of source.sourceLinks) {
        if (node === target) break;
        y += width + py;
      }
      for (const {source: node, width} of target.targetLinks) {
        if (node === source) break;
        y -= width;
      }
      return y;
    }

    // Returns the source.y0 that would produce an ideal link from source to target.
    function sourceTop(source, target) {
      let y = target.y0 - (target.targetLinks.length - 1) * py / 2;
      for (const {source: node, width} of target.targetLinks) {
        if (node === source) break;
        y += width + py;
      }
      for (const {target: node, width} of source.sourceLinks) {
        if (node === target) break;
        y -= width;
      }
      return y;
    }

    return sankey;
  }

  var pi$1 = Math.PI,
      tau$1 = 2 * pi$1,
      epsilon$1 = 1e-6,
      tauEpsilon = tau$1 - epsilon$1;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }

  function path() {
    return new Path;
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon$1));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Otherwise, draw an arc!
      else {
        var x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon$1) {
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }

        this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
        this._ += "L" + x0 + "," + y0;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau$1 + tau$1;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon$1) {
        this._ += "A" + r + "," + r + ",0," + (+(da >= pi$1)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
    },
    toString: function() {
      return this._;
    }
  };

  function constant$1(x) {
    return function constant() {
      return x;
    };
  }

  function x(p) {
    return p[0];
  }

  function y(p) {
    return p[1];
  }

  var slice = Array.prototype.slice;

  function linkSource(d) {
    return d.source;
  }

  function linkTarget(d) {
    return d.target;
  }

  function link(curve) {
    var source = linkSource,
        target = linkTarget,
        x$1 = x,
        y$1 = y,
        context = null;

    function link() {
      var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
      if (!context) context = buffer = path();
      curve(context, +x$1.apply(this, (argv[0] = s, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
      if (buffer) return context = null, buffer + "" || null;
    }

    link.source = function(_) {
      return arguments.length ? (source = _, link) : source;
    };

    link.target = function(_) {
      return arguments.length ? (target = _, link) : target;
    };

    link.x = function(_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$1(+_), link) : x$1;
    };

    link.y = function(_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$1(+_), link) : y$1;
    };

    link.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), link) : context;
    };

    return link;
  }

  function curveHorizontal(context, x0, y0, x1, y1) {
    context.moveTo(x0, y0);
    context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
  }

  function linkHorizontal() {
    return link(curveHorizontal);
  }

  function horizontalSource(d) {
    return [d.source.x1, d.y0];
  }

  function horizontalTarget(d) {
    return [d.target.x0, d.y1];
  }

  function sankeyLinkHorizontal() {
    return linkHorizontal()
        .source(horizontalSource)
        .target(horizontalTarget);
  }

  var vizTemplate$1 = "<style>\n  [id=\"wrapper\"] {\n    position: relative;\n    width: 100%;\n    overflow: auto;\n    user-select: none;\n  }\n\n  [id=\"dropdowns\"] {\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n    gap: 5%;\n  }\n\n  [id=\"dropdowns\"] > div {\n    flex: 1 1 100%;\n    border: 1px solid #d8d8d8;\n  }\n\n  [id=\"dropdowns\"] select {\n    width: 100%;\n    min-height: 28px;\n    border: none;\n  }\n\n  [id=\"graphic\"] {\n    display: block;\n    width: 100%;\n  }\n\n  [id=\"popup\"] {\n    position: absolute;\n    pointer-events: none;\n  }\n\n  [id=\"reset\"] {\n    margin-top: 10px;\n  }\n\n  [id=\"reset\"] button {\n    display: block;\n    float: right;\n    cursor: pointer;\n  }\n\n  [id=\"reset\"] button[disabled] {\n    cursor: not-allowed;\n  }\n\n  .hidden {\n    display: none;\n  }\n</style>\n\n<div id=\"wrapper\">\n  <div id=\"dropdowns\"></div>\n  <svg id=\"graphic\"></svg>\n  <div id=\"popup\" class=\"hidden\"></div>\n  <div id=\"reset\"><button disabled=\"disabled\">Reset</button></div>\n</div>\n";

  var nodeTemplateString = "<p>Name: {{name}}</p>\n<p>Count: {{count}}</p>";

  var linkTemplateString = "<p>Source name: {{sourceName}}</p>\n<p>Target name: {{targetName}}</p>\n<p>Count: {{count}}</p>\n<p>{{percentageOfSourceCount}}% of {{sourceName}}'s counts go through this link</p>\n<p>{{percentageOfTargetCount}}% of {{targetName}}'s counts come through this link</p>";

  var popupStyleString = "* {\n  margin: 0px\n}\n\n.popup-content {\n  display: block;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.3);\n  padding: 5px;\n  border: 1px solid rgb(88, 88, 88);\n  backdrop-filter: blur(3px);\n}\n\np {\n  width: max-content;\n  max-width: 40vw;\n}\n";

  /* global Handlebars */ 


  const linkOpacity = 0.25;
  const baseLinkOpacityOnHover = 0.5;
  const baseWidth$1 = 1000;
  const padding = 10;
  const bottomPadding = 3 * padding;
  const animationDuration$1 = 1000;

  const nodeTemplate = Handlebars.compile(nodeTemplateString);
  const linkTemplate = Handlebars.compile(linkTemplateString);

  const getSvg = function(instance) {
    return select(instance.viz.shadowRoot).select('#graphic');
  };


  const drawNode = function(selection, color) {
    selection
      .attr('class', 'node')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('cursor', 'pointer');

    if (color) {
      selection.style('fill', color);
    }
  };


  const drawLink = function(selection, color) {
    selection
      .attr('class', 'link')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke-width', d => d.width)
      .style('stroke-opacity', linkOpacity)
      .style('fill', 'none');

    if (color) {
      selection.style('stroke', color);
    }
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
    const instance = this;
    const { id, sourceId, targetId } = hoveredSelection.datum();
    const { sankeyLinks, sankeyNodes, steps } = hoverData;
    const nSteps = steps.length;
    
    const svg = getSvg(instance);
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
    hoverNodes.call(drawNode, instance.hoverColor());
    hoverLinks.call(drawLink, instance.hoverColor());
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
      .style('left', px(coords.x))
      .style('font-size', `${16 * (svgBounds.width / baseWidth$1)}px`);

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
      const filter = filters.find(f => f.group === s);
      if (filter === undefined) { break; }
      options.push(filter);
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
    Sankey()
      .nodeId(d => d.id)
      .nodes(sankeyNodes)
      .links(sankeyLinks)
      .extent([[padding, padding], [padding + width, padding + height]])
      ();
  };


  const drawSankey = function(sankeyData) {
    const instance = this;
    const { sankeyNodes, sankeyLinks, steps } = sankeyData;
    const container = select(instance.viz);
    const widthWithPadding = baseWidth$1 + 2 * padding;
    const heightWithPadding = widthWithPadding / instance.aspect();
    const width = baseWidth$1;
    const height = heightWithPadding - (padding + bottomPadding);
    const shadow = select(container.node().shadowRoot);

    addSankeyCoordinates(sankeyData, {width, height});

    shadow.html(vizTemplate$1);

    const svg = shadow.select('#graphic')
      .attr('viewBox', `0 0 ${widthWithPadding} ${heightWithPadding}`)
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

    const getColor = createColourLookup(instance.colorOverrides(), () => instance.color());

    const mouseover = function(_, d) {
      // The next call is useful when resizing elements
      // It seems like sometimes resizing leads to mouseover calls without mouseout ones???
      mouseout();
      linkGroup.transition().style('opacity', baseLinkOpacityOnHover);
      const filter = [];
      if (d.sourceId) {
        filter.push(d.source);
        filter.push(d.target);
      }
      else {
        filter.push(d);
      }
      const currentData = svg.datum();
      const hoverData = processData$1(currentData.data, currentData.currentStepNames, filter);
      drawHoverLayer.call(instance, select(this), hoverData, currentData.lookup);
      showPopup.call(instance, select(this), sankeyData.data.length);
    };

    const mouseout = function() {
      hoverLayer.text('');
      linkGroup.interrupt().transition().duration(animationDuration$1).style('opacity', 1);
      hidePopup.call(instance);
    };

    const mousemove = function(evt) {
      const bbox = instance.viz.getBoundingClientRect();
      const coords = { x: evt.clientX - bbox.left, y: evt.clientY - bbox.top };
      positionPopup.call(instance, select(this), coords);
    };

    const click = function(evt, d) {
      if (evt.altKey) {
        if (instance.altClickHandler() !== null) {
          instance.altClickHandler().call(instance, evt, d);
        }
        return;
      }

      const drillFunc = evt.shiftKey ? drillUp : drillDown;
      const drilled =  drillFunc(evt.shiftKey ? d.stepNumber : d);
      if (!drilled) { return; }

      // This retiggering below seems to be needed to redraw the overlay properly
      // when a single node is expanded to fill the whole level
      const x = evt.clientX;
      const y = evt.clientY;
      const newSelection = select(shadow.node().elementFromPoint(x, y));
      if (!newSelection.classed('node')) { return; }
      newSelection.dispatch('mouseover').dispatch('mousemove');
    };

    const drillDown = function(nodeData) {
      const filters = svg.datum().filters.slice();
      const { name, group, stepNumber } = nodeData;
      const filterObject = filters.find(function(d) {
        return d.name === name && d.group === group && d.stepNumber === stepNumber; 
      });
      if (filterObject === undefined) { filters.push(nodeData); }
      return drill(filters, nodeData.stepNumber);
    };

    const drillUp = function(stepNumber, nSteps = 1) {
      const filters = svg.datum().filters.slice();
      for (let i = 0; i < nSteps; i++) {
        const index = filters.findLastIndex(d => d.stepNumber === stepNumber);
        if (index !== -1) { filters.splice(index, 1); }
        else { break; }
      }
      return drill(filters);
    };

    const drill = function(filters) {
      const oldFilters = svg.datum().filters;

      const nOld = oldFilters.length;
      const nNew = filters.length;
      if (nOld === nNew) { return; }

      const newData = processData$1(sankeyData.data, sankeyData.steps, filters);
      svg.datum(newData);

      const nSteps = newData.steps.length;  
      addSankeyCoordinates(newData, {width, height});
    
      // Links
      const linkUpdate = svg.select('#base-link-group')
        .selectAll('path')
        .data(newData.sankeyLinks, d => d.id);

      const linkAnimationDuration = animationDuration$1 / 4;
    
      linkUpdate.enter()
        .append('path')
        .each(function(d) {
          drawLink(select(this), getColor(d.source));
        })
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('mousemove', mousemove)
        .style('stroke-opacity', 0)
        .transition()
        .delay(animationDuration$1)
        .duration(linkAnimationDuration)
        .style('stroke-opacity', linkOpacity);
    
      linkUpdate
        .transition()
        .duration(linkAnimationDuration)
        .style('opacity', 0)
        .on('end', function() {
          select(this)
            .call(drawLink)
            .transition()
            .delay(animationDuration$1 - linkAnimationDuration)
            .duration(animationDuration$1 / 4)
            .style('opacity', 1);
        });
    
      linkUpdate.exit()
        .transition()
        .duration(linkAnimationDuration)
        .style('stroke-opacity', 0)
        .remove();
    
        
      // Hide hover layer while we animate the nodes
      hoverLayer.classed('hidden', true);
      
      // Nodes
      const nodeUpdate = svg.select('#base-node-group')
        .selectAll('rect')
        .data(newData.sankeyNodes, d => d.id);

      let countUsed = 0;
      const isDrillDown = nNew > nOld;
      let target;

      if (isDrillDown) { target = filters[nNew - 1]; }
      else {
        for (const oldFilter of oldFilters) {
          if (!filters.includes(oldFilter)) {
            // The node may have moved since the filter was originally added,
            // we need to find where it is now
            target = newData.lookup[oldFilter.id];
            break;
          }
        }
      }
      const top = target.y0;
      const singleCountHeight = (target.y1 - target.y0) / target.entries.length;

      const getYAttributes = function(data) {
        const count = data.entries.length;
        const y = top + countUsed * singleCountHeight;
        const height = count * singleCountHeight;
        countUsed += count;
        return { y, height };
      };

      const nodeEnter = nodeUpdate.enter()
        .append('rect')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('mousemove', mousemove)
        .on('click', click);

      if (isDrillDown) {
        nodeEnter
          .sort((a, b) => ascending(a.y0, b.y0))
          .call(drawNode, getColor)
          .each(function(d) {
            const { y, height } = getYAttributes(d);
            select(this).attr('y', y).attr('height', height);
          })
          .transition()
          .duration(animationDuration$1)
          .call(drawNode);

        nodeUpdate.exit()
          .remove();
      }
      else {
        nodeEnter
          .transition()
          .delay(animationDuration$1)
          .duration(0)
          .call(drawNode, getColor);

        nodeUpdate.exit()
          .sort((a, b) => ascending(a.y0, b.y0))
          .each(function(d) {
            const { y, height } = getYAttributes(d);

            select(this)
              .transition()
              .duration(animationDuration$1)
              .attr('y', y)
              .attr('height', height)
              .remove();    
          });
      }
    
      nodeUpdate
        .transition()
        .duration(animationDuration$1)
        .call(drawNode)
        .end()
        .then(function() {
          hoverLayer.classed('hidden', false);
        });
    
      // Text
      const textUpdate = svg.select('#text-layer')
        .selectAll('text')
        .data(newData.sankeyNodes, d => d.id);
    
      textUpdate.enter()
        .append('text')
        .transition()
        .delay(animationDuration$1)
        .duration(0)
        .call(drawText, nSteps);
    
      textUpdate
        .transition()
        .duration(animationDuration$1)
        .call(drawText, nSteps);
    
      textUpdate.exit()
        .remove();

      // Step labels
      svg.select('#label-layer')
        .selectAll('text')
        .data(newData.currentStepNames)
        .text(d => d);
      
      // Dropdown labels
      dropdowns.selectAll('select')
        .each(function() {
          select(this).call(updateDropdown, instance);
        });

      resetButton.attr('disabled', filters.length ? null : 'disabled');

      return true;
    };

    linkGroup.selectAll('path')
      .data(sankeyLinks, d => d.id)
      .enter()
      .append('path')
      .each(function(d) {
        drawLink(select(this), getColor(d.source));
      })
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('mousemove', mousemove);

    nodeGroup.selectAll('rect')
      .data(sankeyNodes, d => d.id)
      .enter()
      .append('rect')
      .each(function(d) {
        drawNode(select(this), getColor(d));
      })
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

    const popupStyles = create$1('style')
      .text(popupStyleString);

    const popupContent = create$1('div')
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
        return padding + height + offset;
      })
      .attr('text-anchor', function(_, i) {
        if (i === 0) { return 'start'; }
        else if (i === steps.length -1) { return 'end'; }
        else { return 'middle'; }
      })
      .attr('dominant-baseline', 'hanging')
      .style('font-weight', 'bold');

    const resetButton = shadow.select('#reset button')
      .on('click', () => drawSankey.call(instance, sankeyData) );
  };

  const createSankey = function(initData, initSteps) {
    const instance = {};
    let data, steps;
    let aspect = 1.5;
    let nodePopupTemplate = null;
    let linkPopupTemplate = null;
    let altClickHandler = null;
    let color = '#add8e6';
    let hoverColor = '#ff0000';
    let colorOverrides = [];

    const addReadOnlyProp = _addReadOnlyProp(instance); 

    // The viz container
    const container = create$1('div')
      .style('width', '100%')
      .style('position', 'relative');

    select(container.node().attachShadow({mode: 'open'}));

    addReadOnlyProp('viz', container.node());

    // The dataset
    const getData = () => data;

    const setData = function(d) {
      validateData$1(d);
      data = d;
      return instance;
    };

    if (properlyDefined(initData)) { setData(initData); }

    addReadOnlyProp('data', data => (data === undefined) ? getData() : setData(data));

    // The Sankey steps
    const getSteps = () => steps;

    const setSteps = function(s) {
      validateSteps$1(s);
      steps = s;
      return instance;
    };

    if (properlyDefined(initSteps)) { setSteps(initSteps); }

    addReadOnlyProp('steps', steps => (steps === undefined) ? getSteps() : setSteps(steps));

    // The aspect ratio
    const getAspect = () => aspect;

    const setAspect = function(a) {
      if (!Number.isFinite(a) || a <= 0) {
        throw new Error('aspect must be a number greater than 0');
      }
      aspect = a;
      return instance;
    };

    addReadOnlyProp('aspect', aspect => (aspect === undefined) ? getAspect() : setAspect(aspect));

    // The alt+Click handler function
    const getAltClickHandler = () => altClickHandler;

    const setAltClickHandler = function(f) {
      if (typeof f !== 'function' && f !== null) {
        throw new Error('altClickHandler must be a function or null');
      }
      altClickHandler = f;
      return instance;
    };

    addReadOnlyProp('altClickHandler', function(altClickHandler) {
      if (altClickHandler === undefined) { return getAltClickHandler(); }
      return setAltClickHandler(altClickHandler);
    });

    // The node popup template
    const getNodePopupTemplate = () => nodePopupTemplate;

    const setNodePopupTemplate = function(t) {
      if (t !== null && typeof t !== 'string') {
        throw new Error('nodePopupTemplate must be a string or null');
      }
      nodePopupTemplate = t;
      return instance;
    };

    addReadOnlyProp('nodePopupTemplate', function(nodePopupTemplate) {
      if (nodePopupTemplate === undefined) { return getNodePopupTemplate(); }
      return setNodePopupTemplate(nodePopupTemplate);
    });

    // The link popup template
    const getLinkPopupTemplate = () => linkPopupTemplate;

    const setLinkPopupTemplate = function(t) {
      if (t !== null && typeof t !== 'string') {
        throw new Error('linkPopupTemplate must be a string or null');
      }
      linkPopupTemplate = t;
      return instance;
    };

    addReadOnlyProp('linkPopupTemplate', function(linkPopupTemplate) {
      if (linkPopupTemplate === undefined) { return getLinkPopupTemplate(); }
      return setLinkPopupTemplate(linkPopupTemplate);
    });

    // The default node color
    const getColor = () => color;

    const setColor = function(c) {
      if (typeof c !== 'string') {
        throw new Error('color must be a string');
      }
      color = c;
      return instance;
    };

    addReadOnlyProp('color', function(color) {
      if (color === undefined) { return getColor(); }
      return setColor(color);
    });

    // The node color on hover
    const getHoverColor = () => hoverColor;

    const setHoverColor = function(h) {
      if (typeof h !== 'string') {
        throw new Error('hoverColor must be a string');
      }
      hoverColor = h;
      return instance;
    };

    addReadOnlyProp('hoverColor', function(hoverColor) {
      if (hoverColor === undefined) { return getHoverColor(); }
      return setHoverColor(hoverColor);
    });

    // The color-overrides function
    const getColorOverrides = () => colorOverrides;

    const setColorOverrides = function(a) {
      if (!Array.isArray(a)) {
        throw new Error('colorOverrides must be an array');
      }
      if (!a.every(d => typeof d === 'object')) {
        throw new Error('colorOverrides elements must be objects');
      }
      colorOverrides = a;
      return instance;
    };

    addReadOnlyProp('colorOverrides', function(colorOverrides) {
      if (colorOverrides === undefined) { return getColorOverrides(); }
      return setColorOverrides(colorOverrides);
    });

    // The rendering function
    const render = function() {
      if (!data) {
        console.warn('Could not render anything as no data defined');
      }
      else if (!steps) {
        console.warn('Could not render anything as no steps defined');
      }
      else {
        const sankeyData = processData$1(data, steps);
        drawSankey.call(instance, sankeyData);
      }
      return instance;
    };

    addReadOnlyProp('render', render);

    // Finally return the instance
    return instance;
  };

  function colors(specifier) {
    var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    return colors;
  }

  var schemeTableau10 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

  const validateData = function(data) {
    if (!Array.isArray(data)) {
      throw new Error('data must be an array');
    }
  };


  const validateSteps = function(steps) {
    if (!Array.isArray(steps)) {
      throw new Error('steps must be an array');
    }

    if (steps.length < 1) {
      throw new Error('steps array must have at least one element');
    }

    const stepTypesGood = steps.every(function(step) {
      return typeof step === 'string';
    });

    if (!stepTypesGood) {
      throw new Error('steps elements must be strings');
    }

    if ((new Set(steps).size < steps.length)) {
      throw new Error('steps cannot contain a repeated value');
    }
  };

  const processData = function(inputData, steps) {
    const funcs = steps.map(step => (d => d[step]));
    const rolledData = rollups(inputData, d => d.length, ...funcs);

    let counter = 0;

    const groupCounts = steps.reduce(function(obj, stepName) {
      obj[stepName] = rollup(inputData, d => d.length, d => d[stepName]);
      return obj;
    }, {});

    const objectifyArray = function(arr, depth) {
      const [name, value] = arr;
    
      const obj = { name, depth, id: counter++ };

      if (depth) {
        obj.group = steps[depth - 1];
      }

      if (Array.isArray(value)) {
        obj.children = value.map(v => objectifyArray(v, depth + 1));
      }
      else {
        obj.value = value;
      }

      return obj;
    };

    const root = objectifyArray(['root', rolledData], 0);
    root.groupCounts = groupCounts;

    return root;
  };

  function count(node) {
    var sum = 0,
        children = node.children,
        i = children && children.length;
    if (!i) sum = 1;
    else while (--i >= 0) sum += children[i].value;
    node.value = sum;
  }

  function node_count() {
    return this.eachAfter(count);
  }

  function node_each(callback, that) {
    let index = -1;
    for (const node of this) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_eachBefore(callback, that) {
    var node = this, nodes = [node], children, i, index = -1;
    while (node = nodes.pop()) {
      callback.call(that, node, ++index, this);
      if (children = node.children) {
        for (i = children.length - 1; i >= 0; --i) {
          nodes.push(children[i]);
        }
      }
    }
    return this;
  }

  function node_eachAfter(callback, that) {
    var node = this, nodes = [node], next = [], children, i, n, index = -1;
    while (node = nodes.pop()) {
      next.push(node);
      if (children = node.children) {
        for (i = 0, n = children.length; i < n; ++i) {
          nodes.push(children[i]);
        }
      }
    }
    while (node = next.pop()) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_find(callback, that) {
    let index = -1;
    for (const node of this) {
      if (callback.call(that, node, ++index, this)) {
        return node;
      }
    }
  }

  function node_sum(value) {
    return this.eachAfter(function(node) {
      var sum = +value(node.data) || 0,
          children = node.children,
          i = children && children.length;
      while (--i >= 0) sum += children[i].value;
      node.value = sum;
    });
  }

  function node_sort(compare) {
    return this.eachBefore(function(node) {
      if (node.children) {
        node.children.sort(compare);
      }
    });
  }

  function node_path(end) {
    var start = this,
        ancestor = leastCommonAncestor(start, end),
        nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      nodes.splice(k, 0, end);
      end = end.parent;
    }
    return nodes;
  }

  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
        bNodes = b.ancestors(),
        c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  function node_ancestors() {
    var node = this, nodes = [node];
    while (node = node.parent) {
      nodes.push(node);
    }
    return nodes;
  }

  function node_descendants() {
    return Array.from(this);
  }

  function node_leaves() {
    var leaves = [];
    this.eachBefore(function(node) {
      if (!node.children) {
        leaves.push(node);
      }
    });
    return leaves;
  }

  function node_links() {
    var root = this, links = [];
    root.each(function(node) {
      if (node !== root) { // Don’t include the root’s parent, if any.
        links.push({source: node.parent, target: node});
      }
    });
    return links;
  }

  function* node_iterator() {
    var node = this, current, next = [node], children, i, n;
    do {
      current = next.reverse(), next = [];
      while (node = current.pop()) {
        yield node;
        if (children = node.children) {
          for (i = 0, n = children.length; i < n; ++i) {
            next.push(children[i]);
          }
        }
      }
    } while (next.length);
  }

  function hierarchy(data, children) {
    if (data instanceof Map) {
      data = [undefined, data];
      if (children === undefined) children = mapChildren;
    } else if (children === undefined) {
      children = objectChildren;
    }

    var root = new Node(data),
        node,
        nodes = [root],
        child,
        childs,
        i,
        n;

    while (node = nodes.pop()) {
      if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
        node.children = childs;
        for (i = n - 1; i >= 0; --i) {
          nodes.push(child = childs[i] = new Node(childs[i]));
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }

    return root.eachBefore(computeHeight);
  }

  function node_copy() {
    return hierarchy(this).eachBefore(copyData);
  }

  function objectChildren(d) {
    return d.children;
  }

  function mapChildren(d) {
    return Array.isArray(d) ? d[1] : null;
  }

  function copyData(node) {
    if (node.data.value !== undefined) node.value = node.data.value;
    node.data = node.data.data;
  }

  function computeHeight(node) {
    var height = 0;
    do node.height = height;
    while ((node = node.parent) && (node.height < ++height));
  }

  function Node(data) {
    this.data = data;
    this.depth =
    this.height = 0;
    this.parent = null;
  }

  Node.prototype = hierarchy.prototype = {
    constructor: Node,
    count: node_count,
    each: node_each,
    eachAfter: node_eachAfter,
    eachBefore: node_eachBefore,
    find: node_find,
    sum: node_sum,
    sort: node_sort,
    path: node_path,
    ancestors: node_ancestors,
    descendants: node_descendants,
    leaves: node_leaves,
    links: node_links,
    copy: node_copy,
    [Symbol.iterator]: node_iterator
  };

  function roundNode(node) {
    node.x0 = Math.round(node.x0);
    node.y0 = Math.round(node.y0);
    node.x1 = Math.round(node.x1);
    node.y1 = Math.round(node.y1);
  }

  function treemapDice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
        node,
        i = -1,
        n = nodes.length,
        k = parent.value && (x1 - x0) / parent.value;

    while (++i < n) {
      node = nodes[i], node.y0 = y0, node.y1 = y1;
      node.x0 = x0, node.x1 = x0 += node.value * k;
    }
  }

  function partition() {
    var dx = 1,
        dy = 1,
        padding = 0,
        round = false;

    function partition(root) {
      var n = root.height + 1;
      root.x0 =
      root.y0 = padding;
      root.x1 = dx;
      root.y1 = dy / n;
      root.eachBefore(positionNode(dy, n));
      if (round) root.eachBefore(roundNode);
      return root;
    }

    function positionNode(dy, n) {
      return function(node) {
        if (node.children) {
          treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
        }
        var x0 = node.x0,
            y0 = node.y0,
            x1 = node.x1 - padding,
            y1 = node.y1 - padding;
        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
        node.x0 = x0;
        node.y0 = y0;
        node.x1 = x1;
        node.y1 = y1;
      };
    }

    partition.round = function(x) {
      return arguments.length ? (round = !!x, partition) : round;
    };

    partition.size = function(x) {
      return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
    };

    partition.padding = function(x) {
      return arguments.length ? (padding = +x, partition) : padding;
    };

    return partition;
  }

  function constant(x) {
    return function constant() {
      return x;
    };
  }

  const abs = Math.abs;
  const atan2 = Math.atan2;
  const cos = Math.cos;
  const max = Math.max;
  const min = Math.min;
  const sin = Math.sin;
  const sqrt = Math.sqrt;

  const epsilon = 1e-12;
  const pi = Math.PI;
  const halfPi = pi / 2;
  const tau = 2 * pi;

  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
  }

  function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
  }

  function arcInnerRadius(d) {
    return d.innerRadius;
  }

  function arcOuterRadius(d) {
    return d.outerRadius;
  }

  function arcStartAngle(d) {
    return d.startAngle;
  }

  function arcEndAngle(d) {
    return d.endAngle;
  }

  function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
  }

  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0, y10 = y1 - y0,
        x32 = x3 - x2, y32 = y3 - y2,
        t = y32 * x10 - x32 * y10;
    if (t * t < epsilon) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [x0 + t * x10, y0 + t * y10];
  }

  // Compute perpendicular offset line of length rc.
  // http://mathworld.wolfram.com/Circle-LineIntersection.html
  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1,
        y01 = y0 - y1,
        lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
        ox = lo * y01,
        oy = -lo * x01,
        x11 = x0 + ox,
        y11 = y0 + oy,
        x10 = x1 + ox,
        y10 = y1 + oy,
        x00 = (x11 + x10) / 2,
        y00 = (y11 + y10) / 2,
        dx = x10 - x11,
        dy = y10 - y11,
        d2 = dx * dx + dy * dy,
        r = r1 - rc,
        D = x11 * y10 - x10 * y11,
        d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
        cx0 = (D * dy - dx * d) / d2,
        cy0 = (-D * dx - dy * d) / d2,
        cx1 = (D * dy + dx * d) / d2,
        cy1 = (-D * dx + dy * d) / d2,
        dx0 = cx0 - x00,
        dy0 = cy0 - y00,
        dx1 = cx1 - x00,
        dy1 = cy1 - y00;

    // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

    return {
      cx: cx0,
      cy: cy0,
      x01: -ox,
      y01: -oy,
      x11: cx0 * (r1 / r - 1),
      y11: cy0 * (r1 / r - 1)
    };
  }

  function arc() {
    var innerRadius = arcInnerRadius,
        outerRadius = arcOuterRadius,
        cornerRadius = constant(0),
        padRadius = null,
        startAngle = arcStartAngle,
        endAngle = arcEndAngle,
        padAngle = arcPadAngle,
        context = null;

    function arc() {
      var buffer,
          r,
          r0 = +innerRadius.apply(this, arguments),
          r1 = +outerRadius.apply(this, arguments),
          a0 = startAngle.apply(this, arguments) - halfPi,
          a1 = endAngle.apply(this, arguments) - halfPi,
          da = abs(a1 - a0),
          cw = a1 > a0;

      if (!context) context = buffer = path();

      // Ensure that the outer radius is always larger than the inner radius.
      if (r1 < r0) r = r1, r1 = r0, r0 = r;

      // Is it a point?
      if (!(r1 > epsilon)) context.moveTo(0, 0);

      // Or is it a circle or annulus?
      else if (da > tau - epsilon) {
        context.moveTo(r1 * cos(a0), r1 * sin(a0));
        context.arc(0, 0, r1, a0, a1, !cw);
        if (r0 > epsilon) {
          context.moveTo(r0 * cos(a1), r0 * sin(a1));
          context.arc(0, 0, r0, a1, a0, cw);
        }
      }

      // Or is it a circular or annular sector?
      else {
        var a01 = a0,
            a11 = a1,
            a00 = a0,
            a10 = a1,
            da0 = da,
            da1 = da,
            ap = padAngle.apply(this, arguments) / 2,
            rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
            rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
            rc0 = rc,
            rc1 = rc,
            t0,
            t1;

        // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
        if (rp > epsilon) {
          var p0 = asin(rp / r0 * sin(ap)),
              p1 = asin(rp / r1 * sin(ap));
          if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
          else da0 = 0, a00 = a10 = (a0 + a1) / 2;
          if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
          else da1 = 0, a01 = a11 = (a0 + a1) / 2;
        }

        var x01 = r1 * cos(a01),
            y01 = r1 * sin(a01),
            x10 = r0 * cos(a10),
            y10 = r0 * sin(a10);

        // Apply rounded corners?
        if (rc > epsilon) {
          var x11 = r1 * cos(a11),
              y11 = r1 * sin(a11),
              x00 = r0 * cos(a00),
              y00 = r0 * sin(a00),
              oc;

          // Restrict the corner radius according to the sector angle.
          if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
            var ax = x01 - oc[0],
                ay = y01 - oc[1],
                bx = x11 - oc[0],
                by = y11 - oc[1],
                kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
                lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min(rc, (r0 - lc) / (kc - 1));
            rc1 = min(rc, (r1 - lc) / (kc + 1));
          }
        }

        // Is the sector collapsed to a line?
        if (!(da1 > epsilon)) context.moveTo(x01, y01);

        // Does the sector’s outer ring have rounded corners?
        else if (rc1 > epsilon) {
          t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
          t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

          context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
            context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the outer ring just a circular arc?
        else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

        // Is there no inner ring, and it’s a circular sector?
        // Or perhaps it’s an annular sector collapsed due to padding?
        if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

        // Does the sector’s inner ring (or point) have rounded corners?
        else if (rc0 > epsilon) {
          t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
          t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

          context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
            context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the inner ring just a circular arc?
        else context.arc(0, 0, r0, a10, a00, cw);
      }

      context.closePath();

      if (buffer) return context = null, buffer + "" || null;
    }

    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
      return [cos(a) * r, sin(a) * r];
    };

    arc.innerRadius = function(_) {
      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
    };

    arc.outerRadius = function(_) {
      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
    };

    arc.cornerRadius = function(_) {
      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
    };

    arc.padRadius = function(_) {
      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
    };

    arc.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
    };

    arc.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
    };

    arc.padAngle = function(_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
    };

    arc.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), arc) : context;
    };

    return arc;
  }

  var vizTemplate = "<style>\n  [id=\"wrapper\"] {\n    position: relative;\n    width: 100%;\n    overflow: auto;\n    user-select: none;\n  }\n\n  [id=\"breadcrumb\"] {\n    display: flex;\n    width: 100%;\n    height: 2em;\n    overflow: hidden;\n    font-size: 25px;\n    justify-content: center;\n  }\n\n  [id=\"breadcrumb\"] > span {\n    flex: 0 1 auto;\n    white-space: pre;\n    text-overflow: ellipsis;\n    min-width: 0;\n    overflow: hidden;\n  }\n\n  [id=\"breadcrumb\"] > span:last-child {\n    flex: 0 0 auto;\n  }\n\n  [id=\"breadcrumb\"] > span::before {\n    content: \" ➤  \";\n  }\n\n  [id=\"breadcrumb\"] > span:first-child::before {\n    content: \"\";\n  }\n\n  [id=\"graphic\"] {\n    display: block;\n    width: 75%;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  [id=\"reset\"] {\n    margin-top: 10px;\n  }\n\n  [id=\"reset\"] button {\n    display: block;\n    float: right;\n    cursor: pointer;\n  }\n\n  [id=\"reset\"] button[disabled] {\n    cursor: not-allowed;\n  }\n\n  .sunburst-section {\n    cursor: pointer;\n  }\n\n  .sunburst-section.outer-annulus {\n    cursor: default;\n  }\n\n  .shift-pressed .sunburst-section {\n    cursor: default;\n  }\n\n  .shift-pressed.drilled-down .inner-annulus {\n    cursor: pointer;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  .background {\n    opacity: 0.5;\n  }\n\n  .background.animating {\n    opacity: 1\n  }\n</style>\n\n<div id=\"wrapper\">\n  <div id=\"breadcrumb\"></div>\n  <svg id=\"graphic\"></svg>\n  <div id=\"reset\"><button disabled=\"disabled\">Reset</button></div>\n</div>\n";

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
          const prefix = '';
          const suffix = '';
          return `${prefix}${d.name}${suffix}`;
        });
    };

    const mouseover = function(_, d) {
      mouseout();
      const data = d.ancestors().filter(d => d.depth);
      
      baseLayer.classed('background', true);

      hoverLayer.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .style('fill', d => getColor(d.data))
        .style('stroke', 'black');

      const percent = (d.value / svg.datum().value) * 100;

      textLayer
        .append('text')
        .text(`${percent >= 100 ? '100' : percent.toPrecision(2)}%`)
        .style('text-anchor', 'middle')
        .style('font-size', '75px')
        .style('dominant-baseline', 'middle');

      const breadData = lookupMap.get(d.data)
        .ancestors()
        .filter(d => d.depth)
        .reverse()
        .map(d => d.data);

      drawBreadcrumb(breadData);
    };

    const mouseout = function() {
      baseLayer.classed('background', false);
      hoverLayer.text('');
      textLayer.text('');
      breadcrumb.text('');
      drawBreadcrumb();
    };

    let stack = [sunburstData];

    const click = function(evt, d) {
      if (evt.altKey && instance.altClickHandler() !== null) {
        instance.altClickHandler().call(instance, evt, d);
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
        console.log(stack);
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
      const luminancePower = 1/3;
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
        .ease(sinInOut)
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
          .ease(sinInOut)
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
        .ease(sinInOut)
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
      breadcrumb.style('font-size', `${25 * (breadcrumbWidth / baseWidth)}px`);
    }).observe(breadcrumb.node());
  };

  const createSunburst = function(initData, initSteps) {
    const instance = {};
    let data, steps;
    let altClickHandler = null;
    let colorOverrides = [];
    let palette = schemeTableau10;

    const addReadOnlyProp = _addReadOnlyProp(instance); 

    // The viz container
    const container = create$1('div')
      .style('width', '100%')
      .style('position', 'relative');

    select(container.node().attachShadow({mode: 'open'}));

    addReadOnlyProp('viz', container.node());

    // The dataset
    const getData = () => data;

    const setData = function(d) {
      validateData(d);
      data = d;
      return instance;
    };

    if (properlyDefined(initData)) { setData(initData); }

    addReadOnlyProp('data', data => (data === undefined) ? getData() : setData(data));

    // The Sankey steps
    const getSteps = () => steps;

    const setSteps = function(s) {
      validateSteps(s);
      steps = s;
      return instance;
    };

    if (properlyDefined(initSteps)) { setSteps(initSteps); }

    addReadOnlyProp('steps', steps => (steps === undefined) ? getSteps() : setSteps(steps));

    // The alt+Click handler function
    const getAltClickHandler = () => altClickHandler;

    const setAltClickHandler = function(f) {
      if (typeof f !== 'function' && f !== null) {
        throw new Error('altClickHandler must be a function or null');
      }
      altClickHandler = f;
      return instance;
    };

    addReadOnlyProp('altClickHandler', function(altClickHandler) {
      if (altClickHandler === undefined) { return getAltClickHandler(); }
      return setAltClickHandler(altClickHandler);
    });

    // The palette function
    const getPalette = () => palette;

    const setPalette = function(a) {
      if (!Array.isArray(a)) {
        throw new Error('palette must be an array');
      }
      if (a.length < 2) {
        throw new Error('palette must be an array with at least one element');
      }
      if(!a.every(d => typeof d === 'string')) {
        throw new Error('palette colors must be strings');
      }
      palette = a;
      return instance;
    };

    addReadOnlyProp('palette', function(palette) {
      if (palette === undefined) { return getPalette(); }
      return setPalette(palette);
    });

    // The color-overrides function
    const getColorOverrides = () => colorOverrides;

    const setColorOverrides = function(a) {
      if (!Array.isArray(a)) {
        throw new Error('colorOverrides must be an array');
      }
      if (!a.every(d => typeof d === 'object')) {
        throw new Error('colorOverrides elements must be objects');
      }
      colorOverrides = a;
      return instance;
    };

    addReadOnlyProp('colorOverrides', function(colorOverrides) {
      if (colorOverrides === undefined) { return getColorOverrides(); }
      return setColorOverrides(colorOverrides);
    });

    // The rendering function
    const render = function() {
      if (!data) {
        console.warn('Could not render anything as no data defined');
      }
      else if (!steps) {
        console.warn('Could not render anything as no steps defined');
      }
      else {
        const sunburstData = processData(data, steps);
        drawSunburst.call(instance, sunburstData);
      }
      return instance;
    };

    addReadOnlyProp('render', render);

    // Finally return the instance
    return instance;
  };

  exports.createSankey = createSankey;
  exports.createSunburst = createSunburst;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=utviz.js.map
