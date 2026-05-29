// ALL THE HTML ELEMENTS


const dashboardTitle = document.getElementById("dashboard-title");
const dashboardText = document.getElementById("dashboard-text");

const heroAddProductBtn = document.getElementById("hero-add-product-btn");
const tableAddProductBtn = document.getElementById("table-add-product-btn");

const generateReportBtn = document.getElementById("generate-report-btn");
const viewReportBtn = document.getElementById("view-report-btn");

const totalProducts = document.getElementById("total-products");
const totalRevenue = document.getElementById("total-revenue");
const lowStock = document.getElementById("low-stock");
const totalOrders = document.getElementById("total-orders");

const monthlyTarget = document.getElementById("monthly-target");

const inventorySection = document.getElementById("inventory-section");
const inventoryBody = document.getElementById("inventory-body");

const productForm = document.getElementById("product-form");

const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productStock = document.getElementById("product-stock");
const productPrice = document.getElementById("product-price");

const saveProductBtn = document.getElementById("save-product-btn");

const searchProduct = document.getElementById("search-product");

const activityList = document.getElementById("activity-list");
const alertList = document.getElementById("alert-list");

const quickAddInventory = document.getElementById("quick-add-inventory");
const quickAnalytics = document.getElementById("quick-analytics");
const quickTrackOrders = document.getElementById("quick-track-orders");
const quickSystemSettings = document.getElementById("quick-settings");

// PRODUCT DATABASE

let products = JSON.parse(localStorage.getItem("stokpailotProducts")) || [
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
    stock: 5,
    price: 12000,
  },
];

// SAVE TO LOCAL STORAGE

function saveProducts() {
  localStorage.setItem("stokpailotProducts", JSON.stringify(products));
}

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
  const newActivity = document.createElement("li");

  newActivity.textContent = message;

  activityList.prepend(newActivity);
}

// ADD ALERT

function addAlert(message) {
  const newAlert = document.createElement("li");

  newAlert.textContent = "⚠️ " + message;

  alertList.prepend(newAlert);
}

// CALCULATE TOTAL REVENUE

function calculateRevenue() {
  let revenue = 0;

  products.forEach(function (product) {
    revenue += product.stock * product.price;
  });

  totalRevenue.textContent = formatMoney(revenue);
}

// CALCULATE LOW STOCK

function calculateLowStock() {
  let lowStockCount = 0;

  products.forEach(function (product) {
    if (product.stock <= 10) {
      lowStockCount++;
    }
  });

  lowStock.textContent = lowStockCount;
}

// UPDATE TOTAL PRODUCTS

function updateTotalProducts() {
  totalProducts.textContent = products.length;
}

// UPDATE TOTAL ORDERS

function updateTotalOrders() {
  const randomOrders = Math.floor(Math.random() * 5000);
  totalOrders.textContent = randomOrders;
}

// CREATE TABLE ROW

function createProductRow(product) {
  const row = document.createElement("tr");

  let statusText = "";
  let statusClass = "";

  if (product.stock <= 10) {
    statusText = "Low Stock";
    statusClass = "lowstock";
  } else {
    statusText = "In Stock";
    statusClass = "instock";
  }

  row.innerHTML = `

        <td>${product.name}</td>

        <td>${product.category}</td>

        <td>${product.stock}</td>

        <td>${formatMoney(product.price)}</td>

        <td class="${statusClass}">
            ${statusText}
        </td>

    `;

  inventoryBody.appendChild(row);
}

// RENDER PRODUCTS

function renderProducts() {
  inventoryBody.innerHTML = "";

  products.forEach(function (product) {
    createProductRow(product);
  });
}

// UPDATE DASHBOARD

function updateDashboard() {
  renderProducts();

  updateTotalProducts();

  calculateRevenue();

  calculateLowStock();

  updateTotalOrders();

  updateMonthlyTarget();

  saveProducts();
}

// ADD NEW PRODUCT

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

  const newProduct = {
    name: name,
    category: category,
    stock: stock,
    price: price,
  };

  //  PUSH PRODUCT

  products.push(newProduct);

  // UPDATE EVERYTHING

  updateDashboard();

  // ACTIVITY

  addActivity(name + " added to inventory");

  // ALERT

  if (stock <= 10) {
    addAlert(name + " is running low");
  }

  // CLEAR FORM

  clearForm();

  hideProductForm();
}

// SEARCH PRODUCTS

function searchProducts() {
  const searchValue = searchProduct.value.toLowerCase();

  const rows = inventoryBody.querySelectorAll("tr");

  rows.forEach(function (row) {
    const rowText = row.textContent.toLowerCase();

    if (rowText.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// MONTHLY TARGET

function updateMonthlyTarget() {
  let totalStock = 0;

  products.forEach(function (product) {
    totalStock += product.stock;
  });

  let percentage = Math.floor(totalStock / 10);

  if (percentage > 100) {
    percentage = 100;
  }

  monthlyTarget.textContent = percentage + "%";
}


function generateReport() {
  const report = `

STOKPAILOT INVENTORY REPORT

Total Products: ${products.length}

Low Stock Products: ${lowStock.textContent}

Total Revenue: ${totalRevenue.textContent}

Total Orders: ${totalOrders.textContent}

    `;

  alert(report);

  addActivity("Inventory report generated");
}

// VIEW FULL REPORT

function viewFullReport() {
  inventorySection.scrollIntoView({
    behavior: "smooth",
  });
}

function openAnalytics() {
  document.getElementById("analytics-card").scrollIntoView({
    behavior: "smooth",
  });
}

function openSettings() {
  alert("System settings coming soon");
}

function openOrders() {
  alert("Order tracking system coming soon");
}

// CHART.JS

const chartCanvas = document.getElementById("chartbar");

const chart = new Chart(chartCanvas, {
  type: "line",

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

    datasets: [
      {
        label: "Revenue",

        data: [120000, 190000, 300000, 500000, 450000, 620000, 800000],

        borderWidth: 3,

        tension: 0.4,
      },
    ],
  },

  options: {
    responsive: true,
  },
});

// LIVE CHART UPDATE

setInterval(function () {
  const randomRevenue = Math.floor(Math.random() * 900000);

  chart.data.datasets[0].data.push(randomRevenue);

  chart.data.datasets[0].data.shift();

  chart.update();
}, 4000);

// EVENT LISTENERS

heroAddProductBtn.addEventListener(
  "click",

  showProductForm,
);

tableAddProductBtn.addEventListener(
  "click",

  showProductForm,
);

saveProductBtn.addEventListener(
  "click",

  addProduct,
);

searchProduct.addEventListener(
  "keyup",

  searchProducts,
);

generateReportBtn.addEventListener(
  "click",

  generateReport,
);

viewReportBtn.addEventListener(
  "click",

  viewFullReport,
);

quickAddInventory.addEventListener(
  "click",

  showProductForm,
);

quickAnalytics.addEventListener(
  "click",

  openAnalytics,
);

quickTrackOrders.addEventListener(
  "click",

  openOrders,
);

quickSystemSettings.addEventListener(
  "click",

  openSettings,
);


hideProductForm();

updateDashboard();
