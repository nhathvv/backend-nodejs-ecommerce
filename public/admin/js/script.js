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

// Change multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click",()=> {
        if(inputCheckAll.checked) {
            inputIds.forEach(input => {
               input.checked = true;
            })
        }else {
            inputIds.forEach(input => {
              input.checked = false;
             })
        }
    })

    inputIds.forEach(input => {
        input.addEventListener("click",() => {
            const countInputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if(countInputChecked === inputIds.length) {
                inputCheckAll.checked = true;
            }else {
                inputCheckAll.checked = false;
            }
        })
    })

}
// End change multi
// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit",(e) => {
        e.preventDefault()
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length > 0) {
            let ids =[]
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            })
            inputIds.value = ids.join(",")
            formChangeMulti.submit();
        }else {
            alert("Vui lòng chọn bản ghi")
        }
    })
}
// End form change multi