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

        const typeChange = e.target.elements.type.value
        if(typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa không ?");
            if(!isConfirm) {
                return;
            }
        }
        if(inputsChecked.length > 0) {
            let ids =[]
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`);
                }else {
                    ids.push(id);
                }
            })
            inputIds.value = ids.join(",")
            formChangeMulti.submit();
        }else {
            alert("Vui lòng chọn bản ghi")
        }
    })
}
// End form change multi
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
// Preview Image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e)=> {
       const file = e.target.files[0]
       if(file) {
        uploadImagePreview.src = URL.createObjectURL(file)
       }
    })
}
// End preview image