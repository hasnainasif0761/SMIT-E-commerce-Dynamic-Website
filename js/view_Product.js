import {
    getDatabase,
    initializeApp,
    firebaseConfig,
    ref,
    onValue
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

        container.innerHTML += `
            <div class="bg-white shadow-lg rounded-xl p-3 hover:scale-105 transition">
                <img src="${data.productImage}" 
                     class="w-full h-40 object-cover rounded-lg">

                <h2 class="text-lg font-bold mt-2">
                    ${data.productName}
                </h2>

                <p class="text-sm text-gray-600">
                    ${data.productDsc}
                </p>

                <p class="text-green-600 font-bold mt-2">
                    Rs ${data.productPrice}
                </p>
            </div>
        `;
    });
});