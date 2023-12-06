# DomVerticalMiniMap

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/igorxut/dom-vertical-mini-map/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/dom-vertical-mini-map.svg)](https://www.npmjs.com/package/dom-vertical-mini-map)

## Table of contents

- [Description](#description)
- [Installation](#installation)
  - [NMP](#nmp)
  - [Manual](#manual)
- [Glossary](#glossary)
- [Configuration](#configuration)
  - [styles](#styles)
  - [scroll](#scroll)
    - [styles](#scrollStyles)
  - [points](#points)
    - [draw](#pointsDraw)
      - [styles](#pointsDrawStyles)
    - [focus](#pointsFocus)
    - [scroll](#pointsScroll)
    - [titleConstructor](#pointsTitleConstructor)
- [Getters](#getters)
- [Methods](#methods)
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

[Download](master/dist) files from repository and use on page:

```html
<link rel="stylesheet" href="dom-vertical-mini-map.css" />
<script src="dom-vertical-mini-map.js"></script>
```

## Glossary

| Name             | Description                                                |
|------------------|------------------------------------------------------------|
| MapElement       | root HTMLElement of DomVerticalMiniMap                     |
| ScrollMapElement | HTMLElement represented Window on MapElement.              |
| MapPointElement  | HTMLElement represented founded HTMLElement on MapElement. |

![Schema](static/schema.jpg?raw=true)

## Configuration

| Name              | Type   | Required | Description                                                                |
|-------------------|--------|----------|----------------------------------------------------------------------------|
| [styles](#styles) | Object | false    | Styles of [MapElement](#glossary).                                         |
| [scroll](#scroll) | Object | false    | Options of [ScrollMapElement](#glossary).                                  |
| [points](#points) | Array  | true     | Array of objects. Every object configure one [MapPointElement](#glossary). |

### styles

| Name            | Type   | Required | Values          | Default                  | Description                                                                                                                             |
|-----------------|--------|----------|-----------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| backgroundColor | String | false    |                 | `rgba(248, 249, 250, 1)` | Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of [MapElement](#glossary). |
| borderColor     | String | false    |                 | `rgba(108, 117, 125, 1)` | Value of CSS property [border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) of [MapElement](#glossary).         |
| position        | String | false    | `left`, `right` | `right`                  | Position of [MapElement](#glossary) on page.                                                                                            |
| width           | String | false    |                 | `1rem`                   | Value of CSS property [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) of [MapElement](#glossary).                       |
| zIndex          | Number | false    |                 | 1000                     | Value of CSS property [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) of [MapElement](#glossary).                   |

### scroll

| Name                    | Type    | Required | Default | Description                              |
|-------------------------|---------|----------|---------|------------------------------------------|
| enabled                 | Boolean | false    | true    | Enables [ScrollMapElement](#glossary).   |
| [styles](#scrollStyles) | Object  | false    |         | Styles of [ScrollMapElement](#glossary). |

#### scroll.styles

| Name            | Type   | Required | Default                    | Description                                                                                                                                                            |
|-----------------|--------|----------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backgroundColor | String | false    | `rgba(108, 117, 125, 0.3)` | Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of [ScrollMapElement](#glossary). Use `alpha` for opacity. |

### points

| Name                                        | Type   | Required | Description                                                                                                                                                                                        |
|---------------------------------------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [draw](#pointsDraw)                         | Object | true     | Configure drawing of [MapPointElement](#glossary).                                                                                                                                                 |
| [focus](#pointsFocus)                       | Object | false    | Configure focus for [MapPointElement](#glossary).                                                                                                                                                  |
| [scroll](#pointsScroll)                     | Object | false    | Configure scroll for [MapPointElement](#glossary).                                                                                                                                                 |
| [titleConstructor](#pointsTitleConstructor) | Array  | false    | Array of objects. Every object concat text for `title` attribute of [MapPointElement](#glossary). Text separates by `\n`. Priorities for concat of one object: `text`, `textContent`, `attribute`. |

#### points.draw

| Name                        | Type   | Required | Description                                                                                                                                                                                                            |
|-----------------------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector                    | String | true     | CSS selector for searching HTMLElements on page by [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).                                                          |
| selectorContains            | String | false    | CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement in element. Filter elements founded by [draw](#pointsDraw).selector if specified. |
| [styles](#pointsDrawStyles) | Object | false    | Styles of [MapPointElement](#glossary).                                                                                                                                                                                |

##### points.draw.styles

| Name            | Type   | Required | Default                                | Description                                                                                                                                     |
|-----------------|--------|----------|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| backgroundColor | String | false    | `rgba(220, 53, 69, 1)`                 | Value of CSS property [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) of [MapPointElement](#glossary).    |
| outlineColor    | String | false    | value of [styles](#styles).borderColor | Value of CSS property [outline-color](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color) on hover of [MapPointElement](#glossary). |

##### points.focus

| Name     | Type    | Required | Default                                         | Description                                                                                                                        |
|----------|---------|----------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| enabled  | Boolean | false    | false                                           | Enables [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) element on [MapPointElement](#glossary) click.    |
| selector | String  | false    | element founded by [draw](#pointsDraw).selector | CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for focus) in element founded by [draw](#pointsDraw).selector. |

##### points.scroll

| Name     | Type    | Required | Values                    | Default                                         | Description                                                                                                                                                                                           |
|----------|---------|----------|---------------------------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled  | Boolean | false    |                           | true                                            | Enables scroll on [MapPointElement](#glossary) click.                                                                                                                                                 |
| selector | String  | false    |                           | element founded by [draw](#pointsDraw).selector | CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement (for scroll) in element founded by [draw](#pointsDraw).selector. |
| type     | String  | false    | `top`, `bottom`, `middle` | `top`                                           | Scrolls the Window to element (top/bottom/middle of Window) in the Document.                                                                                                                          |

##### points.titleConstructor

| Name        | Type   | Required | Description                                                                                                                                       |
|-------------|--------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| text        | String | false    | Custom text.                                                                                                                                      |
| selector    | String | false    | CSS selector for searching by [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) HTMLElement for analyze. |
| attribute   | String | false    | Take value from `attribute` of element founded by [selector](#pointsTitleConstructor).                                                            |
| textContent | String | false    | Take string from `textContent` of element founded by [selector](#pointsTitleConstructor).                                                         |

## Getters

| Name    | Description                           |
|---------|---------------------------------------|
| root    | Return [MapElement](#glossary).       |
| version | Return version of DomVerticalMiniMap. |

## Methods

| Name    | Description                                                                                                                       |
|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| create  | Create and inject DomVerticalMiniMap component in DOM.                                                                            |
| destroy | Reset DomVerticalMiniMap component and remove it from DOM.                                                                        |
| refresh | Reinitialize [MapPointElements](#glossary) and refresh styles of [ScrollMapElement](#glossary) and [MapPointElements](#glossary). |

## Usage

See [examples](https://igorxut.github.io/dom-vertical-mini-map/).

## License

[MIT](http://opensource.org/licenses/MIT)
