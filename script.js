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

// clima atual
const apiKey = "7a3830947cea0cd067c065505ee93f7a";
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

// gráfico de temperatura
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
)