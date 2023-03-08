const resultado = document.getElementById('resultado')

//Clicar botão
const enviar_consulta = document.getElementById('consultar')
enviar_consulta.addEventListener('click', (evento) => {
    evento.preventDefault();
    consultar()
})

//Chamar API
function consultar() {
    let cidade = document.getElementById('cidade').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=3c113e590e40568e4674ee6990b9fe3a&lang=pt_br&units=imperial`).then(res => res.json()).then(data => {
        criarBanner(data)
    });
}

//Retorno Banner
function criarBanner(data) {
    //Informações
    let { pressure, feels_like, humidity, temp } = data.main; //coletar 
    let { deg, speed } = data.wind
    let { visibility } = data
    let { description, icon } = data.weather[0]
    let { name } = data
    let { all } = data.clouds

    //Criar previsão atual
    resultado.innerHTML =
        `
    <section class="container_info">
        <div class="container_titulo">
            <div class="titulo">
                ${name} 
            </div>
            <div class="descricao">
                ${((temp - 32) / 1.8).toFixed(0)}°C <img src='http://openweathermap.org/img/w/${icon}.png'/>
            </div>
            <div>${description}</div>
        </div>
        <div class="container_info_s">
            <div class="icone_weather">
                <div>Sensação térmica</div>
                <div>${((feels_like - 32) / 1.8).toFixed(0)}°C</div>
            </div>
            <div class="icone_weather">
                <div>Nuvens</div>
                <div>${all}%</div>
            </div>
            <div class="icone_weather">
                <div>Humidade</div>
                <div>${humidity}%</div>
            </div>
            <div class="icone_weather">
                <div>Vento</div>
                <div>${((speed * 1.609344).toFixed(1))} km/h</div>
                <div>Direção</div>
                <div>${deg}°</div>
            </div>
            <div class="icone_weather">
                <div>Pressão ATM</div>
                <div>${pressure} hPA</div>
            </div>
            <div class="icone_weather">
                <div>Visibilidade</div>
                <div>${((visibility / 1000).toFixed(1))} km</div>
            </div>
        </div>
        <p>Copyright - 2023 </p>
    </section>
    `;

    console.log(data)
}