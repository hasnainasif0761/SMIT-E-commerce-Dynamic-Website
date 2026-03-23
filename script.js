const ham = document.querySelector('.hamburger');
const navlist = document.querySelector('.navlist');

ham.addEventListener('click',()=>{
    navlist.classList.toggle('openHam');
})