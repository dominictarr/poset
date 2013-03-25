
## generic selector syntax

generic jqueryish selectors.

``` js
$(function test())  //match nodes when function returns true

$({ancestor: test})        //match nodes which are an ancestor of anything that passes the test.
$({ancestor: exact_node})  //match ancestors of exact_node
$({decendent: test})       //match decendents of nodes that pass test.
$({decendent: exact_node}) //match decendents of exact_node

$({decendant: exact_node, test: function (e) { return /\.js$/.test(e.name) }}) //all the js files.

//just like the above, but only one level, not N levels.
$({parent: test}) //returns the parent of nodes that pass test.
$({child: test})  //returns the child of modules tha pass test.



//get all children of children that are named node_modules
$([exact_node, 
  {
    child: {child: true},
    test: function (e) { return e.name == 'node_modules' }
  }
])

//if the rules are mapped like in series, each filtering/mapping the one before
//the the above would be the same as this:

$([exact_node, 
  {child: true}, 
  function (e) { return e.name == 'node_modules' },
  {child: true}
])

//match all the children  of the node_module children of the ancestors of exact_node
//same as .../node_modules/*/
$([{ancestor: exact_node}, {child: {child: true}, test: function (e) { return e.name == 'node_modules' }}])

//same as .../node_modules/*/package.json
$([{ancestor: current_dir}, 
  {child:
    {child: {
        child: function (e) { return e.name == 'package.json' }
      },
      test: true
    },
    test: function (e) { return e.name == 'node_modules' }
  }
])
```

