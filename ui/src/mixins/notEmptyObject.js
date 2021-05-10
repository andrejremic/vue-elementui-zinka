function notEmptyObject () {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] && Object.keys(arguments[i]).length > 0) {
      return true
    }
  }
  return false
}

const notEmptyObjectMixin = {
  methods: {
    notEmptyObjectMixin: notEmptyObject
  }
}

export {
  notEmptyObject,
  notEmptyObjectMixin
}
