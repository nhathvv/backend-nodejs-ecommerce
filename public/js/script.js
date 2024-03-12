// Alert 
const showAlert = document.querySelector("[show-alert]")
const closeAlert = document.querySelector("[close-alert]")
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    setTimeout(()=> {
        showAlert.classList.add("alert-hidden");
    },time)
    closeAlert.addEventListener("click",()=> {
        showAlert.classList.add("alert-hidden");
    })
}
// End alert