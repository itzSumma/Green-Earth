// LEVEL 1: Categories
async function loadCategories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  //  console.log(data.categories[0]);

  // run loop here and create new element
  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      "btn btn-outline w-full min-h-14 rounded-md hover:bg-green-400 active:bg-green-400 text-xl font-medium";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategory(category.id, btn);
    containerCategory.appendChild(btn);
  });
}
// ALL CONTAINER HERE
const containerCategory = document.getElementById("container-category");
const cardsGrid = document.getElementById("cards-grid");
const treeContainer = document.getElementById("tree-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTree = document.getElementById("all-tree-btn");
// Modal
const treeDetailsModal = document.getElementById("tree-details");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
// empty array
let cart =[];
const cartContainer = document.getElementById("cart-container")
//LEVEL-5 MODAL
async function openModal(treeId) {
  console.log(treeId); /// see the id
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plant = data.plants;
// console.log(plant,data)  // get id data on click
console.log(plant,"data")
  modalTitle.textContent = plant.name;
  modalImage.src = plant.image;
  modalCategory.textContent = plant.category;
  modalDescription.textContent = plant.description;
  modalPrice.textContent = plant.price;
  treeDetailsModal.showModal();
}
// LEVEL-4 BUTTON RENDERING
async function selectCategory(categoryId, btn) {
  console.log(categoryId, btn);
  showLoading(); // spinner load
  document
    .querySelectorAll("#container-category button,#all-tree-btn")
    .forEach((btn) => {
      btn.classList.remove("btn-success", "text-white");
    });
  btn.classList.add("btn-success", "text-black");

  // Button Fetch
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json();
  // console.log(data);
  displayTrees(data.plants);

  hideLoading(); //stop the spinner
}
// All tree button handler
allTree.addEventListener("click", function () {
  document
    .querySelectorAll("#container-category button,#all-tree-btn")
    .forEach((btn) => {
      btn.classList.remove("btn-success", "text-white");
    });
  allTree.classList.add("btn-success", "text-white");

  loadTrees();
});

// LEVEL-3
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  cardsGrid.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}
//  LEVEL 2: Trees
async function loadTrees() {
  showLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideLoading();
  displayTrees(data.plants);
}
// Display tree
function displayTrees(trees) {
  cardsGrid.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";
    card.innerHTML = `
      <figure>
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover cursor-pointer" onclick="openModal(${tree.id})" />
      </figure>
      <div class="card-body">
        <h2 class="card-title cursor-pointer hover:text-red-500 active:text-red-500" onclick="openModal(${tree.id})">${tree.name}</h2>
        <p class="line-clamp-2">${tree.description}</p>
        <div class="badge badge-outline badge-success">${tree.category}</div>
        <div class="flex card-actions justify-between items-center mt-2">
          <h2 class="text-2xl text-[#3caa62] font-bold">$${tree.price}</h2>
          <button class="btn btn-success text-white rounded-xl" onclick="addToCart(${tree.id},'${tree.name}','${tree.price}','${tree.image}')">Cart</button>
        </div>
      </div>
    `; 

    cardsGrid.appendChild(card);
  });
};
// ADD CART SECTION
//update array here
 function addToCart(id,name,price,image){
  console.log(id,name,price,"add to cart");
  // remove duplicate with condition
const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1; 
  } 
else{
  cart.push({
    id,name,price, image, quantity:1
  });
}
  updateCart();
}
//  update cart by dom 
function updateCart (){
  cartContainer.innerHTML="";
// calculate total here
let total = 0; 
  cart.forEach(item => {
    total += Number(item.price) * item.quantity;

// console.log(cart);

  const cartItem =document.createElement("div");
cartItem.className = "card card-body bg-slate-100 font-semibold"
cartItem.innerHTML= `
  <div class="flex justify-between items-center gap-3">
    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
    <div class="flex-1">
      <h3 class="text-lg font-medium">${item.name}</h3>
      <p>$${item.price} × ${item.quantity}</p>
    </div>
    <button class="btn btn-ghost"onclick="removeFromCart(${item.id})">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <p class="text-right font-bold text-xl">$${item.price * item.quantity}</p>
`;
                        
cartContainer.appendChild(cartItem);
})
 document.getElementById("total-price").textContent = total; // ← total update
}
 

//  Remove from cart
function removeFromCart(treeId) {
console.log(treeId,"tree id");
 cart = cart.filter((item)=> item.id !== treeId);
 updateCart()
};


loadCategories();
loadTrees();
