import {
    getDatabase,
    initializeApp,
    firebaseConfig,
    ref,
    set
} from './firebaseAuth.js'

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const addProducts = document.getElementById('addProduct');

addProducts.addEventListener('submit', addProductFunc);

function addProductFunc(e){
    e.preventDefault(); // ✅ important

    let userId = Date.now(); // ✅ unique id

    const name = document.getElementById('title').value;
    const proDsc = document.getElementById('description').value;
    const proImg = document.getElementById('liveUrl').value;
    const proPrice = document.getElementById('proPrice').value;

    set(ref(database, 'Products/' + userId), {
        productName: name,
        productDsc: proDsc,
        productImage: proImg,
        productPrice: proPrice
    })
    .then(()=>{
        alert('Added Successfully');
    })
    .catch((error)=>{
        console.log(error);
        alert('Error aa gaya');
    });
}