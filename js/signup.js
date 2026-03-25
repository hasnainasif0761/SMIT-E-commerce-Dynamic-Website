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
  createUserWithEmailAndPassword(auth,semail,spassword)
  .then((userCredential)=>{
    const user = userCredential.user;
    console.log(user);
    alert("User Created Successfully");
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