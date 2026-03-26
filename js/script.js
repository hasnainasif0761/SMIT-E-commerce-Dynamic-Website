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

bgIcon.addEventListener('click',()=>{
    sidebar.classList.toggle('active');
})

closebar.addEventListener('click',()=>{
    sidebar.classList.remove('active');
})

// ------------------ Add to card Logic Section ---------------
const addtocart = document.querySelectorAll('.bg')
const convertArray = Array.from(addtocart);

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

    const cardItem = productBox.querySelector('.product-title');
    for(let items of cardItem){
        if(items.textContent == productTitle){
            alert('This Items is Already in the cart');
            return;
        }
    }

}







