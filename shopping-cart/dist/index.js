"use strict";
const hello = "Hello, World!";
console.log(hello);
let products = []; // Чітко вказуємо, що це масив об'єктів Product
let currentPage = 1;
const itemsPerPage = 3;
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (event) => {
    const input = event.target;
    console.log(`User typed: ${input.value}`);
});
const sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", (event) => {
    const select = event.target;
    console.log(`User selected: ${select.value}`);
});
const priceMax = document.getElementById("priceMax");
priceMax.addEventListener("input", (event) => {
    const input = event.target;
    console.log(`User set max price: ${input.value}`);
});
const priceMin = document.getElementById("priceMin");
priceMin.addEventListener("input", (event) => {
    const input = event.target;
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
const checkboxes = document.querySelectorAll('.category-checkbox');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
        const input = event.target;
        console.log(`User ${input.checked ? "checked" : "unchecked"}: ${input.value}`);
    });
});
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
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
const container = document.getElementById('productsContainer');
const paginationContainer = document.getElementById('paginationContainer');
const totalProductsCountHTML = document.getElementById('totalProductsCount');
