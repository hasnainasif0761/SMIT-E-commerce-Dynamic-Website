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