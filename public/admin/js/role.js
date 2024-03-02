// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]")
const formDeleteItem = document.querySelector("#form-delete-item")
if(buttonsDelete.length > 0) {
    buttonsDelete.forEach(button => {
        button.addEventListener("click", ()=> {
            const isConfirm = confirm("Bạn có muốn xóa không ?")
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