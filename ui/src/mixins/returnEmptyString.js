function res (payload) {
  if (typeof (payload) === 'string' || typeof (payload) === 'number') {
    return payload
  } else {
    console.info('[Zinka] Expected String or Number got:' + ' ' + payload)
  }
  return ''
}

const resMixin = {
  methods: {
    res: res
  }
}

export { res, resMixin }
