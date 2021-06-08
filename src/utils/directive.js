import Vue from 'vue'
// v-debounce / v-throttle
(function() {
  const throttle = function throttle(func, wait) {
    if (typeof func !== 'function') throw new TypeError('func must be a function!')
    wait = +wait
    if (isNaN(wait)) wait = 300
    let timer = null
    let previous = 0
    let result
    return function proxy(...params) {
      const now = +new Date()
      const remaining = wait - (now - previous)
      const self = this
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        previous = now
        result = func.apply(self, params)
        return result
      }
      if (!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
          previous = +new Date()
          result = func.apply(self, params)
        }, remaining)
      }
      return result
    }
  }

  const debounce = function debounce(func, wait, immediate) {
    if (typeof func !== 'function') throw new TypeError('func must be a function!')
    if (typeof wait === 'undefined') {
      wait = 500
      immediate = false
    }
    if (typeof wait === 'boolean') {
      immediate = wait
      wait = 500
    }
    if (typeof immediate === 'undefined') {
      immediate = false
    }
    if (typeof wait !== 'number') throw new TypeError('wait must be a number!')
    if (typeof immediate !== 'boolean') throw new TypeError('immediate must be a boolean!')
    let timer = null
    let result
    return function proxy(...params) {
      const self = this
      const callNow = !timer && immediate
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        if (!immediate) result = func.apply(self, params)
      }, wait)
      if (callNow) result = func.apply(self, params)
      return result
    }
  }

  const config = {
    bind(el, binding) {
      const val = binding.value
      let wait = 500
      let immediate = false
      let type = 'click'
      let params = []
      let func
      const handle = binding.name === 'debounce' ? debounce : throttle
      if (val == null) return
      if (typeof val !== 'object' && typeof val !== 'function') return
      if (binding.arg) wait = +binding.arg
      if (binding.modifiers && binding.modifiers.immediate) immediate = true
      if (typeof val === 'function') func = val
      if (typeof val === 'object') {
        func = val.func || function() {
        }
        type = val.type || 'click'
        params = val.params || []
      }
      el.$type = type
      el.$handle = handle(function proxy(...args) {
        return func.call(this, ...params.concat(args))
      }, wait, immediate)
      el.addEventListener(el.$type, el.$handle)
    },
    unbind(el) {
      el.removeEventListener(el.$type, el.$handle)
    }
  }

  Vue.directive('debounce', config)
  Vue.directive('throttle', config)
})()
