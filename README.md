# OS Controls

Controls for creating OS like file explorers.


















   

 


   
#### Class ocControls


- [fileExplorer](README.md#ocControls_fileExplorer)



   


   





   
# Class ocControls


The class has following internal singleton variables:
        
        
### <a name="ocControls_fileExplorer"></a>ocControls::fileExplorer(t)


```javascript

_e().createClass("osMenu", {
    css : function(c) {
        c.bind(".topMenuArea", {
            width : "100%",
            "background" : "#fae9e6",
            "font-family" : "Arial",
            "font-size" : "14px"
        });
        c.bind(".menuItem", {
          display : "table-cell",
          padding : "10px 4px 4px 10px"
        })
        c.bind(".menuItem:hover", {
          "background" : _e().mix( "#fae9e6", "#999", 0.2)
        })
    },
    init : function() {
      this.addClass("topMenuArea");
      this.mvc(this.model().items, function(i) {
        return _e("div", function() {
          this.addClass("menuItem");
          this.text(i.get("title"));})
      })
    }
});




_e().createClass("actionItem", {
    init : function() {
      //.addClass( item.get("active") ? "active" : "")
      var item = this.model();
      if(item.get("icon")) {
        this.span("icon").span(item.get("icon"));
      }
      this.span("title").bind(item, "title")
      if(item.get("action")) {
         this.clickTo(item.get("action"), item);  
      }
    },
    tagName : "span"
});

_e().createClass("showFile", {
    css : function(c) {
        c.bind(".fileArea", {
            "background-color" : "white",
            "width" : "100%",
            "height" : "600px",
            "text-align" : "center",
            "padding" : "20px"
        });
        c.bind(".prevImage", {
           "max-height" : "500px"
        })
    },
    init : function() {
      this.addClass("fileArea");
      
      var im = this.div().img("prevImage").src("http://static.parade.com/wp-content/uploads/2014/03/Why-Do-Stars-All-Look-Almost-the-Same-Size-ftr.jpg").width("auto");
      this.h4().bind(this.model(), "title");
      
    }
});


_e().createClass("deepAppleMenu", {
  requires: {
    css: [{
      url: "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
    }]
  },    
  css : function(c) {
      c.bind("div.me", {
         "opacity" : 0.4
      })
      c.bind(".area", {
        "display" : "table-row"
      });
      c.bind(".naviBtn", {
          "border" : "1px solid #222",
          "background-color" : "#aaa",
          "color" : "#aaa",
          "border-radius" : "4px",
          "outline" : "none",
          "cursor" : "pointer",
          "background" : "linear-gradient(#333,#666)"
      });
      c.bind(".naviBtn:hover", {
          "color" : "white"
      });    
    c.bind(".nextLevel", {
      "display" : "table-cell",
      "white-space" : "nowrap"
    })
     c.bind(".ddContent", {
       "background-color" : "white",
       "padding" : "0px",
       "border-top" : "2px solid gray",
       "font-family" : "Helvetica",
       "font-size" : "14px",
       "display" : "table-cell",
       "vertical-align" : "top",
       "text-align" : "top",
       "height" : "600px",
       "width" : "200px",
       "overflow" : "auto"
     })
     c.bind(".ddList", {
       "height" : "600px",
       "overflow" : "auto",
       "width" : "200px"
     });
     c.bind(".ddContentItem", {
       "border-top" : "1px solid gray",
       "padding" : "3px",
       "background-color" : "#eee",
       "cursor" : "pointer",
       "color" : "#666"
     })
     c.bind(".active", {
       "background-color" : _e().mix("#459", "white",0.6),
       "color" : "black"
     })
     // #6ec3e5
     c.bind(".fa-folder", {
       "color" : "#6ec3e5",
       "text-shadow" : "0px 1px 1px black"
     })   
     c.bind(".fa-clone", {
       "color" : "gold",
       "float" : "right",
       "text-shadow" : "0px 1px 1px black"
     })      
     c.bind(".fa-file", {
       "color" : "#eef",
       "text-shadow" : "0px 1px 1px black "
     })  
     c.bind(".title", {
       "margin-left" : "6px"
     })     
     c.bind(".ddContentItem:hover", {
       "text-decoration" : "underline",
       "color" : "#222"
     })
  },
  setActive : function(itemid) {
      var item = _data(itemid);
      this.addClass("area");
      var p = item.parent(), cnt=0;
      while(p) {
        cnt++;
        p = p.parent();
      }
      cnt--;
      if(cnt<4) cnt = 0;
      this.sendMsg("moveToLevel", cnt*0.20);    
    
      if(item && item.hasOwn("items") && item.items.length() >= 0 ) {
         this._nextLevel.pushView( _e("deepAppleMenu", item.items))
         this.sendMsg("activeFolder", item);
         this.sendMsg("editTarget", item); 
         return;
      } else {
         this._nextLevel.pushView( _e("showFile", item))
         this.sendMsg("editTarget", item);
         this.sendMsg("activeFile", item);
         var p = item.parent();
         if(p.parent()) {
            this.sendMsg("activeFolder", item.parent().parent());
         } else {
            this.sendMsg("activeFolder", null);
         }
         
      }      
    
      if(this._activeItem) {
        if(this._activeItem==item) return;
        this._activeItem.set("active", false);
      }
      this._activeItem = item;
      this._activeItem.set("active", true);
      


  },  
  init: function() {
    this._toolBar = this.div();
    var content = this.div("ddContent");   
    
    this._contentArea = content;

    this._nextLevel = this.div("nextLevel");
    content.div("ddList").mvc( this.model(), function(item) {
        return _e("div", function() {
            item.set("active", false);
            this.addClass("ddContentItem");
            this.actionItem( item )
            if(item.get("active")) this.addClass("active");
            var me = this;
            item.on("active", function() {
              if(item.get("active")) {
                me.addClass("active");
              } else {
                me.removeClass("active");
              }
            });
            if(item.hasOwn("variants")) {
              var s = this.span("fa fa-clone");
              s.clickTo("showVariants", item);
              s.touchclick();
            }
          
            this.on("click", function() {
                if(item.get("active")) {
                  me.sendMsg("renameFile", me);
                } else {
                  me.sendMsg("setActive", item);
                }
            });
            // this.clickTo("setActive", item)
          
            this.on("dblclick", function() {
                this.sendMsg("openFile");
            })
            this.on("mouseenter", function() {
                me.addClass("me");
                me.sendMsg("dropTarget", item );
            });
            this.on("mouseleave", function() {
                me.removeClass("me");
            });          
            this.touchclick();
            this.drag( function(dv) {
                if(dv.start) {
                  me.sendMsg("dragStart", item );
                }
                if(dv.end) {
                  me.sendMsg("dragEnd", item );
                }
            })
        })
    });
    return content;
  }
});

_e().createClass("fileToolbar", {
    css : function(c) {
        c.bind(".area", {
          "width" : "100%",
          "background" : "#eee"
        })
        c.bind(".toolBtn", {
          "border" : "1px solid #aaa",
          "background-color" : "#aaa",
          "color" : "#333",
          "border-radius" : "0px",
          "padding" : "4px",
          "outline" : "none",
          "cursor" : "pointer",
          "background" : "linear-gradient(#fff,#eee)"          
        })
    },
    init : function() {
      this.addClass("area");
      this.button("toolBtn").text("+ Folder").clickTo("addFolder");
      this.button("toolBtn").text("+ File").clickTo("addFile");
      this.button("toolBtn").text("Open").clickTo("openFile");
      this.button("toolBtn").text("Copy").clickTo("copyFile");
      this.button("toolBtn").text("Delete").clickTo("deleteFile");
      this.button("toolBtn").text("Rename").clickTo("renameFile");
    }
});

_e().createClass("fullFileDisplay", {
    css : function(c) {
        c.bind(".area", {
            "width" : "100%",
            "color" : "#554"
        });
        c.bind(".msg", {
           "line-height" : 1,
           "font-size" : "3em",
           "text-align" : "center",
           "font-family" : "Arial"
        })
        c.bind(".msg button", {
           "padding" : "2em",
           "font-size" : "1.5em",
           "border" : "none"
        })
    },
    init : function() {
       this.addClass("area");
       this.div("msg",
             function() {
             this.h2().text("We could open with some app the file "+this.model().get("title"));
             this.button().text("Go back").on("click", function() {
                this.popView();
             });             
       });
    }
})

_e().createClass("fileExplorer", {
    css  : function(c) {
        c.bind(".explorer", {
           "width" : "100%",
           "background-color" : "#fff"
        })
        c.bind("input.editTitle", {
            width : "100%",
            "font-size" : "15px",
            "padding" : "4px"
        })
        c.bind(".backBtn", {
          "border" : "1px solid #aaa",
          "background-color" : "#aaa",
          "color" : "#333",
          "border-radius" : "10px",
          "padding" : "5px",
          "font-size" : "12px",
          "outline" : "none",
          "margin" : "5px",
          "cursor" : "pointer",
          "background" : "linear-gradient(#fefefe,#e7e7e7)"          
        })        
        c.bind(".variantsHead", {
           "background" : "#676767",
           "color" : "white",
           "font-family" : "Arial",
           "font-size" : "1.2em",
           "padding" : "0.5em",
           "cursor" : "pointer"
        });
    },
    addFile : function() {
      if(!this._activeFolder) {
          var newName = prompt("Give new name to file");
          if(newName) {
              this.model().push(     { title : newName , 
                                      icon : "fa fa-file", 
                                      viewClass : "dataView1", 
                                      "active" : false
              });// move to index 0
              var list = this.model();
              var lastItem = list.at(list.length()-1);
              lastItem.moveToIndex(0);
          }        
      }
      if(this._activeFolder && this._activeFolder.items) {
          var newName = prompt("Give new name to file");
          if(newName) {
              this._activeFolder.items.push(     { title : newName , 
                                                   icon : "fa fa-file", 
                                                   viewClass : "dataView1", 
                                                   "active" : false
              });// move to index 0
              var list = this._activeFolder.items;
              var lastItem = list.at(list.length()-1);
              lastItem.moveToIndex(0);
          }
      }
    }, 
    addFolder : function() {
      if(!this._activeFolder) {
          var newName = prompt("Give new name to folder");
          if(newName) {
              this.model().push(     { title : newName , 
                                      icon : "fa fa-folder", 
                                      viewClass : "dataView1", 
                                      "active" : false, items : []
              });// move to index 0
              var list = this.model();
              var lastItem = list.at(list.length()-1);
              lastItem.moveToIndex(0);
          }        
      }
      if(this._activeFolder && this._activeFolder.items) {
          var newName = prompt("Give new name to folder");
          if(newName) {
              this._activeFolder.items.push(     { title : newName , 
                                                   icon : "fa fa-folder", 
                                                   viewClass : "dataView1", 
                                                   "active" : false, items : []
              });// move to index 0
              var list = this._activeFolder.items;
              var lastItem = list.at(list.length()-1);
              lastItem.moveToIndex(0);
          }
      } else {
        console.log(this._activeFolder);
        // alert(this._activeFolder.get("title")); 
      }
    },
    openFile : function(itemid) {

        if(this._activeFile)
          this._contentArea.pushView(_e("fullFileDisplay", this._activeFile))
    },
    renameFile : function(elem) {
        if(this._editTarget) {
          // ?? can open up window ??
          if(elem) {
            var item = this._editTarget;
            var origElement = elem;
            var newElem = _e("div", function() {
                var me = this;
                setTimeout(
                    function() {
                      var inp = me.input("editTitle");
                      inp.val(item.get("title")).on("blur", function() {
                          var newFileName = inp.val();
                          if(newFileName.length>0) item.set("title", newFileName);
                          newElem.replaceWith( origElement );
                      }).focus();
                      inp._dom.select();
                      me._dom.addEventListener("click", function(e) {
                         // e.stopPropagation();

                      })
                },1);
            });
            origElement.replaceWith( newElem );
            return;
          }
          var newName = prompt("Give new name to file");
          if(newName) {
              this._editTarget.set("title", newName);
          }
        }
    },   
    copyFile : function() {
        if(this._editTarget) {
          alert("Should copy file "+this._editTarget.get("title"));
        }
    },  
    deleteFile : function() {
        if(this._editTarget) {
          this._editTarget.remove();// alert("Should delete file "+this._activeFile.get("title"));
        }
    },
    activeFolder : function(itemid) {
      console.log("activeFolder ", itemid);
      if(!itemid) {
         this._activeFolder = null;
         return;
      }
      var item = _data(itemid);
      if(this.model().parent() == item) {
         this._activeFolder = null;
         return;
      }
      this._activeFolder= _data(itemid);
    }, 
    activeFile : function(itemid) {
      this._activeFile = _data(itemid);
    },
    editTarget : function(itemid) {
      this._editTarget = _data(itemid);
    },  
    moveToNext : function() {
      if(this._editTarget) {
        return; // 
        var ii = this._editTarget.indexOf();
        var p = this._editTarget.parent();
        if(p) {
          if(p.at(ii+1)) {
            this.sendMsg("editTarget" , p.at(ii+1));
          }
        }
      }
    },
    dragEnd : function() {
        if(this._dropTarget && this._dropTarget != this._dragItem) {
            if(this._dragItem.items) {
              var p = this._dropTarget;
              while(p) {
                if(p==this._dragItem) return;
                p = p.parent();
              }
            }
            if(this._dropTarget.items && this._dragItem.items) {
                // folder into folder
                this._dropTarget.items.push( this._dragItem.toPlainData());
                this._dragItem.remove();
                var list = this._dropTarget.items;
                var lastItem = list.at(list.length()-1);
                lastItem.moveToIndex(0);     
                return;
            } 
            var targetFolder;
            var targetIndex = 0;
            if(!this._dropTarget.items) {
              targetIndex = this._dropTarget.indexOf();
              targetFolder = this._dropTarget.parent();
            }
            if(this._dropTarget.items) targetFolder = this._dropTarget.items;
            if(!targetFolder) targetFolder = this.model();
            if(targetFolder && this._dragItem) {
               targetFolder.push( this._dragItem.toPlainData());
               this._dragItem.remove();
                var list = targetFolder;
                var lastItem = list.at(list.length()-1);
                lastItem.moveToIndex(targetIndex);              
            }
        }
    },
    dropTarget : function(itemid) {
        var item = _data(itemid);
        if(item.getID()) {
          this._dropTarget = item;
        }
        // this._infoDiv.text("drop target was "+item.get("title"));
    },  
    dragStart : function(itemid) {
        var item = _data(itemid);
        this._dragItem = item;
        this._dropTarget = null;
        // this._infoDiv.text("started dragging "+item.get("title"));
    },
    ctrlDown : function() {
        this._ctrlDown = true;
    },
    ctrlUp : function() {
        this._ctrlDown = false;
    },   
    shiftDown : function() {
        this._shiftDown = true;
    },
    shiftUp : function() {
        this._shiftDown = false;
    },  
    moveToLevel : function(newLevel) {
        // content._dom.style.marginLeft = "-30px";
        var me = this;
        if(!me._folderLevel) me._folderLevel = 0;
        if(newLevel == me._folderLevel) return;
  
        var cDom = this._contentArea._dom;
        var oldLevel = me._folderLevel;
        me._folderLevel = oldLevel;
        var w = 200;
        console.log(newLevel);
        later().ease("pow", 400, function(t) {
            cDom.style.marginLeft =  -1*(oldLevel*(1-t)*w + newLevel*(t)*w)+"px";
        }, function() {
            me._folderLevel = newLevel;
        })
    },
    showVariants : function(itemid) {
        var item = _data(itemid);
        if(itemid && item && item.variants) {
          var me = this, oldModel;
          this._mainView.pushView(_e("div", function() {
              this.div("variantsHead", function() {
                  this.span("fa fa-arrow-circle-left");
                  this.span().text(" ");
                  this.span().text( "variants of file "+item.get("title"));
              }).on("click", function() {
                  this.popView();
              });
              this.fileExplorer(item.variants);
          }));
        }
    },
    init : function() {
      
        // the main view...
        this._mainView = this;
      
        this._activeModel = this.model();
        this._dragList = [];
        this.addClass("explorer");
        this.div().fileToolbar();
        this._infoDiv = this.div();
        var content = this.div("fileBrowser");
        
        content.deepAppleMenu( this.model() );
        this._contentArea = content;
        document.onkeydown = checkKeyDown;
        document.onkeyup   = checkKeyUp;
        var me = this;
        function checkKeyUp(e) {
            e = e || window.event;
            console.log("Up "+e.keyCode);
            if(e.keyCode == 16) {
                me.sendMsg("shiftUp");
            }  
            if(e.keyCode == 9)  me.sendMsg("moveToNext");
            if(e.keyCode == 17)  me.sendMsg("ctrlUp");
            if(e.keyCode == 50)  me.sendMsg("renameFile");
                       
        }
        function checkKeyDown(e) {
            e = e || window.event;
            console.log(e.keyCode);
            if(e.keyCode == 16)  me.sendMsg("shiftDown");
            if(e.keyCode == 17)  me.sendMsg("ctrlDown");
        }      
    }
})

```

### ocControls::constructor( main )

```javascript

this.fileExplorer();
```
        


   


   




