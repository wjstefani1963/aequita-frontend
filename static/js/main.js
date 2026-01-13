document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // Form de leads
    // =====================
    const leadForm = document.getElementById("lead-form");
    const leadMsg = document.getElementById("leads-msg");

    const API_BASE =
      window.location.hostname === "localhost"
        ? "http://127.0.0.1:8000"
        : "https://aequita-api.onrender.com";



    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            leadMsg.textContent = "Obrigado! Em breve entraremos em contato.";
            leadForm.reset();
        });
    }

    // =====================
    // Campo valor monetário
    // =====================
    const campoValor = document.getElementById("valor");

    if (campoValor) {
        campoValor.addEventListener("input", () => {
            let valor = campoValor.value.replace(/\D/g, "");

            if (valor === "") {
                campoValor.value = "0,00";
                return;
            }

            let numero = (parseInt(valor, 10) / 100).toFixed(2);
            let partes = numero.split(".");
            let inteiro = partes[0];
            let decimal = partes[1];

            inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            campoValor.value = `${inteiro},${decimal}`;
        });
    }

    // =====================
    // Carregar índices
    // =====================
    const selectIndice = document.getElementById("indice");

    if (selectIndice) {
        fetch(`${API_BASE}/indices`)
            .then(r => r.json())
            .then(data => {
                selectIndice.innerHTML = "";
                data.indices.forEach(indice => {
                    const option = document.createElement("option");
                    option.value = indice;
                    option.textContent = indice;
                    selectIndice.appendChild(option);
                });
            })
            .catch(() => {
                selectIndice.innerHTML = "<option>Erro ao carregar</option>";
            });
    }

    // =====================
    // Envio do cálculo
    // =====================
    const calcForm = document.querySelector(".calculo-form");
    const resultado = document.getElementById("resultado");

    if (calcForm && resultado) {
        calcForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const valor = parseFloat(
                campoValor.value.replace(/\./g, "").replace(",", ".")
            );
            const aceitarNegativos =
            document.getElementById("aceitar_negativos").checked;

            const payload = {
                valor: valor,
                data_inicio: document.getElementById("data_inicio").value,
                data_fim: document.getElementById("data_fim").value,
                indice: selectIndice.value,
                aceitar_negativos: aceitarNegativos
            };


            fetch(`${API_BASE}/calcular`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(r => r.json())
            .then(data => {
                document.getElementById("valor-resultado").textContent =
                    data.resultado.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                    });

                resultado.style.display = "block";
            })
            .catch(() => alert("Erro ao calcular"));
        });
    }

});


document.addEventListener("DOMContentLoaded", () => {
    carregarIndices();
});

function carregarIndices() {
    fetch(`${API_BASE}/indices`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("indice");
            select.innerHTML = "";

            data.indices.forEach(indice => {
                const option = document.createElement("option");
                option.value = indice;
                option.textContent = indice;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar índices:", error);
        });
}


function copiarPix() {
    const campo = document.getElementById("pix-code");
    campo.select();
    campo.setSelectionRange(0, 99999); // mobile
    document.execCommand("copy");

    const msg = document.getElementById("pix-msg");
    if (msg) {
        msg.innerText = "Código PIX copiado!";
    }
}


document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnCopiarPix");

  if (btn) {
    btn.addEventListener("click", function () {
      const texto = document.getElementById("codigoPix").innerText;

      navigator.clipboard.writeText(texto).then(() => {
        btn.innerText = "✅ Copiado!";
        setTimeout(() => {
          btn.innerText = "📋 Copiar código PIX";
        }, 2000);
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnCopiarPix");
    const pix = document.getElementById("pixCode");
    const msg = document.getElementById("pixMsg");

    if (btn && pix) {
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(pix.value).then(() => {
                msg.innerText = "✅ Código PIX copiado!";
            });
        });
    }
});


document.querySelectorAll('.card-link').forEach(card => {
    card.addEventListener('click', function (e) {
        // evita conflito se clicar no botão
        if (e.target.tagName.toLowerCase() === 'a') return;

        window.location.href = this.dataset.href;
    });
});
