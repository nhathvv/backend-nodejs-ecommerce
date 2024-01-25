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