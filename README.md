# poset

experimental poset module

Poset is an abstraction that fits neatly over
trees, lists, and sets.

The goal for this module is to create a simple API
that can be used to mainpulate all of the above.

included so far, is `./fs.js` and `./object.js`
which adapt this module for operating on fs trees,
and js objects.

There are many other possibilities,
such as HTMLElements, git commits, and many others.

thanks to @jez0990 for introducing me to posets!

## Stability

Experimental: Expect the unexpected. Please provide feedback on api and your use-case.

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
