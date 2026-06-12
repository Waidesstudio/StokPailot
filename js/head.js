document.addEventListener("DOMContentLoaded", () => {
    fetch('/pages/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            if (typeof updateHeaderForAuth === 'function') {
                updateHeaderForAuth();
            }
        })
        .catch(error => console.error(error));
});


