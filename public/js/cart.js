// Update quantity
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if(inputsQuantity) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e)=> {
            const productId = input.getAttribute("product-id");
            const quantity = e.target.value;
            window.location.href = `/cart/update/${productId}/${quantity}`;
        })
    })
}
// End update quantity