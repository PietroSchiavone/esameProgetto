let tot = 50;
let estrazioni = 6;
let numeriTot = [];
let numeriEstratti = [];

for (let i = 1; i <= tot; i++) {
    numeriTot.push(i);
}

for (let i = 0; i < estrazioni; i++) {
    let numeroEstratto = Math.floor(Math.random() * numeriTot.length);
    numeriEstratti.push(numeriTot[numeroEstratto]);
    numeriTot.splice(numeroEstratto, 1); // Rimuovi il numero estratto
}

function creaCard(id, data, numero) {
    let card = document.querySelector(`#${id}`);
    if (!card) {
        console.error(`Elemento con ID ${id} non trovato nel DOM.`);
        return;
    }
    let cardText = `
        <div class="card">
            <img src="${data.image}" class="card-img-top" alt="Immagine per ${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <a href="./pagine/paginaViaggio.html" class="btn btn-primary save-link" data-numero="${numero}">Seleziona viaggio</a>
            </div>
        </div>
    `;
    card.innerHTML = cardText;
}

numeriEstratti.forEach((numero, index) => {
    let link = `https://www.freetestapi.com/api/v1/destinations/${numero}`;
    let cardId = `card${index + 1}`;

    fetch(link)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Il server non risponde");
            }
        })
        .then(data => {
            creaCard(cardId, data, numero);
        })
        .catch(error => {
            console.error(`Errore durante il fetch per ${cardId}:`, error);
        });
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("save-link")) {
        event.preventDefault();
        let numero = event.target.getAttribute("data-numero");
        if (numero) {
            localStorage.setItem("numeroCitta", JSON.stringify(Number(numero)));
            console.log(`Numero salvato nel localStorage: ${numero}`);
            window.location.href = event.target.href;
        }
    }
});
