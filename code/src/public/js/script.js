document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const appContainer = document.querySelector(".app-container");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            appContainer.style.transform = "translateX(250px)";
        } else {
            appContainer.style.transform = "translateX(0)";
        }
    });
});