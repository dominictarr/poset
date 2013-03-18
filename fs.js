
var Poset = require('./')
var fs    = require('fs')
var path  = require('path')

var FsPoset = module.exports = (function (root) {
  var stats = {}
  return Poset({
    get: function (file, cb) {
      if(file[0] == '.' || file[0] !== '/')
        var file = path.resolve(file)
      if(stats[file])
        return cb(null, stats[file])

      fs.lstat(file, function (err, stat) {
        if(err) throw err
        stats[file] = stat
        stat.id = stat.filename = file

        stat.type = 
            stat.isFile()            ? 'file'
          : stat.isDirectory()       ? 'dir'
          : stat.isBlockDevice()     ? 'block'
          : stat.isCharacterDevice() ? 'char'
          : stat.isSymbolicLink()    ? 'link'
          : stat.isSocket()          ? 'socket'
          : (function () { throw new Error('unknown file type')})()

        cb(err, stat)
      })
    },
    children: function (cb) {
      var value = this.value
      if(value.type != 'dir') return cb(null, [])
      var filename = value.filename
      fs.readdir(value.filename, function (err, ls) {
        if(err) throw err
        cb(null, ls.map(function (file) {
          return path.resolve(filename, file)
        }))
      })
    }
  })
})()


if(! module.parent) {
  new FsPoset().get(process.cwd(), function (err, item) {
    item.topo(function (item) {
      if(item)
      console.log(item.value.filename)
    })
  })
}
