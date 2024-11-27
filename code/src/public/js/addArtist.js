document.addEventListener("DOMContentLoaded", () => {
    const discosInput = document.getElementById("discos-search");
    const searchButton = document.getElementById("search-button");
    const discosList = document.getElementById("discos-list");

    searchButton.addEventListener("click", async () => {
        const query = discosInput.value.trim();

        try {
            const response = await fetch(`/artists/add?query=${query}`);
            const html = await response.text();

            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, "text/html");
            const newDiscosList = newDocument.querySelector(".discos-list");

            discosList.innerHTML = newDiscosList.innerHTML;
        } catch (error) {
            console.error("Erro ao buscar discos:", error);
        }
    });
});
