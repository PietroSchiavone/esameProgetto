// Recupera il numero dal localStorage
let numeroCitta = JSON.parse(localStorage.getItem("numeroCitta"));
let title = document.querySelector("#title");

if (!numeroCitta) {
  console.error("Nessun numero trovato nel localStorage.");
} else {
  let body = document.querySelector("#body");

  // Costruisci il link API
  let link = `https://www.freetestapi.com/api/v1/destinations/${numeroCitta}`;

  fetch(link)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Il server non risponde");
      }
    })
    .then(data => {
      // Crea la pagina e inseriscila nel body
      let htmlPage = creaPagina(data);
      title.textContent = `Viaggio a ${data.name}`
      body.innerHTML = htmlPage;
    })
    .catch(error => {
      console.error("Errore durante il fetch:", error);
    });
}

// Funzione per creare la pagina
function creaPagina(citta) {
  // Crea le liste in formato stringa
  let attractions = citta.top_attractions
    .map(attraction => `<li>${attraction}</li>`)
    .join("");

  let localDishes = citta.local_dishes
    .map(localDish => `<li>${localDish}</li>`)
    .join("");

  let activities = citta.activities
    .map(activity => `<li>${activity}</li>`)
    .join("");

  // Ritorna l'HTML
  return `
    <div class="container mb-5">
      <header class="city-header text-center mb-4">
        <img class="city-image rounded img-fluid" src="${citta.image}" alt="${citta.name}">
        <h1 class="fs-1 my-3">${citta.name}</h1>
        <p class="fs-3">${citta.country}, ${citta.continent}</p>
      </header>
      
      <section>
        <h2>Description</h2>
        <p>${citta.description}</p>
      </section>
      
      <section class="mt-4 row">
        <div class="col-lg-6">
          <h3>Population</h3>
          <p>${citta.population}</p>
        </div>
        <div class="col-lg-6">
          <h3>Currency</h3>
          <p>${citta.currency}</p>
        </div>
        <div class="col-lg-6">
          <h3>Language</h3>
          <p>${citta.language}</p>
        </div>
        <div class="col-lg-6">
          <h3>Best Time to Visit</h3>
          <p>${citta.best_time_to_visit}</p>
        </div>
      </section>
      
      <div class="row">
        <div class="col-lg-6">
          <h2>Top Attractions</h2>
          <ul>${attractions}</ul>
          <h2>Local Dishes</h2>
          <ul>${localDishes}</ul>
          <h2>Activities</h2>
          <ul>${activities}</ul>
        </div>
        <div class="col-lg-6 mt-5">
          <form>
            <div class="mb-3">
              <label for="nomeCognome" class="form-label">Nome e Cognome</label>
              <input type="text" class="form-control" id="nomeCognome" required>
            </div>
            <div class="mb-3">
              <label for="inputEmail1" class="form-label">Email</label>
              <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" required>
              <label class="form-check-label" for="exampleCheck1">Accetto le condizioni</label>
            </div>
            <button type="submit" class="btn btn-primary">Prenota</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
