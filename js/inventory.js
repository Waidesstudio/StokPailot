// GET ALL HTML ELEMENTS

const addProductBtn = document.getElementById("add-product-btn");
const newProductBtn = document.getElementById("new-product-btn");

const exportInventoryBtn = document.getElementById("export-inventory-btn");

const totalProducts = document.getElementById("total-products");
const lowStock = document.getElementById("low-stock");
const outOfStock = document.getElementById("out-of-stock");
const totalCategories = document.getElementById("total-categories");

const inventorySection = document.getElementById("inventory-section");
const inventoryTable = document.getElementById("inventory-table");
const inventoryBody = document.getElementById("inventory-body");

const productForm = document.getElementById("product-form");

const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productStock = document.getElementById("product-stock");
const productPrice = document.getElementById("product-price");

const saveProductBtn = document.getElementById("save-product-btn");

const searchProduct = document.getElementById("search-product");

const warehouseCapacity = document.getElementById("warehouse-capacity");

const activityList = document.getElementById("activity-list");
const alertList = document.getElementById("alert-list");

const quickAddProduct = document.getElementById("quick-add-product");
const quickManageCategories = document.getElementById(
  "quick-manage-categories",
);
const quickTrackStock = document.getElementById("quick-track-stock");
const quickInventoryReports = document.getElementById(
  "quick-inventory-reports",
);

// INVENTORY DATABASE

let inventoryProducts = JSON.parse(
  localStorage.getItem("stokpailotProducts"),
) || [
  {
    name: "Wireless Mouse",
    category: "Electronics",
    stock: 120,
    price: 15000,
  },

  {
    name: "Office Chair",
    category: "Furniture",
    stock: 8,
    price: 80000,
  },

  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    stock: 52,
    price: 45000,
  },

  {
    name: "Gaming Keyboard",
    category: "Accessories",
    stock: 15,
    price: 35000,
  },

  {
    name: "Printer Ink",
    category: "Office Supplies",
    stock: 0,
    price: 12000,
  },
];

// SAVE INVENTORY

localStorage.setItem("stokpailotProducts", JSON.stringify(inventoryProducts));

// FORMAT MONEY

function formatMoney(amount) {
  return "ꠄ" + amount.toLocaleString();
}

// SHOW PRODUCT FORM

function showProductForm() {
  productForm.style.display = "flex";
  productForm.style.animation = "fadeIn 0.3s ease";

  productName.focus();
}
// HIDE PRODUCT FORM

function hideProductForm() {
  productForm.style.display = "none";
}

// CLEAR FORM

function clearForm() {
  productName.value = "";
  productCategory.value = "";
  productStock.value = "";
  productPrice.value = "";
}

// ADD ACTIVITY

function addActivity(message) {
  const li = document.createElement("li");

  li.textContent = message;

  activityList.prepend(li);
}

// ADD ALERT

function addAlert(message) {
  const li = document.createElement("li");

  li.textContent = "⚠️ " + message;

  alertList.prepend(li);
}

// UPDATE TOTAL PRODUCTS

function updateTotalProducts() {
  totalProducts.textContent = inventoryProducts.length;
}

// UPDATE LOW STOCK

function updateLowStock() {
  let count = 0;

  inventoryProducts.forEach(function (product) {
    if (product.stock > 0 && product.stock <= 10) {
      count++;
    }
  });

  lowStock.textContent = count;
}

// UPDATE OUT OF STOCK

function updateOutOfStock() {
  let count = 0;

  inventoryProducts.forEach(function (product) {
    if (product.stock <= 0) {
      count++;
    }
  });

  outOfStock.textContent = count;
}

// UPDATE CATEGORIES

function updateCategories() {
  const categories = [];

  inventoryProducts.forEach(function (product) {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  totalCategories.textContent = categories.length;
}

// UPDATE WAREHOUSE CAPACITY

function updateWarehouseCapacity() {
  let totalStock = 0;

  inventoryProducts.forEach(function (product) {
    totalStock += product.stock;
  });

  let percentage = Math.floor(totalStock / 5);

  if (percentage > 100) {
    percentage = 100;
  }

  warehouseCapacity.textContent = percentage + "%";
}

// GET PRODUCT STATUS

function getProductStatus(stock) {
  if (stock <= 0) {
    return {
      text: "Out Of Stock",
      class: "cancelled",
    };
  }

  if (stock <= 10) {
    return {
      text: "Low Stock",
      class: "lowstock",
    };
  }

  return {
    text: "In Stock",
    class: "instock",
  };
}

// CREATE PRODUCT ROW

function createProductRow(product) {
  const row = document.createElement("tr");

  const status = getProductStatus(product.stock);

  row.innerHTML = `

        <td>${product.name}</td>

        <td>${product.category}</td>

        <td>${product.stock}</td>

        <td>${formatMoney(product.price)}</td>

        <td class="${status.class}">
            ${status.text}
        </td>

    `;

  inventoryBody.appendChild(row);
}

// RENDER INVENTORY

function renderInventory() {
  inventoryBody.innerHTML = "";

  inventoryProducts.forEach(function (product) {
    createProductRow(product);
  });
}

// UPDATE INVENTORY SYSTEM

function updateInventorySystem() {
  renderInventory();

  updateTotalProducts();

  updateLowStock();

  updateOutOfStock();

  updateCategories();

  updateWarehouseCapacity();

  updateChart();

  saveInventory();
}

// ADD PRODUCT

function addProduct() {
  const name = productName.value.trim();

  const category = productCategory.value.trim();

  const stock = Number(productStock.value);

  const price = Number(productPrice.value);

  // VALIDATION

  if (name === "" || category === "" || stock === "" || price === "") {
    alert("Please fill all fields");

    return;
  }

  const productExists = inventoryProducts.some(function (product) {
    return product.name.toLowerCase() === name.toLowerCase();
  });

  if (productExists) {
    alert("Product already exists");

    return;
  }

  const newProduct = {
    name: name,
    category: category,
    stock: stock,
    price: price,
  };

  inventoryProducts.push(newProduct);

  updateInventorySystem();

  addActivity("📦 " + name + " added to inventory");

  if (stock <= 10) {
    addAlert(name + " stock is low");
  }

  if (stock <= 0) {
    addAlert(name + " is out of stock");
  }

  clearForm();

  hideProductForm();
}

// SEARCH INVENTORY

function searchInventory() {
  const searchValue = searchProduct.value.toLowerCase();

  const rows = inventoryBody.querySelectorAll("tr");

  rows.forEach(function (row) {
    const text = row.textContent.toLowerCase();

    if (text.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// EXPORT INVENTORY

function exportInventory() {
  let exportData = "STOKPAILOT INVENTORY REPORT\n\n";

  inventoryProducts.forEach(function (product) {
    exportData += "Product: " + product.name + "\n";

    exportData += "Category: " + product.category + "\n";

    exportData += "Stock: " + product.stock + "\n";

    exportData += "Price: " + formatMoney(product.price) + "\n\n";
  });

  const blob = new Blob([exportData], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "stokpailot-inventory-report.txt";

  link.click();

  addActivity("📊 Inventory report exported");
}

// OPEN CATEGORY SECTION

function openCategories() {
  alert("Category management system coming soon");
}

// OPEN STOCK TRACKER

function openStockTracker() {
  inventorySection.scrollIntoView({
    behavior: "smooth",
  });
}

// OPEN REPORTS

function openReports() {
  alert("Advanced inventory reports coming soon");
}

// INVENTORY CHART

const inventoryChartCanvas = document.getElementById("inventory-chart");

const inventoryChart = new Chart(inventoryChartCanvas, {
  type: "bar",

  data: {
    labels: [],

    datasets: [
      {
        label: "Stock",

        data: [],

        borderWidth: 2,
      },
    ],
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// UPDATE CHART

function updateChart() {
  inventoryChart.data.labels = inventoryProducts.map(function (product) {
    return product.name;
  });

  inventoryChart.data.datasets[0].data = inventoryProducts.map(
    function (product) {
      return product.stock;
    },
  );

  inventoryChart.update();
}

// LIVE STOCK MOVEMENT

setInterval(function () {
  inventoryProducts.forEach(function (product) {
    const randomChange = Math.floor(Math.random() * 5);

    const increase = Math.random() > 0.5;

    if (increase) {
      product.stock += randomChange;
    } else {
      product.stock -= randomChange;
    }

    if (product.stock < 0) {
      product.stock = 0;
    }
  });

  updateInventorySystem();
}, 10000);

//  EVENT LISTENERS

addProductBtn.addEventListener(
  "click",

  showProductForm,
);

newProductBtn.addEventListener(
  "click",

  showProductForm,
);

saveProductBtn.addEventListener(
  "click",

  addProduct,
);

searchProduct.addEventListener(
  "keyup",

  searchInventory,
);

exportInventoryBtn.addEventListener(
  "click",

  exportInventory,
);

quickAddProduct.addEventListener(
  "click",

  showProductForm,
);

quickManageCategories.addEventListener(
  "click",

  openCategories,
);

quickTrackStock.addEventListener(
  "click",

  openStockTracker,
);

quickInventoryReports.addEventListener(
  "click",

  openReports,
);

// START INVENTORY SYSTEM

hideProductForm();
updateInventorySystem();
