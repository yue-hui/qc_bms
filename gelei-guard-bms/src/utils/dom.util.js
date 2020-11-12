import { getValueType } from './index'

export function domAddClass(dom, className) {
  let classes = dom.getAttribute('class')
  if (getValueType(classes) === 'string') {
    classes = classes + ' ' + className
  } else {
    classes = className
  }
  dom.setAttribute('class', classes)
}

export function domRemoveClass(dom, className) {
  let classes = dom.getAttribute('class')
  if (getValueType(classes) === 'string') {
    classes = classes.split(' ')
    if (classes.includes(className)) {
      classes.splice(classes.indexOf(className), 1)
    }
  } else {
    classes = []
  }
  dom.setAttribute('class', classes.join(' '))
}

export function removeDom(dom) {
  try {
    dom.remove()
  } catch (e) {
    dom.parentNode.removeChild(dom)
  }
}
