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

/* Search */
const formSearch = document.querySelector("#form-search")
if(formSearch) {
    formSearch.addEventListener("submit", (e)=> {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        const url = new URL(window.location.href);
        if(keyword) {
            url.searchParams.set("keyword",keyword)
        }else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// Pagination
const btnPagination = document.querySelectorAll('[button-pagination]')
if(btnPagination) {
    btnPagination.forEach(btn => {
        btn.addEventListener("click", ()=> {
            const url = new URL(window.location.href);
            const page = btn.getAttribute("button-pagination")
            if(page) {
                url.searchParams.set("page",page)
            }else {
                url.searchParams.delete("page")
            }
            window.location.href = url.href
        })
    })
}
//End Pagination