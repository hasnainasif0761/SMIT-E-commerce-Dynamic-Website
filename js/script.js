const ham = document.getElementById('hamburger');
const navlist = document.querySelector('.navList');

let Hamflag = false;

ham.addEventListener('click',()=>{
    navlist.classList.toggle('openHam');
    if(Hamflag == false){
        ham.innerHTML = `<i class="ri-close-line  text-3xl text-white"></i>`
        Hamflag = true
    }else
    {
        ham.innerHTML = `<i class="ri-menu-fill  text-3xl text-white"></i>`
        Hamflag = false
    }
})

// ------------------------- Website Sidebar Section --------------------------------
const sidebar = document.querySelector('.sidebar');
const bgIcon = document.querySelector('.bag-icon')
const closebar = document.querySelector('.closebar');

bgIcon.addEventListener('click',(e)=>{
    e.stopPropagation(); // 👈 important
    sidebar.classList.toggle('active');
})

sidebar.addEventListener('click',(e)=>{
    e.stopPropagation();
})

closebar.addEventListener('click',(e)=>{
    e.stopPropagation(); // 👈 optional but safe
    sidebar.classList.remove('active');
})

document.addEventListener('click',()=>{
    sidebar.classList.remove('active');
})

// ------------------ Add to card Logic Section ---------------
const addtocart = document.querySelectorAll('.bg')
const convertArray = Array.from(addtocart);
const cartContent = document.querySelector('.card-content');

convertArray.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const product = btn.closest('.product-box');
        addtocartFunc(product)
    })
})

const addtocartFunc = (productBox) =>{
    const productImgSrc = productBox.querySelector('img').src;
    const productTitle = productBox.querySelector('.product-title').textContent
    const productPrice = productBox.querySelector('.product-price').textContent
    const cartItem = cartContent.querySelectorAll('.product-cart-title');
    for(let items of cartItem){
        if(items.textContent == productTitle){
            alert('This Items is Already in the cart');
            return;
        }
    }

    const cardBox = document.createElement('div');
    cardBox.className = `cart-box w-[90%] h-[120px] flex items-center bg-white shadow-lg border mx-auto py-2 pb-3 rounded-lg`;
    cardBox.innerHTML = `
        <img src="${productImgSrc}" class="w-[16%] rounded-lg ml-3 shadow-lg">
        <div class="w-[70%] ml-2 h-[80px] mt-3 flex">
        <div class="w-[75%]">
        <p class="product-cart-title text-[15px] text-black ml-2 mt-1 truncate max-w-[160px]">${productTitle}</p>
        <p class="cart-price text-[13px] text-black ml-2 mt-2">${productPrice}</p>
    </div>
    <div class="w-[25%]">
        <i class="ri-close-line text-3xl ml-10 text-black hover:text-red-500 cursor-pointer remove-cart"></i>
    <div class="card-qunatity mt-3">
        <button id="decrement">-</button>
    <div class="number">1</div>
        <button id="increment">+</button>
     </div>
      </div>
    </div>
    `
    cartContent.appendChild(cardBox);
    updateTotalPrice()
    Toastify({
        text: "Product Add Successfully 🎉",
        duration: 3000,
        gravity:'bottom',
        position: 'right',
        style: {
            background: 'green'
        }
    }).showToast()
    cardBox.querySelector('.remove-cart').addEventListener('click', (e) => {
        e.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                cardBox.remove();
                updateCartCount(-1);
                updateTotalPrice();

                Swal.fire({
                    title: "Deleted!",
                    text: "Item removed successfully",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }

        });
    });

    cardBox.querySelector('.card-qunatity').addEventListener('click',(e)=>{
        e.stopPropagation();
        const quantityNumber = cardBox.querySelector('.number');
        const decrement =  cardBox.querySelector('#decrement');
        const increment = cardBox.querySelector('#increment');
        let quantity = quantityNumber.textContent;

        if(e.target.id === 'decrement' && quantity > 1){
            quantity--;
            if(quantity == 1){
                decrement.style.color = 'red';
            }
        }else if(e.target.id === 'increment'){
            quantity++
        }
        quantityNumber.textContent = quantity
        updateTotalPrice();
    })
    updateCartCount(1)
}

function updateTotalPrice(){
    const totalPrice = document.querySelector('.total-price');
    const cartbox = document.querySelectorAll('.cart-box');
    let total = 0.00;
    cartbox.forEach((cartBox)=>{
        const cartPrice = cartBox.querySelector('.cart-price')
        const price = parseFloat(cartPrice.textContent.replace('£',''));
        const quantityElement = cartBox.querySelector('.number');
        const quantity = parseFloat(quantityElement ? quantityElement.textContent : "1") || 1;

        total += price * quantity
    })
    totalPrice.textContent = `£ ${total}`
}

let currentItemCount = 0;
const updateCartCount = (change) =>{
    const cartItemCountBedge = document.querySelector('.cart-item');
    currentItemCount += change
    if(currentItemCount > 0){
        cartItemCountBedge.textContent = currentItemCount
    }else
    {
        cartItemCountBedge.textContent = '0';
    }
}

let buyNow = document.getElementById('buyNow');
buyNow.addEventListener('click',()=>{
    const cartBox = cartContent.querySelectorAll('.cart-box');
    if(cartBox.length === 0){
         alert('Your Cart is Empty. Please Add item to your cart and after buying');
         return   
    }
    cartBox.forEach(carrox=>carrox.remove());
    cartItem = 0;
    updateTotalPrice()
    updateCartCount(0);
    alert('Thank you for your Purchase !')
    updateCartCount(0);
    document.querySelector('.cart-item').textContent = 0;
})




