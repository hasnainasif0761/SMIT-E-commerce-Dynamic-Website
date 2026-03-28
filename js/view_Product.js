import {
    getDatabase,
    initializeApp,
    firebaseConfig,
    ref,
    onValue,
    remove
} from './firebaseAuth.js'

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const container = document.getElementById('productContainer');

// Fetch data
const productRef = ref(db, 'Products');

onValue(productRef, (snapshot) => {
    container.innerHTML = ""; // clear old data

    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const key = childSnapshot.key;
        container.innerHTML += `
            <div class="bg-white shadow-lg rounded-xl p-3 hover:scale-105 transition flex flex-col" data-id="${key}">
                <img src="${data.productImage}" 
                     class="productImg w-full h-40 object-cover rounded-lg">

                <h2 class="productName text-lg font-bold mt-2">
                    ${data.productName}
                </h2>

                <p class="productDesc text-sm text-gray-600 flex-grow">
                    ${data.productDsc}
                </p>

                <p class="productPrice text-green-600 font-bold mt-2">
                    Rs ${data.productPrice}
                </p>
                <div class="w-full flex justify-between mt-auto pt-2">
                    <button class="editBtn w-[40%] active:scale-95 rounded-[5px] bg-green-500 text-white py-2 px-2 border text-[13px]">Edit Product</button>
                    <button class="deleteBtn w-[55%] active:scale-95 rounded-[5px] bg-red-500 text-white py-2  border text-[13px]">Delete Product</button>
                </div>
            </div>
        `;
    });
    let modal = document.getElementById('editModal');
    let closeModal = document.getElementById('closeModal')
    container.addEventListener('click',(e)=>{
        if(e.target.classList.contains('editBtn')){
            const card = e.target.closest('.bg-white');
            editBtnFunc(card)
            modal.classList.remove('hidden');
            closeModal.addEventListener('click',()=>{
                modal.classList.add('hidden');
            })
        }
    })
    container.addEventListener('click',(e)=>{
        if(e.target.classList.contains('deleteBtn')){
            deleteFunc()
        }
    })
});

let EditInputCont = document.querySelector('.EditInputCont');
function editBtnFunc(cont){
    const editImg = EditInputCont.querySelector('.img');
    const editName = EditInputCont.querySelector('.name');
    const editDesc = EditInputCont.querySelector('.desc');
    const editPrice = EditInputCont.querySelector('.price');
    const editBtn = EditInputCont.querySelector('.editnowBtn');

    // UI Elements
    const getUiImg = cont.querySelector('.productImg');
    const getUiName = cont.querySelector('.productName');
    const getUiDsc = cont.querySelector('.productDesc');
    const getUiPrice = cont.querySelector('.productPrice');

    // Values
    editImg.value = getUiImg.src;
    editName.value = getUiName.innerText;
    editDesc.value = getUiDsc.innerText;
    editPrice.value = getUiPrice.innerText;

    editBtn.onclick = () => {


        getUiImg.src = editImg.value;
        getUiName.innerText = editName.value;
        getUiDsc.innerText = editDesc.value;
        getUiPrice.innerText = editPrice.value;

        editImg.value = '';
        editName.value = '';
        editDesc.value = '';
        editPrice.value = '';
        let modal = document.getElementById('editModal');
        modal.classList.add('hidden')
        alert('Your Product is Updated');
    }
}


// --------------------- I am Created Delete Function Code -------------------------------- //

function deleteFunc(){
    let id = deleteId;
    if(confirm('Are you Sure You Want to delete this Product')){
        remove(ref(db,'Product'+id))
        return
    }
}









