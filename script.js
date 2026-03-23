const ham = document.querySelector('.hamburger');
const navlist = document.querySelector('.navlist');

let Hamflag = false;

ham.addEventListener('click',()=>{
    navlist.classList.toggle('openHam');
    if(Hamflag == false){
        ham.innerHTML = `<i class="ri-close-line"></i>`
        Hamflag = true
    }else
    {
        ham.innerHTML = `<i class="ri-menu-fill class='text-3xl'"></i>`
        Hamflag = false
    }
})