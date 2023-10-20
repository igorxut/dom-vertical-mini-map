# DomVerticalMiniMap

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/igorxut/dom-vertical-mini-map/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/dom-vertical-mini-map.svg)](https://www.npmjs.com/package/dom-vertical-mini-map)

## Table of contents

- [Description](#description)
- [Installation](#installation)
  * [NMP](#nmp)
  * [Manual](#manual)
- [Glossary](#glossary)
- [Configuration](#configuration)
  * [styles](#styles)
    + [backgroundColor](#stylesbackgroundcolor)
    + [borderColor](#stylesbordercolor)
    + [position](#stylesposition)
    + [width](#styleswidth)
    + [zIndex](#styleszindex)
  * [scroll](#scroll)
    + [enabled](#scrollenabled)
    + [styles](#scrollstyles)
      - [backgroundColor](#scrollstylesbackgroundcolor)
  * [points](#points)
- [Object of 'points' array](#object-of-points-array)
  * [draw](#draw)
    + [selector](#drawselector)
    + [selectorContains](#drawselectorcontains)
    + [styles](#drawstyles)
      - [backgroundColor](#drawstylesbackgroundcolor)
      - [outlineColor](#drawstylesoutlinecolor)
  * [focus](#focus)
    + [enabled](#focusenabled)
    + [selector](#focusselector)
  * [scroll](#scroll-1)
    + [enabled](#scrollenabled-1)
    + [selector](#scrollselector)
    + [type](#scrolltype)
  * [titleConstructor](#titleconstructor)
- [Object of 'titleConstructor' array](#object-of-titleconstructor-array)
  * [text](#text)
  * [selector](#selector)
  * [attribute](#attribute)
  * [textContent](#textcontent)
- [Getters](#getters)
  * [root](#root)
  * [version](#version)
- [Methods](#methods)
  * [create](#create)
  * [destroy](#destroy)
  * [refresh](#refresh)
- [Usage](#usage)
- [License](#license)

## Description

Component for creating vertical mini-map on html-page for [document.body](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) element.

Component inject in DOM of page and has `position: fixed`.

## Installation

### NMP

```shell
npm install dom-vertical-mini-map
```

### Manual

<a href="../master/dist" target="_blank">Download files</a> from repository and use on page:

```html
<link rel="stylesheet" href="dom-vertical-mini-map.css">
<script src="dom-vertical-mini-map.js"></script>
```

## Glossary

MapElement - root HTMLElement of DomVerticalMiniMap.

ScrollMapElement - HTMLElement represented Window on MapElement.

MapPointElement - HTMLElement represented founded HTMLElement on MapElement.

![Schema](https://github.com/igorxut/dom-vertical-mini-map/blob/master/static/schema.jpg?raw=true)

## Configuration

### styles

_Styles of MapElement._

Type: Object  
Required: false

#### styles.backgroundColor

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of MapElement._

Type: String  
Default: `rgba(248, 249, 250, 1)`

#### styles.borderColor

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) of MapElement._

Type: String  
Default: `rgba(108, 117, 125, 1)`

#### styles.position

_Position of MapElement on page._

Type: String  
Values: `left`, `right`  
Default: `right`

#### styles.width

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/width) of MapElement._

Type: String  
Default: `1rem`

#### styles.zIndex

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) of MapElement._

Type: Number  
Default: `1000`

### scroll

_Options of ScrollMapElement._

Type: Object  
Required: false

#### scroll.enabled

_Enables ScrollMapElement._

Type: Boolean  
Default: `true`

#### scroll.styles

_Styles of ScrollMapElement._

Type: Object  
Required: false

##### scroll.styles.backgroundColor

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of ScrollMapElement. Use 'alpha' for opacity._

Type: String  
Default: `rgba(108, 117, 125, 0.3)`

### points

_Array of objects. Every object configure one MapPointElement._

Type: Array  
Required: true

## Object of points array

### draw

_Configure drawing of MapPointElement._

Type: Object  
Required: True

#### draw.selector

_CSS selector for searching HTMLElements on page by [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)._

Type: String  
Required: true

#### draw.selectorContains

_CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement in element.  
Filter elements founded by `draw.selector` if specified._

Type: String  
Required: false

#### draw.styles

_Styles of MapPointElement._

Type: Object  
Required: false

##### draw.styles.backgroundColor

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of MapPointElement._

Type: String  
Default: `rgba(220, 53, 69, 1)`

##### draw.styles.outlineColor

_Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color) on hover of MapPointElement._

Type: String  
Default: value of `styles.borderColor` of MapElement

### focus

_Configure focus for MapPointElement._

Type: Object  
Required: false

#### focus.enabled

_Enables [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) element on MapPointElement click._

Type: Boolean  
Default: false

#### focus.selector

_CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for focus) in element founded by `draw.selector`._

Type: String  
Default: element founded by `draw.selector`

### scroll

_Configure scroll for MapPointElement._

Type: Object  
Required: false

#### scroll.enabled

_Enables scroll on MapPointElement click._

Type: Boolean  
Default: true

#### scroll.selector

_CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for scroll) in element founded by `draw.selector`._

Type: String  
Default: element founded by `draw.selector`

#### scroll.type

_Scrolls the Window to element (top/bottom/middle of Window) in the Document._

Type: String  
Values: `top`, `bottom`, `middle`  
Default: `top`

### titleConstructor

_Array of objects. Every object concat text for `title` attribute of MapPointElement. Text separates by `\n`.  
Priorities for concat of one object: `text`, `textContent`, `attribute`._

Type: Array  
Required: false

## Object of titleConstructor array

### text

_Custom text._

Type: String  
Required: false

### selector

_CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement for analyze._

Type: String  
Required: false

### attribute

_Take value from `attribute` of element founded by `selector`._

Type: String  
Required: false

### textContent

_Take string from `textContent` of element founded by `selector`._

Type: String  
Required: false

## Getters

### root

Return MapElement.

### version

Return version of DomVerticalMiniMap.

## Methods

### create

Create and inject DomVerticalMiniMap component in DOM.

### destroy

Reset DomVerticalMiniMap component and remove it from DOM.

### refresh

Reinitialize MapPointElements and refresh styles of ScrollMapElement and MapPointElements.

## Usage

See [examples](https://igorxut.github.io/dom-vertical-mini-map/).

## License

<p><a href="http://opensource.org/licenses/MIT" target="_blank">MIT</a></p>
