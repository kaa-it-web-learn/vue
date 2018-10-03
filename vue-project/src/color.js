export default {
  bind(el, bindings, vnode) {
    console.log('bind')
    //el.style.color = 'blue'

    const setArg = () => {
      const arg = bindings.arg
      el.style[arg] = bindings.value
    }

    const fontModifier = bindings.modifiers['font']
    const delayModifiers = bindings.modifiers['delay']

    if (fontModifier) {
      el.style.fontSize = '50px'
    }

    if (delayModifiers) {
      setTimeout(setArg, 2000)
    } else {
      setTimeout(setArg, 0)
    }
  },
  inserted(el, bindings, vnode) {
    console.log('inserted')
  },
  update(el, bindings, vnode, oldVnode) {
    console.log('update')
  },
  componentUpdated(el, bindings, vnode, oldVnode) {
    console.log('componentUpdated')
  },
  unbind() {
    console.log('unbind')
  }
}
