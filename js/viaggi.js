let destinazioni = [];

// Funzione per creare e aggiungere una card al container specificato
function creaCard(containerId, data, numero) {
    let container = document.querySelector(`#${containerId} .swiper-wrapper`);
    if (!container) {
        console.error(`Container con ID ${containerId} non trovato nel DOM.`);
        return;
    }
    let cardHTML = `
        <div class="swiper-slide">
            <div class="card">
                <img src="${data.image}" class="card-img-top" alt="Immagine per ${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <a href="paginaViaggio.html" class="btn btn-primary save-link" data-numero="${numero}">Seleziona viaggio</a>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHTML);
}

// Fetch dei dati e smistamento nei container giusti
let link = `https://www.freetestapi.com/api/v1/destinations`;

fetch(link)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Errore nella risposta del server");
        }
    })
    .then(data => {
        console.log("Dati ricevuti dal server:", data);

        // Smista le destinazioni nei rispettivi container
        data.forEach((destinazione, index) => {
            let containerId = "";
            switch (destinazione.continent) {
                case "Europe":
                    containerId = "europe-cards";
                    break;
                case "Asia":
                    containerId = "asia-cards";
                    break;
                case "Africa":
                    containerId = "africa-cards";
                    break;
                case "North America":
                    containerId = "nAmerica-cards";
                    break;
                case "South America":
                    containerId = "sAmerica-cards";
                    break;
                case "Oceania":
                    containerId = "oceania-cards";
                    break;
                default:
                    console.error(`Continente sconosciuto per la destinazione: ${destinazione.name}`);
                    return;
            }

            // Crea la card nel container corrispondente
            creaCard(containerId, destinazione, index + 1);
        });

        // Inizializza gli slider Swiper dopo aver aggiunto le card
        inizializzaSwiper();
    })
    .catch(error => {
        console.error("Errore durante il fetch delle destinazioni:", error);
    });

// Aggiungi event listener ai pulsanti dopo il caricamento delle card
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("save-link")) {
        event.preventDefault(); // Evita la navigazione immediata del link
        let numero = event.target.getAttribute("data-numero");
        if (numero) {
            localStorage.setItem("numeroCitta", JSON.stringify(Number(numero)));
            console.log(`Numero salvato nel localStorage: ${numero}`);
            window.location.href = event.target.href; // Ora avviene la navigazione
        }
    }
});

// Funzione per inizializzare gli slider Swiper
function inizializzaSwiper() {
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach(swiperContainer => {
        new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            },
        });
    });
}
