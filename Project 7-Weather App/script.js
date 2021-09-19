const APIkey = "";

const APIcall = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
const inputEl = document.getElementById('input');
const form = document.getElementById('form');
const main = document.getElementById('main');
let search = '';
async function fetchData(city){
    await fetch(APIcall(city))
    .then(async (data) =>{
        if(data.ok){
            const respData = await data.json();
            console.log(respData);
            writeWtoScreen(respData);
        }
        
    });
    

}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = inputEl.value;
    search = inputEl.value;
    if(city){
        fetchData(city);
        inputEl.value = '';
    }
});

function writeWtoScreen(data){
    const weather = data.weather[0].description;
    const temp = KtoC(data.main.temp);

    const weatherHTML = `

        <div class='weather'>
            <h2>${temp} °C</h2
            <small> in ${search}</small>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
                
        </div>
    `;
    main.innerHTML = weatherHTML;
    

}

function KtoC(temp){
    const cTemp = Math.round(temp - 273.15);
    return cTemp;
}
