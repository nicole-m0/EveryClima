//tema
const btnTema = document.getElementById('theme');
const body = document.body;
const temaSalvo = localStorage.getItem('tema');

temaEscuro(temaSalvo === 'darkmode');

function temaEscuro(tipo){
    if(tipo){
        body.classList.add('darkmode');
        btnTema.innerHTML = '<i class="fa-solid fa-sun"></i> Theme';
    } else {
        body.classList.remove('darkmode');
        btnTema.innerHTML = '<i class="fa-solid fa-moon"></i> Theme';
    }
}

btnTema.addEventListener('click', () => {
    const isDark = !body.classList.contains('darkmode');
    temaEscuro(isDark);
    localStorage.setItem(
        'tema', isDark ? 'darkmode' : 'claro'
    );
});

// scroll forecast
const forecast = document.getElementById("forecast");

document.getElementById("btnRight").addEventListener("click", () => {
    forecast.scrollBy({
        left: 150,
        behavior: "smooth"
    });
});

document.getElementById("btnLeft").addEventListener("click", () => {
    forecast.scrollBy({
        left: -150,
        behavior: "smooth"
    });
});

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// sistema
// clima atual
const apiKey = "7a3830947cea0cd067c065505ee93f7a";
const cidade = "Oeiras";
const icones = {
            "01d": "img/sun_10484062.png",
            "01n": "img/moon2.png",
            "02d": "img/sun+clouds.png",
            "02n": "img/moon+couds.png",
            "03d": "img/clouds2_11215496.png",
            "03n": "img/clouds2_11215496.png",
            "04d": "img/clouds2_11215496.png",
            "04n": "img/clouds2_11215496.png",
            "09d": "img/rain.png",
            "09n": "img/rain.png",
            "10d": "img/rain.png",
            "10n": "img/rain.png",
            "11d": "img/storm.png",
            "11n": "img/storm.png",
            "13d": "img/snowing_692454.png",
            "13n": "img/snowing_692454.png",
            "50d": "img/fog2.png",
            "50n": "img/fog2.png"
        };

// cidade
const cidadeElemento = document.getElementById('cidade');
const umidadeElemento = document.getElementById('umidade');
const temperaturaElemento = document.getElementById('temperatura');
const imgIcon = document.getElementById('imagemTemp');

function carregarClima(cidade) {

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    )
    .then(response => response.json())
    .then(data => {

        cidadeElemento.textContent = data.name;
        umidadeElemento.textContent = data.main.humidity;
        temperaturaElemento.textContent = `${Math.round(data.main.temp)}°C`;

        document.getElementById('realFeel').textContent = `${Math.round(data.main.feels_like)}°C`;

        document.getElementById('umidity').textContent = `${data.main.humidity}%`;

        document.getElementById('vento').textContent = `${data.wind.speed} km/h`;

        const codigo = data.weather[0].icon;
        imgIcon.src = icones[codigo];
    });
}

carregarClima("Oeiras");

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keydown", (e) => {
    console.log("Tecla:", e.key);

    if (e.key === "Enter") {
        console.log("ENTER FUNCIONOU");

        const cidade = pesquisa.value.trim();

        if (cidade) {
            console.log("Buscando:", cidade);
            carregarClima(cidade);
        }
    }
});

// previsão pelas próximas horas
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)
.then(response => response.json())
.then(data => {

    const chanceChuva = Math.round(data.list[0].pop * 100);
    document.getElementById('chanceChuva').textContent = `${chanceChuva}%`;

    const forecastContainer = document.getElementById("forecast");

    // limpa antes de adicionar
    forecastContainer.innerHTML = "";

    data.list.slice(0, 8).forEach(item => {

        const hora = item.dt_txt.split(" ")[1].slice(0,5);
        const temp = Math.round(item.main.temp);
        const codigo = item.weather[0].icon;

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${hora}</p>
            <img src="${icones[codigo]}" alt="clima">
            <span>${temp}°C</span>
        `;

        forecastContainer.appendChild(card);
    });
});

// previsão pelos próximos dias
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)

.then(response => response.json())
.then(data => {
    const previsaoDias = document.getElementById('previsaoDias');
    const dias = data.list.filter(item => item.dt_txt.includes("12:00")).slice(0, 5);
    
    dias.forEach(item => {
        const dataObj = new Date(item.dt_txt);

        const diaDaSemana = dataObj.toLocaleDateString(
            "pt-BR", {weekday: "short"}
        );

        const temperaturaDias = Math.round(item.main.temp);
        const codigo = item.weather[0].icon;

        const listaDias = document.createElement('div');
        listaDias.classList.add('listaDias');
        listaDias.innerHTML = "";

        listaDias.innerHTML = `
        <p>${diaDaSemana}</p>
        <img src="${icones[codigo]}" alt="">
        <span>${temperaturaDias}°C</span>
        `;
        previsaoDias.appendChild(listaDias);
    })
})

//  gráfico
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)
.then(response => response.json())
.then(data => {

    const horas = data.list.slice(0, 8);

    const labels = horas.map(item =>
        item.dt_txt.split(" ")[1].slice(0, 5)
    );

    const temperaturas = horas.map(item =>
        Math.round(item.main.temp)
    );

    const ctx = document.getElementById('graficoHoras');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura',
                data: temperaturas,
                tension: 0.4,
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

});

// mapa
const mapa = document.getElementById('mapa')

    navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const map = L.map('map').setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});
