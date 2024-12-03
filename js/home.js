let tot = 50; // Totale di numeri estraibili 
let estrazioni = 6; // Quante estrazioni eseguire
let numeriTot = [];
let numeriEstratti = [];

// Popola l'array con i numeri da 1 a tot
for (let i = 1; i <= tot; i++) {
    numeriTot.push(i);
}

// Estrai i numeri casuali
for (let i = 0; i < estrazioni; i++) {
    let numeroEstratto = Math.floor(Math.random() * numeriTot.length);
    numeriEstratti.push(numeriTot[numeroEstratto]);
    numeriTot.splice(numeroEstratto, 1); // Rimuovi il numero estratto
}

// Funzione per creare e aggiornare le card
function creaCard(id, data) {
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
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
    card.innerHTML = cardText;
}

// Fetch dei dati e aggiornamento delle card
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
            creaCard(cardId, data);
        })
        .catch(error => {
            console.error(`Errore durante il fetch per ${cardId}:`, error);
        });
});
