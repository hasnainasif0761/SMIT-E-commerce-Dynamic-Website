let checkAuth = sessionStorage.getItem('login_admin');

if(!checkAuth){
    window.location.href = 'login.html'
}
// Basic Js Knowledge
const logout = document.getElementById('logout');
const links = document.querySelectorAll('.sideLink');
const iframeContent = document.getElementById('inner-content'); 

logout.addEventListener('click',()=>{
    sessionStorage.removeItem('login_admin');
    window.location.href = 'login.html'
})


links.forEach((li)=>{
    li.addEventListener('click',()=>{
    
        links.forEach((item)=>{
            item.classList.remove('active')
        })
        
        li.classList.add('active');

        const page = li.getAttribute('data-page');

        iframeContent.src = page

    })
})

window.addEventListener("message",event=>{
    if(event.data === "projectAdded"){
          Toastify({
            text: "Project Added Successfully 💥",
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            stopOnFocus: true,
            style: {
              background: "green"
                }
        }).showToast();
    }else{
        console.log('Erros');
    }
})

let ham = document.getElementById('ham');
let sidebar = document.getElementById('sidebar');

ham.addEventListener('click', function(e){
    e.stopPropagation();
    sidebar.classList.remove('hidden');
});

sidebar.addEventListener('click', function(e){
    e.stopPropagation();
});

document.addEventListener('click', function(e){
    if(!sidebar.classList.contains('hidden')){
        sidebar.classList.add('hidden');
    }
});