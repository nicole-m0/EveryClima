// menu 
const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');

menuIcon.addEventListener("click", () => {
    menu.classList.toggle("active");
});

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

// sistema
// chave
// clima atual
const apiKey = "minha_chave";
const cidade = "Oeiras";

// clima principal: cidade, humidade, temperatura e icon

// cidade
const cidadeElemento = document.getElementById('cidade');
const umidadeElemento = document.getElementById('umidade');
const temperaturaElemento = document.getElementById('temperatura');
const imgIcon = document.getElementById('imagemTemp');

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)
.then(response => response.json())
.then(data => {
    cidadeElemento.textContent = data.name;
    umidadeElemento.textContent = data.main.humidity;
    temperaturaElemento.textContent = `${Math.round(data.main.temp)}°C`;
    const codigo = data.weather[0].icon;
    
    const icones = {
        "01d": "img/sun_10484062.png",
        "01n": "img/moon2.png",
        "02d": "img/sun+clouds.png",
        "02n": "img/moon+couds.png",
        "03d": "img/clouds2_11215496.png",
        "04d": "img/clouds2_11215496.png",
        "09d": "img/rain.png",
        "10d": "img/rain.png",
        "11d": "img/storm.png",
        "13d": "img/snowing_692454.png",
        "50d": "img/fog2.png" 
    };

imgIcon.src = icones[codigo];
});

// previsão pelas próximas horas
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)
.then(response => response.json())
.then(data => {

    const forecastContainer = document.getElementById("forecast");

    // limpa antes de adicionar
    forecastContainer.innerHTML = "";

    data.list.slice(0, 8).forEach(item => {

        const hora = item.dt_txt.split(" ")[1].slice(0,5);
        const temp = Math.round(item.main.temp);
        const codigo = item.weather[0].icon;

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

// gráfico
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)
