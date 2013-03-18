# poset


## API

### Node.ancestors()

### Node.subposet (test) / filter

return a subposet of the poset that matches a property

example: tree of directories

poset(fs).filter(function (e) {return e.isDirectory()})

tree of objects

poset(obj).filter(function (e) {return e && 'object' === typeof e})

## traversals

poset(fs).topological(function (item) {...})

poset(fs).depthFirst(function (item) {...})

poset(fs).widthFirst(function (item) {...})

poset(fs).ancestors(function (item) {...})

poset(fs).roots(function (item) {...})

## comparisons

item1.gt(item2) 
item1.decendentOf(item2)
item1.ancestorOf(item2)

item1.concestor(item2)

## License

MIT
