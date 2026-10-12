const hello = "Hello, World!";
console.log(hello);

let products: [] = []; // Чітко вказуємо, що це масив об'єктів Product
let currentPage: number = 1;
const itemsPerPage: number = 3;

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
searchInput.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User typed: ${input.value}`);
});

const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
sortSelect.addEventListener("change", (event) => {
  const select = event.target as HTMLSelectElement;
  console.log(`User selected: ${select.value}`);
});

const priceMax = document.getElementById("priceMax") as HTMLInputElement;
priceMax.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User set max price: ${input.value}`);
});

const priceMin = document.getElementById("priceMin") as HTMLInputElement;
priceMin.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User set min price: ${input.value}`);
});

// const clearFiltersBtn = document.getElementById("clearFiltersBtn") as HTMLButtonElement;
// clearFiltersBtn.addEventListener("click", () => {
//   searchInput.value = "";
//   sortSelect.selectedIndex = 0;
//   priceMax.value = "";
//   priceMin.value = "";
//   console.log("Filters cleared");
// });

const checkboxes = document.querySelectorAll('.category-checkbox') as NodeListOf<HTMLInputElement>;
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    console.log(`User ${input.checked ? "checked" : "unchecked"}: ${input.value}`);
  });
});

const clearFiltersBtn = document.getElementById("clearFiltersBtn") as HTMLButtonElement;
clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.selectedIndex = 0;
  priceMax.value = "";
  priceMin.value = "";
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  console.log("Filters cleared");
});


const container = document.getElementById('productsContainer') as HTMLDivElement | null;
const paginationContainer = document.getElementById('paginationContainer') as HTMLDivElement | null;
const totalProductsCountHTML = document.getElementById('totalProductsCount') as HTMLSpanElement
| null;