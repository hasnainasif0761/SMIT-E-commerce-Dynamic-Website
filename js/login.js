import {
  initializeApp,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  firebaseConfig,
signInWithEmailAndPassword
} from './firebaseAuth.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Varaible
const loginBtn = document.getElementById('loginBtn');

// Addeventlistner Event for login btn
loginBtn.addEventListener('click',loginFun);

// Animtion Variable
let animate = document.getElementById('main_div');

// Login Function 
function loginFun(e){
    e.preventDefault();
    
    let lemail = document.getElementById('lemail').value;
    let lpassword = document.getElementById('lpassword').value;
    signInWithEmailAndPassword(auth,lemail,lpassword)
    .then((userCredential)=>{
        const user = userCredential.user;
    // Store Data in Sessions
      sessionStorage.setItem('users', JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      }));        
        window.location.href = 'dashboard.html';
        sessionStorage.setItem('login_admin',user.email)
        document.getElementById('lemail').value = '';
        document.getElementById('lpassword').value = '';
    }).catch((error)=>{
        const codeError = error.code;
        const errorMessage = error.message;
        console.log('Error Message=>',errorMessage);
        animate.classList.remove("animate__animated","animate__shakeX");
        void animate.offsetWidth;
        animate.classList.add("animate__animated","animate__shakeX");
    })
}

let googleBtn = document.getElementById('googleBtn');

googleBtn.addEventListener('click',googleFunc)

function googleFunc(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
  .then((result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // Store Data in Sessions
    sessionStorage.setItem('users', JSON.stringify({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL
    }));
    window.location.href = './dashboard.html'
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
    let lpass = document.getElementById('lpassword');
    if(lpass.type == 'password'){
        lpass.type = 'text';
        console.log(lpass)
        showpass.classList.remove('fa-eye');
        showpass.classList.add('fa-eye-slash')
    }else{
        lpass.type = 'password';
        console.log(lpass)
        showpass.classList.remove('fa-eye-slash')
        showpass.classList.add('fa-eye');
    }
})