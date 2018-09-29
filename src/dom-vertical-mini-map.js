/* global MutationObserver */

export default class DomVerticalMiniMap {
  // noinspection JSAnnotator

  /**
   *
   * @param {String} stylesBackgroundColor
   * @param {String} stylesBorderColor
   * @param {String} stylesPosition
   * @param {String} stylesWidth
   * @param {Number} stylesZIndex
   * @param {Boolean} scrollEnabled
   * @param {String} scrollStylesBackgroundColor
   * @param {Array} points
   */
  constructor (
    {
      styles: {
        backgroundColor: stylesBackgroundColor = 'rgba(248, 249, 250, 1)',
        borderColor: stylesBorderColor = 'rgba(108, 117, 125, 1)',
        position: stylesPosition = 'right',
        width: stylesWidth = '1rem',
        zIndex: stylesZIndex = 1000
      } = {},
      scroll: {
        enabled: scrollEnabled = true,
        styles: {
          backgroundColor: scrollStylesBackgroundColor = 'rgba(108, 117, 125, 0.3)'
        } = {}
      } = {},
      points = []
    } = {}
  ) {
    this._version = VERSION
    this._mapElement = null
    this._scrollElement = null
    this._mutationObserver = null
    this._mapPoints = []

    this._mapElementStyles = {
      backgroundColor: stylesBackgroundColor,
      borderColor: stylesBorderColor,
      position: ['right', 'left'].includes(stylesPosition) ? stylesPosition : 'right',
      width: stylesWidth,
      zIndex: stylesZIndex
    }

    this._isScrollElementEnabled = (
      typeof scrollEnabled === 'boolean'
        ? scrollEnabled
        : true
    )

    this._scrollElementStyles = {
      backgroundColor: scrollStylesBackgroundColor
    }

    this._points = points
  }

  /**
   * Return top and bottom coordinates of HTMLElement.
   *
   * @param {HTMLElement} element
   * @returns {{top: {Number} number, bottom: {Number} number}}
   */
  static getElementCoordinates (element) {
    const box = element.getBoundingClientRect()
    const body = document.body
    const documentElement = document.documentElement

    const scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop
    const clientTop = documentElement.clientTop || body.clientTop || 0

    const top = box.top + scrollTop - clientTop

    return {
      top: top,
      bottom: top + element.offsetHeight
    }
  }

  /**
   * Return height of Window, height of Document and height with scroll of Document.
   *
   * @returns {{windowHeight: number, documentHeight: number, documentScrollTop: number}}
   */
  static getDocumentProperties () {
    const body = document.body
    const documentElement = document.documentElement

    const windowHeight = documentElement.clientHeight
    const documentHeight = Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, windowHeight
    )

    return {
      windowHeight: windowHeight,
      documentHeight: documentHeight,
      documentScrollTop: window.pageYOffset || documentElement.scrollTop
    }
  }

  /**
   * Scroll Document vertically to coordinate.
   *
   * @param {Event} event
   */
  static scrollDocumentTo (event) {
    const { windowHeight, documentHeight } = DomVerticalMiniMap.getDocumentProperties()
    window.scrollTo(0, (documentHeight / windowHeight * event['clientY']))
  }

  /**
   * Scroll Document vertically to Element.
   *
   * @param {Event} event
   * @param {HTMLElement} focusElement
   * @param {HTMLElement} scrollElement
   * @param {String} scrollType
   */
  static scrollDocumentToElement (
    {
      focusElement = null,
      scrollElement = null,
      scrollType = 'top'
    } = {},
    event
  ) {
    let element = null

    if (focusElement != null) {
      focusElement.focus()

      element = focusElement
    }

    if (scrollElement != null) {
      element = scrollElement
    }

    if (element == null) {
      event.stopPropagation()
      return
    }

    if (scrollType === 'top') {
      element.scrollIntoView(true)
    } else if (scrollType === 'bottom') {
      element.scrollIntoView(false)
    } else if (scrollType === 'middle') {
      const { windowHeight, documentHeight } = DomVerticalMiniMap.getDocumentProperties()
      const { top } = DomVerticalMiniMap.getElementCoordinates(element)

      const halfWindowHeight = windowHeight / 2

      if ((top - halfWindowHeight) < 0) {
        element.scrollIntoView(true)
      } else {
        if ((top + halfWindowHeight) > documentHeight) {
          element.scrollIntoView(false)
        } else {
          window.scrollTo(0, top - halfWindowHeight)
        }
      }
    }

    event.stopPropagation()
  }

  /**
   * Initialize component DomVerticalMiniMap.
   *
   * @private
   */
  _init () {
    const isScrollElementEnabled = this._isScrollElementEnabled

    this._initMapElement()

    if (isScrollElementEnabled) {
      this._initScrollElement()
    }

    this._initMapPoints()

    window.addEventListener('resize', this._setMapPointStyles.bind(this))

    const mapElement = this._mapElement

    if (isScrollElementEnabled) {
      mapElement.appendChild(this._scrollElement)
    }

    const container = document.documentElement || document.body

    container.appendChild(mapElement)

    this._initMutationObserver()

    this._mutationObserver.observe(container, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    })
  }

  /**
   * Initialize {HTMLElement} MapElement.
   *
   * @private
   */
  _initMapElement () {
    this._mapElement = document.createElement('div')

    const mapElement = this._mapElement
    const mapElementStyles = this._mapElementStyles
    const mapElementStylesWidth = mapElementStyles['width']

    mapElement.classList.add('dom-vertical-mini-map')

    mapElement.style.backgroundColor = mapElementStyles['backgroundColor']
    mapElement.style.width = mapElementStylesWidth
    mapElement.style.borderColor = mapElementStyles['borderColor']
    mapElement.style.zIndex = mapElementStyles['zIndex'].toString()

    if (mapElementStyles.position === 'left') {
      mapElement.style.left = '0'
      mapElement.style.right = `calc(100% - ${mapElementStylesWidth})`
      mapElement.style.borderRightWidth = '1px'
    } else {
      mapElement.style.right = '0'
      mapElement.style.left = `calc(100% - ${mapElementStylesWidth})`
      mapElement.style.borderLeftWidth = '1px'
    }

    mapElement.addEventListener(
      'click',
      DomVerticalMiniMap.scrollDocumentTo.bind(event) /* eslint-disable-line */
    )
  }

  /**
   * Initialize all {HTMLElement} MapPoint elements.
   *
   * @private
   */
  _initMapPoints () {
    const mapPoints = this._mapPoints
    const points = this._points
    const mapPointsElements = mapPoints.map(mapPoint => mapPoint['element'])

    const tempElements = []
    for (let i = 0, pointsLength = points.length; i < pointsLength; ++i) {
      const point = points[i]
      const draw = point['draw'] || {}
      const selector = draw['selector']

      if (selector == null) {
        continue
      }

      const selectorContains = draw['selectorContains']

      const styles = draw['styles'] || {}
      const styleBackgroundColor = styles['backgroundColor']
      const styleOutlineColor = styles['outlineColor']

      const focus = point['focus'] || {}
      const focusEnabled = focus['enabled'] || false
      const focusSelector = focus['selector']

      const scroll = point['scroll'] || {}
      const scrollEnabled = scroll['enabled'] || true
      const scrollSelector = scroll['selector']
      const scrollType = scroll['type'] || 'top'

      const titleConstructor = point['titleConstructor'] || []

      const elements = document.querySelectorAll(selector)
      for (let j = 0, elementsLength = elements.length; j < elementsLength; ++j) {
        const element = elements[j]

        if (selectorContains != null) {
          if (element.querySelector(selectorContains) == null) {
            continue
          }
        }

        tempElements.push(element)

        if (mapPointsElements.includes(element)) {
          continue
        }

        const mapPoint = {
          element: element,
          focusElement: null,
          marker: document.createElement('div'),
          scrollElement: null,
          scrollEnabled: scrollEnabled,
          scrollType: scrollType,
          styles: {
            backgroundColor: styleBackgroundColor,
            outlineColor: styleOutlineColor
          }
        }

        if (focusEnabled) {
          mapPoint['focusElement'] = (
            focusSelector == null
              ? element
              : element.querySelector(focusSelector)
          )
        }

        if (scrollEnabled) {
          mapPoint['scrollElement'] = (
            scrollSelector == null
              ? element
              : element.querySelector(scrollSelector)
          )
        }

        const titleConstructorLength = titleConstructor.length

        let hint = (
          titleConstructorLength
            ? ''
            : null
        )

        for (let k = 0; k < titleConstructorLength; ++k) {
          const titleChunk = titleConstructor[k]

          if (titleChunk.hasOwnProperty('text')) {
            const titleText = titleChunk['text']

            hint = (
              k === 0
                ? titleText
                : `${hint}\n${titleText}`
            )

            continue
          }

          const titleSelector = titleChunk['selector']
          const titleElement = (
            titleSelector == null
              ? element
              : element.querySelector(titleSelector)
          )

          if (titleElement != null) {
            const titleTextContent = titleElement['textContent'] || false

            if (titleTextContent) {
              const titleElementTextContent = titleElement.textContent

              if (titleElementTextContent != null) {
                hint = (
                  k === 0
                    ? titleElementTextContent
                    : `${hint}\n${titleElementTextContent}`
                )
              }

              continue
            }

            if (titleChunk.hasOwnProperty('attribute')) {
              const titleElementAttributeValue = titleElement.getAttribute(titleChunk['attribute'])

              if (titleElementAttributeValue != null) {
                hint = (
                  k === 0
                    ? titleElementAttributeValue
                    : `${hint}\n${titleElementAttributeValue}`
                )
              }
            }
          }
        }

        const marker = mapPoint['marker']

        if (hint != null) {
          marker.title = hint
        }

        if (scrollEnabled) {
          marker.addEventListener('click', DomVerticalMiniMap.scrollDocumentToElement.bind(null, {
            focusElement: mapPoint['focusElement'],
            scrollElement: mapPoint['scrollElement'],
            scrollType: mapPoint['scrollType']
          }))
        }

        mapPoints.push(mapPoint)
      }
    }

    const fragment = document.createDocumentFragment()
    let index = mapPoints.length

    const mapElements = this._mapElementStyles
    const mapElementStylesBorderColor = mapElements['borderColor']
    const mapElementZindex = mapElements['zIndex']

    while (index--) {
      const mapPoint = mapPoints[index]
      const element = mapPoint['element']
      const marker = mapPoint['marker']
      const styles = mapPoint['styles']
      const scrollEnabled = mapPoint['scrollEnabled']

      marker.classList.add('dom-vertical-mini-map-point')
      marker.style.outlineColor = styles['outlineColor'] || mapElementStylesBorderColor
      marker.style.backgroundColor = styles['backgroundColor'] || 'rgba(220, 53, 69, 1)'
      marker.style.zIndex = (mapElementZindex + 1).toString()

      if (tempElements.includes(element)) {
        fragment.appendChild(marker)
      } else {
        if (scrollEnabled) {
          marker.removeEventListener('click', DomVerticalMiniMap.scrollDocumentToElement.bind(null, {
            focusElement: mapPoint['focusElement'],
            scrollElement: mapPoint['scrollElement'],
            scrollType: mapPoint['scrollType']
          }))
        }

        marker.remove()
        mapPoints.splice(index, 1)
      }
    }

    this._mapElement.appendChild(fragment)
  }

  /**
   * Initialize {MutationObserver} _mutationObserver for observe DOM.
   *
   * @private
   */
  _initMutationObserver () {
    const self = this

    this._mutationObserver = new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        const target = mutation.target

        if (!self._mapElement.contains(target)) {
          if (self._isScrollElementEnabled) {
            self._setScrollElementStyle()
          }

          self._initMapPoints()
          self._setMapPointStyles()
        }
      })
    )
  }

  /**
   * Initialize {HTMLElement} _scrollElement.
   *
   * @private
   */
  _initScrollElement () {
    this._scrollElement = document.createElement('div')

    const scrollElement = this._scrollElement

    scrollElement.classList.add('dom-vertical-mini-map-scroll')

    scrollElement.style.backgroundColor = this._scrollElementStyles['backgroundColor']
    scrollElement.style.zIndex = (this._mapElementStyles['zIndex'] + 2).toString()

    window.addEventListener('scroll', this._setScrollElementStyle.bind(this))
    window.addEventListener('resize', this._setScrollElementStyle.bind(this))
  }

  /**
   * Set 'style' attribute of all MapPoint elements.
   *
   * @private
   */
  _setMapPointStyles () {
    const mapPoints = this._mapPoints
    const { documentHeight } = DomVerticalMiniMap.getDocumentProperties()

    for (let i = 0, length = mapPoints.length; i < length; ++i) {
      const mapPoint = mapPoints[i]
      const marker = mapPoint['marker']

      const { bottom, top } = DomVerticalMiniMap.getElementCoordinates(mapPoint['element'])

      marker.style.bottom = `${100 / documentHeight * (documentHeight - bottom)}%`
      marker.style.top = `${100 / documentHeight * top}%`
    }
  }

  /**
   * Set 'style' attribute of _scrollElement.
   *
   * @private
   */
  _setScrollElementStyle () {
    const scrollElement = this._scrollElement

    const { windowHeight, documentHeight, documentScrollTop } = DomVerticalMiniMap.getDocumentProperties()

    if (windowHeight < documentHeight) {
      scrollElement.style.display = 'block'
      scrollElement.style.bottom = `${100 / documentHeight * (documentHeight - documentScrollTop - windowHeight)}%`
      scrollElement.style.top = `${100 / documentHeight * documentScrollTop}%`
    } else {
      scrollElement.style.display = 'none'
    }
  }

  /**
   * Create and inject DomVerticalMiniMap component in DOM.
   *
   */
  create () {
    this._init()

    const isScrollElementEnabled = this._isScrollElementEnabled

    if (isScrollElementEnabled) {
      this._setScrollElementStyle()
    }

    this._setMapPointStyles()
  }

  /**
   * Reset DomVerticalMiniMap component and remove it from DOM.
   *
   */
  destroy () {
    const mapElement = this._mapElement
    const isScrollElementEnabled = this._isScrollElementEnabled

    this._mutationObserver.disconnect()
    this._mutationObserver = null

    /* eslint-disable-next-line */
    mapElement.removeEventListener('click', DomVerticalMiniMap.scrollDocumentTo.bind(event))
    window.removeEventListener('resize', this._setMapPointStyles.bind(this))

    if (isScrollElementEnabled) {
      window.removeEventListener('scroll', this._setScrollElementStyle.bind(this))
      window.removeEventListener('resize', this._setScrollElementStyle.bind(this))

      this._scrollElement.remove()
      this._scrollElement = null
    }

    const mapPoints = this._mapPoints
    for (let i = 0, length = mapPoints.length; i < length; ++i) {
      const mapPoint = mapPoints[i]
      mapPoint['marker'].remove()
    }
    this._mapPoints = []

    mapElement.remove()
    this._mapElement = null
  }

  /**
   * Reinitialize MapPointElements and refresh styles of _scrollElement and MapPointElements
   *
   */
  refresh () {
    this._initMapPoints()
    this._setMapPointStyles()

    if (this._isScrollElementEnabled) {
      this._setScrollElementStyle()
    }
  }

  /**
   * Return {HTMLElement} _mapElement (root element of DomVerticalMiniMap component)
   *
   * @returns {(HTMLElement | null)}
   */
  get root () {
    return this._mapElement
  }

  /**
   * Return version of current DomVerticalMiniMap
   *
   * @returns {String}
   */
  get version () {
    return this._version
  }
}
