

"use strict"; 


const hv = new Hover()

function examples() {	

    document.getElementById("cats").onmouseover = function() {hv.setFrame("cats")};
    document.getElementById("squirrels").onmouseover = function() {hv.setFrame("squirrels")};
    document.getElementById("raccoons").onmouseover = function() {hv.setFrame("raccoons")};	
}

examples()


