function goofy1() {
    let images = document.querySelectorAll("img");
  
    for(let i = 0; i < images.length; i++) {
      images[i].src = "http://www.reactiongifs.com/r/2013/07/running.gif";
      images[i].alt = "three cute puppers!"
    }
  }
  
  goofy1();
  
  
  
  function goofy2() {
    let pTags = document.querySelectorAll("p");

    for(let i = 0; i < pTags.length; i++) {
        pTags[i].textContent = pTags[i].textContent.toUpperCase();
    }
  
    // Using for loop
    // change all textContent to toUpperCase 
  }
  
  goofy2();
  