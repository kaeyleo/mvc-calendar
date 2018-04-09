export {qs, qsa, $on, $delegate}

function qs (selector, scope) {
  return (scope || document).querySelector(selector)
}

function qsa (selector, scope) {
  return (scope || document).querySelectorAll(selector)
}

function $on (target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture)
}

function $delegate (target, selector, type, handler) {
  const useCapture = type === 'blur' || type === 'focus'
  const dispatchEvent = event => {
    const targetElement = event.target
    const potentialElements = qsa(selector, target)
    const hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0
    // let i = potentialElements.length
    // while (i--) {
    //   if (potentialElements[i] === targetElement) {
    //     handler.call(targetElement, event)
    //     break
    //   }
    // }
    if (hasMatch) handler.call(targetElement, event)
  }

  $on(target, type, dispatchEvent, useCapture)
}
