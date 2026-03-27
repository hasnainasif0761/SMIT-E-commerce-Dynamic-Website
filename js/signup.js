import {
  initializeApp,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  firebaseConfig
} from './firebaseAuth.js'

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // SignUp Btn Variable
  let signUpBtn = document.getElementById("signupBtn");

  // SignUp Btn Variable
  let googleBtn = document.getElementById("googleBtn");

  // SignUp Btn Events 
  signUpBtn.addEventListener('click',signFunc);

  // Google Btn Events
  googleBtn.addEventListener('click',googleFunc);


// SignUp Form Function
function signFunc(event){
  event.preventDefault();
  let semail = document.getElementById("semail").value;
  let spassword = document.getElementById("spassword").value;
  if(spassword.length > 6){
  createUserWithEmailAndPassword(auth,semail,spassword)
  .then((userCredential)=>{
    const user = userCredential.user;
    console.log(user);
        Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Signed Up successfully"
    }).then(()=>{
      window.location.href = './login.html';
    })
    document.getElementById('semail').value = ''
    document.getElementById('spassword').value = ''
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    document.getElementById('semail').value = ''
    document.getElementById('spassword').value = ''
  })
}else
{
Swal.fire({
  icon: "error",
  title: "Invalid Password",
  text: "Your password must be at least 6 characters long.",
  confirmButtonText: "Try Again",
  confirmButtonColor: "#e74c3c",
  background: "#0f172a",
  color: "#fff",
  backdrop: `rgba(0,0,0,0.7)`,
  showClass: {
    popup: "animate__animated animate__fadeInDown"
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutUp"
  }
});
}
}


// Google Authentication Function
function googleFunc(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
  .then((result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const isNewUser = result._tokenResponse.isNewUser;
    if(isNewUser){
      console.log('user=>',user.email);
      alert('New User Registration Successfully');
    }else{
      console.log('user is Already register');
      alert('User is Already register 💥')
    }
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('code Error=>',errorCode)
    console.log('Message Error=>',errorMessage)
  });
}

// Hide and Show password toggle
let showpass =  document.getElementById('showpass');

showpass.addEventListener('click',()=>{
    let lpass = document.getElementById('spassword');
    if(lpass.type == 'password'){
        lpass.type = 'text';
        showpass.classList.remove('fa-eye');
        showpass.classList.add('fa-eye-slash')
    }else{
        lpass.type = 'password';
        showpass.classList.remove('fa-eye-slash')
        showpass.classList.add('fa-eye');
    }
})