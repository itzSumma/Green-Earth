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
  displayTrees(data.plants)

  hideLoading() //stop the spinner
}

// ALL CONTAINER HERE
const containerCategory = document.getElementById("container-category");
const cardsGrid = document.getElementById("cards-grid");
const treeContainer = document.getElementById("tree-container");
const loadingSpinner = document.getElementById("loading-spinner");
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

function displayTrees(trees) {
  // cardsGrid.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";
    card.innerHTML = `
      <figure>
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${tree.name}</h2>
        <p class="line-clamp-2">${tree.description}</p>
        <div class="badge badge-outline badge-success">${tree.category}</div>
        <div class="flex card-actions justify-between items-center mt-2">
          <h2 class="text-2xl text-[#3caa62] font-bold">$${tree.price}</h2>
          <button class="btn btn-success text-white rounded-xl">Buy Now</button>
        </div>
      </div>
    `;

    cardsGrid.appendChild(card);
  });
}
loadCategories();
loadTrees();
