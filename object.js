var Poset = require('./')

var JsPoset = module.exports = (function () {
  return Poset({
    children: function (cb) {
//      console.log('children', this.value)
      var children = []
      var value = this.value
      if(!value || 'object' !== typeof value)
        return cb(null, [])

      for(var k in value) {
        if(value[k])
          children.push(value[k])
      }
//      console.log('>>>', children)
      cb(null, children)
    }
  })
})()

if(!module.parent)
  new JsPoset({pkg: require('./package.json')})
    .topo(function (e) {
      if(e)// && 'string' === typeof e.value)
        console.log(e.value)
    })

