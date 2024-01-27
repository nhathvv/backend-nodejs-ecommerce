// Change status
const btnChangeStatus = document.querySelectorAll("[button-change-status]")
const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("data-path")
console.log(path)
if(btnChangeStatus.length > 0) {
    btnChangeStatus.forEach(button => {
        button.addEventListener("click", ()=> {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChage = statusCurrent === "active" ? "inactive" : "active";
            const action = `${path}/${statusChage}/${id}?_method=PATCH`
            console.log(action);
            formChangeStatus.action = action;
            formChangeStatus.submit()
        })
    })
}
// End change status
// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]")
const formDeleteItem = document.querySelector("#form-delete-item")
if(buttonsDelete.length > 0) {
    buttonsDelete.forEach(button => {
        button.addEventListener("click", ()=> {
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không ?")
            if(isConfirm) {
                const id = button.getAttribute("data-id")
                const path = formDeleteItem.getAttribute("data-path")
                const action = `${path}/${id}?_method=DElETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
// End delete item