

for (let i = 0; i < numeriEstratti.length; i++) {
    
    let link = `https://www.freetestapi.com/api/v1/destinations/${numeriEstratti[i]}`
    
    fetch(link)
    .then(response =>{
        console.log(response.ok);
        
        if(response.ok){
            return response.json()
        }else{
            return "Il server non risponde";
        }
    })
    .then(data =>{
    
        console.log(data);
    
    })
}

function creaPagina(citta) {
    let htmlPage = `
        <div class="container">
      <header class="city-header text-center mb-4">
          <img class="city-image rounded" src="${citta.image}" alt="${citta.name}">
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
          <div class="">
              <h2>Top Attractions</h2>
              <ul>
                  <li>Colosseum</li>
                  <li>Vatican City</li>
                  <li>Pantheon</li>
                  <li>Trevi Fountain</li>
              </ul>
          </div>
          <div class="">
              <h2>Local Dishes</h2>
              <ul>
                  <li>Pasta</li>
                  <li>Pizza</li>
                  <li>Gelato</li>
              </ul>
          </div>
          <div class="">
              <h2>Activities</h2>
              <ul>
                  <li>Exploring ancient ruins</li>
                  <li>Attending Papal Audience</li>
                  <li>Visiting art galleries</li>
              </ul>
          </div>
        </div>

        <div class="col-lg-6 mt-5">

          <form>
            <div class="mb-3">
              <label for="nomeCognome" class="form-label">Nome e Cognome</label>
              <input type="password" class="form-control" id="nomeCognome">
            </div>
            <div class="mb-3">
              <label for="inputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Accetto le condizioni</label>
            </div>
            <button type="submit" class="btn btn-primary">Prenota</button>
          </form>

        </div>


      </div>
  </div>
    `
}
