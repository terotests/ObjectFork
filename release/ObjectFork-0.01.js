// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var ObjectFork_prototype = function ObjectFork_prototype() {
    // Then create the traits and subclasses for this class here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param Object obj  - Forked object that should be committed back to it&#39;s source
       */
      _myTrait_.commit = function (obj) {

        // merge the object back to it's master object
        if (obj.__master) {
          // anything that has changed...
          var me = this,
              original = obj.__master;

          Object.keys(obj).forEach(function (key) {
            if (obj[key] instanceof Array || typeof obj[key] == "object") {
              if (original[key]) return me.merge(obj[key]);
              original[key] = obj[key];
            } else {
              original[key] = obj[key];
            }
          });
        }
      };

      /**
       * @param Object obj  - object to fork, otherwise using the root object
       */
      _myTrait_.fork = function (obj) {

        var original = obj || this._root;

        var forkClass = function forkClass() {};
        forkClass.prototype = original;

        var fork = new forkClass();
        var me = this,
            _privateValues = {};
        // loop all the keys of the original...
        Object.keys(original).forEach(function (key) {
          if (original[key] instanceof Array || typeof original[key] == "object") {
            //
            Object.defineProperty(fork, key, {
              enumerable: true,
              get: function get() {
                if (_privateValues[key]) return _privateValues[key];
                if (!original[key]) return null;
                _privateValues[key] = me.fork(original[key]);
                return _privateValues[key];
              },
              set: function set(value) {
                _privateValues[key] = value;
              }
            });
          }
        });

        // define __master as a point where the for started
        Object.defineProperty(fork, "__master", {
          enumerable: false,
          get: function get() {
            return original;
          },
          set: function set(value) {}
        });
        return fork;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (rootObject, options) {

        this._root = rootObject;
      });
    })(this);
  };

  var ObjectFork = function ObjectFork(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof ObjectFork) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != ObjectFork._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new ObjectFork(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  ObjectFork._classInfo = {
    name: "ObjectFork"
  };
  ObjectFork.prototype = new ObjectFork_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["ObjectFork"] = ObjectFork;
      this.ObjectFork = ObjectFork;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["ObjectFork"] = ObjectFork;
    } else {
      this.ObjectFork = ObjectFork;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());