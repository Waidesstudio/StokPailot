// GET ALL HTML ELEMENTS

const analyticsTitle = document.getElementById("analytics-title");

const generateReportBtn = document.getElementById("generate-report-btn");
const exportAnalyticsBtn = document.getElementById("export-analytics-btn");

const totalRevenue = document.getElementById("total-revenue");
const totalSales = document.getElementById("total-sales");
const totalCustomers = document.getElementById("total-customers");
const growthRate = document.getElementById("growth-rate");

const performanceTarget = document.getElementById("performance-target");

const analyticsChart = document.getElementById("analytics-chart");

const salesSection = document.getElementById("sales-section");

const searchProduct = document.getElementById("search-product");

const exportDataBtn = document.getElementById("export-data-btn");

const analyticsTableBody = document.getElementById("analytics-table-body");

const activityList = document.getElementById("activity-list");
const insightList = document.getElementById("insight-list");

const quickSalesReports = document.getElementById("quick-sales-reports");
const trackPerformance = document.getElementById("track-performance");
const customerInsights = document.getElementById("customer-insights");
const growthAnalytics = document.getElementById("growth-analytics");

// ANALYTICS DATABASE

let analyticsProducts = [
  {
    product: "Wireless Mouse",
    category: "Electronics",
    sold: 1250,
    revenue: 1200000,
    performance: "Excellent",
  },

  {
    product: "Office Chair",
    category: "Furniture",
    sold: 420,
    revenue: 950000,
    performance: "Strong",
  },

  {
    product: "Gaming Keyboard",
    category: "Accessories",
    sold: 850,
    revenue: 760000,
    performance: "Excellent",
  },

  {
    product: "Bluetooth Speaker",
    category: "Electronics",
    sold: 610,
    revenue: 680000,
    performance: "Average",
  },

  {
    product: "Printer Ink",
    category: "Office Supplies",
    sold: 120,
    revenue: 140000,
    performance: "Low",
  },
];

function formatMoney(amount) {
  return "ꠄ" + amount.toLocaleString();
}

// CREATE TABLE ROW

function createTableRow(data) {
  const row = document.createElement("tr");

  let performanceClass = "";

  if (data.performance === "Excellent") {
    performanceClass = "instock";
  } else if (data.performance === "Strong") {
    performanceClass = "instock";
  } else if (data.performance === "Average") {
    performanceClass = "lowstock";
  } else {
    performanceClass = "cancelled";
  }

  row.innerHTML = `

        <td>${data.product}</td>

        <td>${data.category}</td>

        <td>${data.sold.toLocaleString()}</td>

        <td>${formatMoney(data.revenue)}</td>

        <td class="${performanceClass}">
            ${data.performance}
        </td>

    `;

  analyticsTableBody.appendChild(row);
}

// RENDER TABLE

function renderTable() {
  analyticsTableBody.innerHTML = "";

  analyticsProducts.forEach(function (product) {
    createTableRow(product);
  });
}

// SEARCH PRODUCTS

function searchProducts() {
  const value = searchProduct.value.toLowerCase();

  const rows = analyticsTableBody.querySelectorAll("tr");

  rows.forEach(function (row) {
    const rowText = row.textContent.toLowerCase();

    if (rowText.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// ADD ACTIVITY

function addActivity(message) {
  const li = document.createElement("li");

  li.textContent = message;

  activityList.prepend(li);
}

// ADD INSIGHT

function addInsight(message) {
  const li = document.createElement("li");

  li.textContent = message;

  insightList.prepend(li);
}

// GENERATE REPORT

function generateReport() {
  const report = `

STOKPAILOT ANALYTICS REPORT

Total Revenue: ${totalRevenue.textContent}

Total Sales: ${totalSales.textContent}

Total Customers: ${totalCustomers.textContent}

Growth Rate: ${growthRate.textContent}

Performance Target: ${performanceTarget.textContent}

    `;

  alert(report);

  addActivity("📊 Analytics report generated");
}

// EXPORT ANALYTICS

function exportAnalytics() {
  alert("Analytics export started successfully");

  addActivity("📁 Analytics exported");
}

function exportTableData() {
  alert("Product performance data exported");

  addActivity("📦 Product performance exported");
}

// SCROLL TO REPORT

function openReports() {
  salesSection.scrollIntoView({
    behavior: "smooth",
  });
}

// QUICK ACTIONS

function openPerformance() {
  document.getElementById("revenue-card").scrollIntoView({
    behavior: "smooth",
  });
}

function openCustomerInsights() {
  alert("Customer insights system opening soon");
}

function openGrowthAnalytics() {
  alert("Growth analytics dashboard coming soon");
}

function animateValue(element, start, end, duration, prefix = "", suffix = "") {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) {
      startTimestamp = timestamp;
    }

    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    const value = Math.floor(progress * (end - start) + start);

    element.textContent = prefix + value.toLocaleString() + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

animateValue(totalSales, 0, 12845, 2000);

animateValue(totalCustomers, 0, 3420, 2000);

animateValue(growthRate, 0, 18, 2000, "", "%");

// PERFORMANCE TARGET ANIMATION

let progress = 0;

const targetInterval = setInterval(function () {
  progress++;

  performanceTarget.textContent = progress + "%";

  if (progress >= 84) {
    clearInterval(targetInterval);
  }
}, 20);

// CHART.JS ANALYTICS CHART

const analyticsGraph = new Chart(analyticsChart, {
  type: "line",

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

    datasets: [
      {
        label: "Monthly Revenue",

        data: [120000, 220000, 300000, 450000, 600000, 750000, 920000],

        borderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  },

  options: {
    responsive: true,

    maintainAspectRatio: false,
  },
});

setInterval(function () {
  const randomRevenue = Math.floor(Math.random() * 1000000);

  analyticsGraph.data.datasets[0].data.push(randomRevenue);

  analyticsGraph.data.datasets[0].data.shift();

  analyticsGraph.update();
}, 1500);

// REAL TIME DATE

const dateElement = document.createElement("p");
dateElement.style.marginTop = "15px";
dateElement.style.fontSize = "14px";
dateElement.style.opacity = "0.7";
const today = new Date();
dateElement.innerHTML =
  "Last Updated: " +
  today.toLocaleDateString() +
  " " +
  today.toLocaleTimeString();

document.getElementById("analytics-content").appendChild(dateElement);

const quickCards = document.querySelectorAll(".quick-action-card");

quickCards.forEach(function (card) {
  card.addEventListener("mouseenter", function () {
    card.style.transform = "translateY(-10px)";

    card.style.transition = "0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "translateY(0px)";
  });
});


// LIVE INSIGHTS

const liveInsights = [
  "💡 Customer activity increased today",

  "📈 Electronics sales performing strongly",

  "🚀 Revenue growth rising steadily",

  "📊 Monthly target approaching completion",

  "🛒 More customers returning this week",
];

setInterval(function () {
  const randomInsight =
    liveInsights[Math.floor(Math.random() * liveInsights.length)];

  addInsight(randomInsight);
}, 10000);

// EVENT LISTENERS

generateReportBtn.addEventListener(
  "click",

  generateReport,
);

exportAnalyticsBtn.addEventListener(
  "click",

  exportAnalytics,
);

exportDataBtn.addEventListener(
  "click",

  exportTableData,
);

searchProduct.addEventListener(
  "keyup",

  searchProducts,
);

quickSalesReports.addEventListener(
  "click",

  openReports,
);

trackPerformance.addEventListener(
  "click",

  openPerformance,
);

customerInsights.addEventListener(
  "click",

  openCustomerInsights,
);

growthAnalytics.addEventListener(
  "click",

  openGrowthAnalytics,
);

// START ANALYTICS SYSTEM

renderTable();

addActivity("🚀 Analytics dashboard initialized");

addInsight("💡 Business analytics running successfully");
