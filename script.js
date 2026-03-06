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
//LEVEL-5 MODAL
async function openModal(treeId) {
  console.log(treeId); /// see the id
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plant = data.plants;

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
  // cardsGrid.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";
    card.innerHTML = `
      <figure>
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover cursor-pointer" onclick="openModal(${tree.id})" />
      </figure>
      <div class="card-body">
        <h2 class="card-title" onclick="openModal(${tree.id})">${tree.name}</h2>
        <p class="line-clamp-2">${tree.description}</p>
        <div class="badge badge-outline badge-success">${tree.category}</div>
        <div class="flex card-actions justify-between items-center mt-2">
          <h2 class="text-2xl text-[#3caa62] font-bold">$${tree.price}</h2>
          <button class="btn btn-success text-white rounded-xl">Cart</button>
        </div>
      </div>
    `;

    cardsGrid.appendChild(card);
  });
}
loadCategories();
loadTrees();
