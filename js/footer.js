// js/footer.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('/pages/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load footer");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error(error));
});