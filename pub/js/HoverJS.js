
"use strict"; 

(function(global, document) { 


	function Hover() {}
    
    let _savedItems = [];
    
    // restores pop-up list from sessionStorage
    if (sessionStorage.getItem("list")) {

        // Restore contents 
         const div= document.createElement("div")
         div.innerHTML = sessionStorage.getItem("list")
         document.body.append(div)
        
         _draggable(document.getElementById("checkboxes"))
         _deleteList()
         sessionStorage.setItem('list', document.getElementById("checkboxes").outerHTML) 
      }
      
      // restores _savedItems list from sessionStorage
      if (sessionStorage.getItem('items')){
        let temp = JSON.parse(sessionStorage.getItem('items'))

        for (let i = 0; i < temp.length; i++) {
          const div = document.createElement('div');
          div.innerHTML = temp[i];
          _savedItems.push(div.childNodes[0])
        }

      }
    
    //helper to hide iframe
    function _noFrame(obj){
        let frame =  document.getElementById(obj)
      
        if (frame !== null ){
          frame.style.display = 'none'
          // keep frame open if cursoe if in the preview
          document.getElementById(obj).onmouseover=function(){frame.style.display = 'block'}
          //keep frame open if cursor is on button
          document.getElementById("button"+obj).onmouseover=function(){frame.style.display = 'block'}
             
            }
     }

    // sets onclick delete on close button
    function _deleteList(){
      document.getElementById('close').onclick = function(){
          this.parentNode.parentNode.removeChild(this.parentNode);
          sessionStorage.removeItem('list');
          sessionStorage.removeItem('items');
          _savedItems=[];

      };
      
  };


  // draggable function adopted from https://codepen.io/Shikkediel/pen/VLZKor
  function _draggable(object){

    let initX =0, initY=0, firstX=0, firstY=0;

    object.addEventListener('mousedown', function(e) {

      e.preventDefault();
      initX = this.offsetLeft;
      initY = this.offsetTop;
      firstX = e.pageX;
      firstY = e.pageY;

      this.addEventListener('mousemove', dragIt, false);

      window.addEventListener('mouseup', function() {
        object.removeEventListener('mousemove', dragIt, false);
      }, false);

    }, false);
    
    function dragIt(e) {
      let y = this.style.l
      this.style.left = initX+e.pageX-firstX + 'px';
      this.style.top = initY+e.pageY-firstY + 'px';
    }
  }

   // sets up the hover preview for an element
   function _setFrameNow(obj,width, height){
 
    // checks if the preview does not exist
    if (document.getElementById(obj+"a") === null) {

        // create box that will contain the iframe
        const frame = document.createElement("div")
        frame.className ="box"
        frame.id = document.getElementById(obj).id + "a"
        const  postx = document.getElementById(obj).offsetLeft
        frame.style.marginLeft = postx + "px"
        
        // create iframe
        const ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", document.getElementById(obj).href);
        ifrm.className = "iframe"
        ifrm.onmouseout = function(){_noFrame(obj+"a")}
        ifrm.style.height = height + "px"
        ifrm.style.width = width + "px"

        frame.append(ifrm)
        
        // create save buttton and append it to iframe
        const button = document.createElement("button")
        button.className = 'iframe-button'
        button.id = 'button'+ obj + "a"
        button.innerHTML = "Save"
        button.onclick = function(e){ 
          e.preventDefault()
          Hover.prototype.createList(obj)
          
        }
      
        ifrm.appendChild(button)
        frame.appendChild(button)

        document.getElementById(obj).append(frame)

    }
    
    // preview already exists so show it
    else{document.getElementById(obj+"a").style.display = "block"}
    
}
  
	Hover.prototype = {
        
        // sets up the hover preview for an element
        setFrame: function(obj,width = 400, height= 400){
          
          // wait for 0.5 sec before showing the preview to prevent prewview showing accidentally
          let timer = setTimeout(function(){_setFrameNow(obj,width, height);}, 500);

          document.getElementById(obj).onmouseout = function(){
            clearTimeout(timer);

            // hide hover preview when cursor moves away from hyperlink
            _noFrame(obj+"a");
        }
           
            
        },
        
       // creates the pop-up list
       createList: function(obj= '') {
            
            // checks if pop-up lists does not exist
            if (document.getElementById("checkboxes") === null){
                 
                // creates pop-up list
                const container = document.createElement("div")
                container.id = "checkboxes"
                
                // creates close button
                const close = document.createElement('span')
                close.id = 'close'
                close.appendChild(document.createTextNode("x"));

                container.append(close)
                
                // creates 'saved'label
                const lbl = document.createElement('label');  
                lbl.id= 'save-label';
                lbl.appendChild(document.createTextNode("Saved"));
                let linebreak = document.createElement("br");
                lbl.appendChild(linebreak);
        
                container.append(lbl)
          
                document.body.appendChild(container)
                
                // delete list when close button is clicked
                _deleteList()
            }
            
            // if obj param is an element id then create the checkbox
            if (obj !== '') {Hover.prototype.createCheckbox(obj)}
        
            // makes pop-up list draggable
            _draggable(document.getElementById("checkboxes"))
            
            // store the pop-up list
            sessionStorage.setItem('list', document.getElementById("checkboxes").outerHTML)
  
          },
        
         createCheckbox: function(obj) {
          
            // checks that pop-up list exists
            if(document.getElementById("checkboxes") !== null){

                let checkId = obj + "check";
                const duplicate = (element) => element.id === checkId;
                 
                // prevents duplicate entries
                if(!_savedItems.some(duplicate)){
                  const container = document.getElementById("checkboxes");
                  
                  // creates item with hyperlink
                  const link = document.createElement('a');
                  link.title = obj;
                  link.innerHTML = '<font size="5px">'+obj+'</font>';
                  link.href = document.getElementById(obj).href;
                  link.target="_blank";
                  
                  
                  //creates checkbox
                  const label = document.createElement('div');
                  label.className = 'item'
                  label.id = obj + "check"
                  label.innerHTML = `<input type="checkbox" onclick="Hover.prototype.removeCheckbox(${label.id})" />`;
                  label.append(link)
                  container.appendChild(label);
                  
                  // saves item in list
                  _savedItems.push(label)
                  
                  //format to store in sessionStorage
                  let stringSavedItems = _savedItems
                  stringSavedItems = stringSavedItems.map(item => item.outerHTML)
                  sessionStorage.setItem('items', JSON.stringify(stringSavedItems))

                }         
            } 
            
            // if list doesn't exist create it first
            else{Hover.prototype.createList(obj)}
          },
           
          // delete checkbox 
          removeCheckbox: function(obj) {
             
            //remove from list
            _savedItems = _savedItems.filter(item => item.id !== obj.id);
             
            //remove from DOM
            const items = document.querySelectorAll('.item');
            items.forEach(x => {
              if(x.querySelector('input').checked){
                x.remove()}
            })

            sessionStorage.setItem('list', document.getElementById("checkboxes").outerHTML)
            
            //format to store in sessionStorage
            let stringSavedItems = _savedItems
            stringSavedItems = stringSavedItems.map(item => item.outerHTML)
            sessionStorage.setItem('items', JSON.stringify(stringSavedItems))

        },
        
        //show pop-up list
        showList: function(){
            if(document.getElementById("checkboxes") !== null){
                document.getElementById("checkboxes").style.display = "block";
            }
        },
        
        //hide pop-up list
        hideList: function(){
            if(document.getElementById("checkboxes") !== null){
                document.getElementById("checkboxes").style.display = "none";
            }
        },

        getTotalItems: function() { return _savedItems.length} ,

        getItemsList: function() { return _savedItems},

       listBackgroundColor: function(color){
        
        if(document.getElementById("checkboxes") !== null){
          let reg = /^#[0-9a-fA-F]{6}$/; //from https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
          if (reg.test(color)){
            document.getElementById("checkboxes").style.backgroundColor = color;   
          }
      }

       }
        
	}

	global.Hover = global.Hover || Hover

})(window, window.document); 



