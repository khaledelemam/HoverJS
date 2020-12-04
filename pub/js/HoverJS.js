

// showList shows current list
// hideList hides current list
// setFrame need id 

// createList() optional input, can create empty list, need id to create a list with a checkbox
//createChk () needs id , creates checkbox with hyperlink

// noFrame helper to hide iframe
// removeCheck helper to delete checkboxes



let savedItems = [];

const Item = function(name) {
	this.name = name;
}


function setFrame(obj){

    checkFrame =  document.getElementsByClassName("box")

    if (checkFrame === null  ||  document.getElementById(obj+"a") === null) {
    
        const frame = document.createElement("div")
        frame.className ="box"
        frame.id = document.getElementById(obj).id + "a"

       const  post = document.getElementById(obj).offsetLeft

       frame.style.marginLeft = post + "px"

        const ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", document.getElementById(obj).href);
        ifrm.className = "iframe"
        ifrm.onmouseout = function(){noFrame(obj+"a")}

        frame.append(ifrm)

        const button = document.createElement("button")
        button.className = 'iframe-button'
        button.id = 'button'+ obj + "a"
        button.onclick = function(){createList(obj)}
        button.innerHTML = "Save"

        ifrm.appendChild(button)

        frame.appendChild(button)

        document.body.appendChild(frame);

    }

    else{document.getElementById(obj+"a").style.display = "block"}

}


function noFrame(obj){
   
   frame =  document.getElementById(obj)

   if (frame !== null ){
       document.getElementById("button"+obj).onmouseover=function(){frame.style.display = 'block'}
        frame.style.display = 'none'
       }

}

function createList(obj= '') {
    
    let x = document.getElementById("checkboxes");

    if (x === null){
     
        const container = document.createElement("checkboxes")
        container.id = "checkboxes"

        const lbl = document.createElement('label');  
        
        lbl.appendChild(document.createTextNode("Saved"));
        linebreak = document.createElement("br");
        lbl.appendChild(linebreak);

        container.append(lbl)

        document.getElementsByClassName("box")[0].insertAdjacentElement("beforebegin", container)
    }

    if (obj !== '') {createCheck(obj)}
  }

  function createCheck(obj) {

    if(document.getElementById("checkboxes") !== null){

        const container = document.getElementById("checkboxes");
     
        const iframedoc = document.getElementById(obj).href;
        
        const a = document.createElement('a');
        const linkText = document.createTextNode(obj);

        savedItems.push(new Item(obj))
        
        a.title = obj;
        a.href = iframedoc;

        a.appendChild(linkText);

        const label = document.createElement('div');
        label.className = 'item'
        label.id = obj + "check"
        label.innerHTML = `<input type="checkbox" />`
        label.onclick = function(){removeCheck(obj)}
        label.append(a)
        
        container.appendChild(label);
        
    } 
  }

  function removeCheck(obj) {
     
    savedItems = savedItems.filter(item => item.name !== obj);
    const doc = document.querySelectorAll('.item');
    doc.forEach(x => {
     if(x.querySelector('input').checked){
       x.remove()
     }
    })
}

function showList(){
    if(document.getElementById("checkboxes") !== null){
        document.getElementById("checkboxes").style.display = "block";
    }
}

function hideList(){
    if(document.getElementById("checkboxes") !== null){
        document.getElementById("checkboxes").style.display = "none";
    }
}





