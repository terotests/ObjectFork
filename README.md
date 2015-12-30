# ObjectFork

Simple fork out from a plain JS Object - maintains the master object as immutable.

LIMITATIONS: Mutating a forked Array using Array functions like `push` is not possible

Usage;
```javascript
    var myData = { x : 100, y : 200, 
        subObj : {
            name : "Subitem name"  
        },
        items : [
            { name : "first item"}
        ]};
    var forked = ObjectFork().fork( myData );
    
    // do something with forked data...
    
    ObjectFork().commit( myData );
    
        
```



















   

 


   
#### Class ObjectFork


- [commit](README.md#ObjectFork_commit)
- [fork](README.md#ObjectFork_fork)



   


   





   
# Class ObjectFork


The class has following internal singleton variables:
        
        
### <a name="ObjectFork_commit"></a>ObjectFork::commit(obj)
`obj` Forked object that should be committed back to it&#39;s source
 


```javascript

// merge the object back to it's master object
if(obj.__master) {
    // anything that has changed...
    var me = this, original = obj.__master;
    
    Object.keys(obj).forEach(function(key) {
        if( (obj[key] instanceof Array) || (typeof(obj[key])=="object") ) {
            if(original[key]) return me.commit( obj[key] );     
            original[key] = obj[key];
        } else {
            original[key] = obj[key];
        }
    });    
}
```

### <a name="ObjectFork_fork"></a>ObjectFork::fork(obj)
`obj` object to fork, otherwise using the root object
 


```javascript

var original = obj || this._root;

var forkClass = function() {};
forkClass.prototype = original;

var fork = new forkClass();
var me = this, _privateValues = {};
// loop all the keys of the original...
Object.keys(original).forEach(function(key) {
    if( (original[key] instanceof Array) || (typeof(original[key])=="object") ) {
        // 
        Object.defineProperty(fork, key, {
            enumerable: true,
            get: function() {
              if(_privateValues[key]) return _privateValues[key];
              if(!original[key]) return null;
              _privateValues[key] = me.fork(original[key]);
              return _privateValues[key];
            }, 
            set : function(value) {
                _privateValues[key] = value;
            }
        });         
    }
});

// define __master as a point where the for started
Object.defineProperty(fork, "__master", {
    enumerable: false,
    get: function() {
      return original;
    },
    set: function(value) {
      
    }
}); 
return fork;

```

### ObjectFork::constructor( rootObject, options )

```javascript

this._root = rootObject;
```
        


   


   




