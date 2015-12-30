# ObjectFork

Simple immutable fork out from a plain JS Object.

LIMITATIONS: does not work yet properly with Array functions.




















   

 


   
#### Class ObjectFork


- [fork](README.md#ObjectFork_fork)
- [merge](README.md#ObjectFork_merge)



   


   





   
# Class ObjectFork


The class has following internal singleton variables:
        
        
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
        
### <a name="ObjectFork_merge"></a>ObjectFork::merge(obj)
`obj` Object to merge back to the original
 


```javascript

// merge the object back to it's master object
if(obj.__master) {
    // anything that has changed...
    var me = this, original = obj.__master;
    
    Object.keys(obj).forEach(function(key) {
        if( (obj[key] instanceof Array) || (typeof(obj[key])=="object") ) {
            if(original[key]) return me.merge( obj[key] );     
            original[key] = obj[key];
        } else {
            original[key] = obj[key];
        }
    });    
}
```



   


   




