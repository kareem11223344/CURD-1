let title = document.getElementById("titleInput");
let price = document.getElementById("priceInput");
let taxes = document.getElementById("taxesInput");
let ads = document.getElementById("adsInput");
let discount = document.getElementById("discountInput");
let total = document.getElementById("total");
let count = document.getElementById("countInput");
let category = document.getElementById("categoryInput");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let noItem = document.getElementById('noItem');

let searchMode = "title";
let mode = "create";
let flag;

// ====================================
// ========== Start Get Total ==========
// =====================================
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(118, 5, 5)";
  }
}
// ====================================
// ========== End Get Total ==========
// =====================================

// ========================================
// ========= Start Create Product =========
// ========================================
// let productList = localStorage.getItem('products') ? productList = JSON.parse(localStorage.getItem('products')) : productList = [];
let productList;
if (localStorage.getItem("products")) {
  productList = JSON.parse(localStorage.getItem("products"));
  readData();
} else {
  productList = [];
}

create.addEventListener("click", function createProduct() {
  let Product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };

  if(title.value != '' && price.value != '' && category.value != '') {
    if (mode == "create") {
      if (Product.count > 1) {
        for (let i = 0; i < Product.count; i++) {
          productList.push(Product);
        }
      } else {
        productList.push(Product);
      }
    } else {
      productList[flag] = Product;
      count.style.display = "block";
      create.innerHTML = "Create";
      mode = "create";
    }
    localStorage.setItem("products", JSON.stringify(productList));
  
    // clearInputs();
  }
  readData();
  getTotal();
});
// ========================================
// ========= End Create Product =========
// ========================================

// ========================================
// ========== Start Clear Inputs ==========
// ========================================
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// ========================================
// =========== End Clear Inputs ===========
// ========================================

// ========================================
// =========== Start Read Data ===========
// ========== Start Searsh Data ==========
// ========================================
function getSearshMode(id) {
  if (id == "searchByTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  readData();
}

function readData(value) {
  var char = search.value.toLowerCase();
  let temp = "";

  if(productList.length > 0) {
    for (let i = 0; i < productList.length; i++) {
        if (searchMode == "title") {
          if (productList[i].title.toLowerCase().includes(char)) {
            temp += `
                <tr>
                     <td>${i+1}</td>
                     <td>${productList[i].title}</td>
                     <td>${productList[i].price}</td>
                     <td>${productList[i].taxes}</td>
                     <td>${productList[i].ads}</td>
                     <td>${productList[i].discount}</td>
                     <td>${productList[i].total}</td>
                     <td>${productList[i].category}</td>
                     <td><button onclick='updateData(${i})'>update</button></td>
                     <td><button onclick='deleteProduct(${i})'>delete</button></td>
                </tr> `;
                noItem.style.display = "none"
          } else {
            noItem.style.display = "block"
          }
        } else {
          if (productList[i].category.toLowerCase().includes(char)) {
            temp += `
                <tr>
                     <td>${i+1}</td>
                     <td>${productList[i].title}</td>
                     <td>${productList[i].price}</td>
                     <td>${productList[i].taxes}</td>
                     <td>${productList[i].ads}</td>
                     <td>${productList[i].discount}</td>
                     <td>${productList[i].total}</td>
                     <td>${productList[i].category}</td>
                     <td><button onclick='updateData(${i})'>update</button></td>
                     <td><button onclick='deleteProduct(${i})'>delete</button></td>
                </tr> `;
                noItem.style.display = "none"
          } else {
            noItem.style.display = "block"
          }
        }
      }
  } else {
    noItem.style.display = "block"
  }
  document.getElementById("data").innerHTML = temp;

  let deleteAll = document.getElementById("deleteAll");
  if (productList.length > 0) {
    deleteAll.innerHTML = `<button onclick='deleteAll()'>Delete All (${productList.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
// ========================================
// ============ End Read Data ============
// =========== End Searsh Data ===========
// ========================================

// ========================================
// ========= Start Delete Product =========
// ========================================
function deleteProduct(i) {
  productList.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  readData();
}

function deleteAll() {
  productList.splice(0);
  localStorage.clear();
  readData();
}
// ========================================
// ========== End Delete Product ==========
// ========================================

// ========================================
// =========== Start Update Data ===========
// ========================================
function updateData(i) {
  flag = i;
  title.value = productList[i].title;
  price.value = productList[i].price;
  taxes.value = productList[i].taxes;
  ads.value = productList[i].ads;
  discount.value = productList[i].discount;
  category.value = productList[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mode = "update";
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// ========================================
// ============ End Update Data ============
// ========================================