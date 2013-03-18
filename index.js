

function toAsync(fun) {
  return function () {
    var args = [].slice.call(arguments)
    var cb = args.pop()
    var returned = false
    args.push(function (err, data1, data2) {
      if(returned) return
      returned = true
      cb(err, data1, data2)
    })
    var ret
    try {
      ret = fun.apply(this, args)
    } catch (err) {
      return cb(err)
    }
    if(ret) returned = true, cb(null, ret)
  }
}

function identity (e, cb) {
  return cb(null, e), e
}

module.exports = function (def) {

  var children = def.children
  var get      = def.get || identity

  var P = Poset.prototype
  
  function Poset (item) {
    if(item) {
      this.value = item
      return this
      item.__proto__ = P
      return item
    }
    if(!(this instanceof Poset)) return new Poset(item)
  }

  //TODO: write these all using a light weight stream thing
  //https://githum.com/dominictarr/strm

  P.children = function (iter) {
    children.call(this, function (err, array) {
      var n = array.length
      if(!array.length)
        return iter()
      array.forEach(function (e) {
        get(e, function (err, item) {
          if(item) iter(new Poset(item))
          if(--n) return
          iter()
        })
      })
    })
  }

  P.depthFirst = function (iter) {
    var n = 0
    function children (item) {
      if(item != null) {
        iter(item)
        n ++
        //item?
        item.children(children)
      }
      else if(!--n)
        iter(null, true) //END
    }
    children(this)
  }

  P.widthFirst = function (iter) {
    var l = []
    function children (item) {
      item.children(function (item) {
        if(item == null) {
          if(l.length)
            return children(l.shift())
          else return iter() //end of traversal
        }
        l.push(item)
        iter(item)
      })
    }

    iter(this)
    children(this)
  }

  P.topo = 
  P.topological = function (iter) {
    //I think this needs to be rewritten for more async.
    //may error if children not called back in order...

    //traverse the leaves first
    //expand all children, and 
    //iterate over nodes with no children first.

    function children (item, done) {
      var n = 1
      item.children(function (_item) {
        //IF THERE ARE NO CHILDREN
        if(!_item) {
          if(--n) return
          return done()
        }
        n++
        children(_item, function () {
          iter(_item)
          if(--n) return
          done()
        })

      })
    }
    var self = this
    children(this, function () {
      iter(self)
      iter()
    })
  }

  P.get = function (id, cb) {
    get(id, function (err, item) {
      item = new Poset(item)

      cb(err, item)
    })
  }

  return Poset
}

//poset({parent: , children: , isRoot:, id:, data:})
