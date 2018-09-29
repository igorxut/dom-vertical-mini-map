<h1>DomVerticalMiniMap</h1>

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/igorxut/dom-vertical-mini-map/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/dom-vertical-mini-map.svg)](https://www.npmjs.com/package/dom-vertical-mini-map)

<h2>Description</h2>

Component for creating vertical mini-map on html-page for [document.body](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) element.

Component inject in DOM of page and has `position: fixed`.

<h2>Installation</h2>

<h3>NMP</h3>

```shell
npm install dom-vertical-mini-map
```

<h3>Manual</h3>

<p><a href="https://github.com/igorxut/dom-vertical-mini-map/blob/master/dist" target="_blank">Download files</a> from repository and use on page:

```html
<link rel="stylesheet" href="dom-vertical-mini-map.css">
<script src="dom-vertical-mini-map.js"></script>
```
</p>

<h2>Glossary</h2>

MapElement - root HTMLElement of DomVerticalMiniMap.

ScrollMapElement - HTMLElement represented Window on MapElement.

MapPointElement - HTMLElement represented founded HTMLElement on MapElement.

![Schema](/static/schema.jpg)

<h2>Configuration</h2>

<h3>styles</h4>

<i>Styles of MapElement.</i>

Type: Object  
Required: false

<h4>styles.backgroundColor</h4>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of MapElement.</i>

Type: String  
Default: `rgba(248, 249, 250, 1)`

<h4>styles.borderColor</h4>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) of MapElement.</i>

Type: String  
Default: `rgba(108, 117, 125, 1)`

<h4>styles.position</h4>

<i>Position of MapElement on page.</i>

Type: String  
Values: `left`, `right`  
Default: `right`

<h4>styles.width</h4>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/width) of MapElement.</i>

Type: String  
Default: `1rem`

<h4>styles.zIndex</h4>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) of MapElement.</i>

Type: Number  
Default: `1000`

<h3>scroll</h3>

<i>Options of ScrollMapElement.</i>

Type: Object  
Required: false

<h4>scroll.enabled</h4>

<i>Enables ScrollMapElement.</i>

Type: Boolean  
Default: `true`

<h4>scroll.styles</h4>

<i>Styles of ScrollMapElement.</i>

Type: Object
Required: false

<h5>scroll.styles.backgroundColor</h5>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of ScrollMapElement. Use 'alpha' for opacity.</i>

Type: String  
Default: `rgba(108, 117, 125, 0.3)`

<h3>points</h3>

<i>Array of objects. Every object configure one MapPointElement.</i>

Type: Array
Required: true

<h2>Object of [points](https://github.com/igorxut/dom-vertical-mini-map#points) array</h2>

<h3>draw</h3>

<i>Configure drawing of MapPointElement.</i>

Type: Object  
Required: True

<h4>draw.selector</h4>

<i>CSS selector for searching HTMLElements on page by [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).</i>

Type: String  
Required: true

<h4>draw.selectorContains</h4>

<i>CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement in element.  
Filter elements founded by `draw.selector` if specified.</i>

Type: String  
Required: false

<h4>draw.styles</h4>

<i>Styles of MapPointElement.</i>

Type: Object  
Required: false

<h5>draw.styles.backgroundColor</h5>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of MapPointElement.</i>

Type: String  
Default: `rgba(220, 53, 69, 1)`

<h5>draw.styles.outlineColor</h5>

<i>Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color) on hover of MapPointElement.</i>

Type: String  
Default: value of `styles.borderColor` of MapElement

<h3>focus</h3>

<i>Configure focus for MapPointElement.</i>

Type: Object  
Required: false

<h4>focus.enabled</h4>

<i>Enables [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) element on MapPointElement click.</i>

Type: Boolean  
Default: false

<h4>focus.selector</h4>

<i>CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for focus) in element founded by `draw.selector`.</i>

Type: String  
Default: element founded by `draw.selector`

<h3>scroll</h3>

<i>Configure scroll for MapPointElement.</i>

Type: Object  
Required: false

<h4>scroll.enabled</h4>

<i>Enables scroll on MapPointElement click.</i>

Type: Boolean  
Default: true

<h4>scroll.selector</h4>

<i>CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for scroll) in element founded by `draw.selector`.</i>

Type: String  
Default: element founded by `draw.selector`

<h4>scroll.type</h4>

<i>Scrolls the Window to element (top/bottom/middle of Window) in the Document.</i>

Type: String  
Values: `top`, `bottom`, `middle`  
Default: `top`

<h3>titleConstructor</h3>

<i>Array of objects. Every object concat text for `title` attribute of MapPointElement. Text separates by `\n`.  
Priorities for concat of one object: `text`, `textContent`, `attribute`.</i>

Type: Array  
Required: false

<h2>Object of [titleConstructor](https://github.com/igorxut/dom-vertical-mini-map#titleconstructor) array</h2>

<h3>text</h3>

<i>Custom text.</i>

Type: String  
Required: false

<h3>selector</h3>

<i>CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement for analyze.</i>

Type: String  
Required: false

<h3>attribute</h3>

<i>Take value from `attribute` of element founded by `selector`.</i>

Type: String  
Required: false

<h3>textContent</h3>

<i>Take string from `textContent` of element founded by `selector`.</i>

Type: String  
Required: false

<h2>Getters</h2>

<h3>root</h3>

Return MapElement.

<h3>version</h3>

Return version of DomVerticalMiniMap.

<h2>Methods</h2>

<h3>create</h3>

Create and inject DomVerticalMiniMap component in DOM.

<h3>destroy</h3>

Reset DomVerticalMiniMap component and remove it from DOM.

<h3>refresh</h3>

Reinitialize MapPointElements and refresh styles of #scrollElement and MapPointElements.

<h2>Usage</h2>

See <a href="https://github.com/igorxut/dom-vertical-mini-map/blob/master/examples">examples</a>.

Live examples:

 * [example1](https://jsfiddle.net/igorxut/utnfmkvj/)

<h2>License</h2>

<p><a href="http://opensource.org/licenses/MIT" target="_blank">MIT</a></p>
