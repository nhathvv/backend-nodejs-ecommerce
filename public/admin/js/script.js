/* Button Status */
const buttonStatus = document.querySelectorAll('[button-status]');
buttonStatus.forEach(button => {
  const url = new URL(window.location.href);
  button.addEventListener("click", ()=> {
    const status = button.getAttribute("button-status")
    if(status) {
        url.searchParams.set("status",status)
    }else {
        url.searchParams.delete("status")
    }
    window.location.href = url.href
  })
   
})
/* End Button Status */