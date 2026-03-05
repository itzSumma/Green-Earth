//Async/await
//   async function  getUser() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
//     const data = await res.json()
//     console.log(data.name)
//     console.log(data.email)
//     console.log(data.phone)
//   }

// All logic lives inside — data stays accessible
async function loadCategories() {
  // Step 1: Fetch
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();

  // Step 2: Get container and empty it
  const containerCategory = document.getElementById("container-category");
  containerCategory.innerHTML = "";

  // Step 3: Loop and build buttons
  data.categories.forEach((category) => {
    console.log(data);
    console.log(category);
    const btn = document.createElement("button");
    btn.innerText = category.category; // give it a label
    btn.className =
      "btn btn-outline w-full btn min-h-14 rounded-md hover:bg-green-400 active:bg-green-400 text-xl font-medium";
    btn.textContent = category.category_name;

    containerCategory.appendChild(btn);
  });
}

loadCategories(); // call once — everything runs in order inside
