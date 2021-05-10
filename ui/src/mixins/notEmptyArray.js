function notEmptyArray () {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] && arguments[i].length > 0) {
      return true
    }
  }
  return false
}

const notEmptyArrayMixin = {
  methods: {
    notEmptyArrayMixin: notEmptyArray
  }
}

export { notEmptyArray, notEmptyArrayMixin }
