document.addEventListener("DOMContentLoaded", () => {
    const faixasInput = document.getElementById("faixas-input");
    const addFaixaBtn = document.getElementById("add-faixa-btn");
    const faixasList = document.getElementById("faixas-list");
    const hiddenFaixasInput = document.getElementById("faixas");
  
    let faixas = [];
  
    addFaixaBtn.addEventListener("click", () => {
      const faixa = faixasInput.value.trim();
  
      if (faixa) {
        faixas.push(faixa);
        hiddenFaixasInput.value = faixas.join(",");
        const faixaItem = document.createElement("li");
        faixaItem.textContent = faixa;
        faixaItem.className = "faixa-item";
        faixasList.appendChild(faixaItem);
        faixasInput.value = "";
      }
    });
  });
  