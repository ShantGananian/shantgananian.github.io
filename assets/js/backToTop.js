const back2toplink = document.getElementById('idbackTotop') //idbackTotop is the anchor id defined within the default.html
const onScroll = () => {
  // I removed the next two lines and clearly added document.body 
  // in addition to document.documentElement instead, because the 
  // button stopped showing after 2 weeks

  // const scroll = document.documentElement.scrollTop
  // if (document.documentElement.scrollTop > 300) {

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) { //the button is active after scrolling down 300px
    back2toplink.classList.add("active");
  } else {
    back2toplink.classList.remove("active")
    
    // To remove the # from he URL after returning to top (from https://benborgers.com/posts/js-remove-hash)
   // location.hash = ""  // To clear the URL hash, however this leaves a # at the end of the URL
   // history.replaceState("", "", window.location.pathname) // To remove the #, this line overwrites the URL with the current URL, minus the #
   
   // (from https://gist.github.com/azu/36ba5a80feb857c77a3a)
   // (from https://www.geeksforgeeks.org/difference-between-window-location-href-window-location-replace-and-window-location-assign-in-javascript/)
   // Window.location is a property that returns a Location object with information about the document’s current location.
   // This Location object represents the location (URL) of the object it is linked to
   // The href property on the location object stores the URL of the current webpage.
   // The replace function is used to navigate to a new URL without adding a new record to the history.
   var noHashURL = window.location.href.replace(/#.*$/, ''); //a variable that equals to the URL after clearing anything from and including the URL hash till the ending position of the URL
   window.history.replaceState('', document.title, noHashURL)  //replacing the current URL in the history with the cleared URL

  }
}
window.addEventListener('scroll', onScroll)