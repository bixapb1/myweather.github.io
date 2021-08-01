document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});
const bg = document.querySelector('#bg')
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search_btn");
let cardContent = document.querySelector('.card-content')
let forecast = document.querySelector('.forecast');
let details = document.querySelectorAll('.details__value')
const day1Weather = document.querySelector("#dayWeather1")
const day2Weather = document.querySelector("#dayWeather2")
const day3Weather = document.querySelector("#dayWeather3")
const day4Weather = document.querySelector("#dayWeather4")
let weekday = document.querySelectorAll(".weekday")
let api = "50c4c62c18c4f253906961db7ea09b29"
let options = {
    weekday: 'long',
};
let option2 = {
    day: 'numeric',
    month: 'numeric',
}
let day1, day2, day3, day4



let searchCity = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search.value}&lang=ru&appid=${api}`)
        .then(response => response.json())
        .then(json => {
            document.querySelector('.current__city').textContent = json.city.name;
            document.querySelector('.current__description').textContent = json.list[0].weather[0]['description'];
            document.querySelector('.current__temperature').innerHTML = Math.round(json.list[0].main.temp - 273) + "&deg;";
            details[0].innerHTML = `${Math.round(json.list[0].main.feels_like - 273) + "&deg" + "C"}`
            details[1].innerHTML = `${json.list[0].wind.speed + " м/с"}`
            details[2].innerHTML = sunrise(json.city.sunrise, json.city.timezone)
            details[3].innerHTML = `${json.list[0].main.humidity} %`
            details[4].innerHTML = dayDuration(json.city.sunrise, json.city.sunset, json.city.timezone)
            details[5].innerHTML = sunset(json.city.sunset, json.city.timezone)
            isDay(json)
            forecast.innerHTML = '';
            json.list.slice(0, 5).forEach(element => {
                forecast.innerHTML += `
                        <div class="forecast__item">
                                    <div class="forecast__time">${timeZoneTime(element.dt,json.city.timezone)}</div>
                                    <img class="forecast__icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png">
                                    <div class="forecast__temperature">${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                </div>
                        `

            });
            day1 = getDayWeekArray(day1, json.list, 1)
            day2 = getDayWeekArray(day1, json.list, 2)
            day3 = getDayWeekArray(day1, json.list, 3)
            day4 = getDayWeekArray(day1, json.list, 4)
            day1Weather.innerHTML = ''
            day1.forEach((element, index) => {
                if (index === 0) {
                    day1Weather.innerHTML += `
        <div class='col s2 m1'>Время:</div>
        <div class='col s3 m2'>Иконка:</div>
        <div class='col s4 m3'>Информация:</div>
        <div class='col s2 m2 hidden'>Влажность:</div>
        <div class='col s2 m2 hidden'>Ветер:</div>
        <div class='col s3 m2'>Температура:</div>
    
        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
        <div class='col s4 m3'>${element.weather[0]['description']}</div>
        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                 `
                } else {
                    day1Weather.innerHTML += `
        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
        <div class='col s4 m3'>${element.weather[0]['description']}</div>
        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                 `
                }
            })
            day2Weather.innerHTML = ''
            day2.forEach((element, index) => {
                if (index === 0) {
                    day2Weather.innerHTML += `
                        <div class='col s2 m1'>Время:</div>
                        <div class='col s3 m2'>Иконка:</div>
                        <div class='col s4 m3'>Информация:</div>
                        <div class='col s2 m2 hidden'>Влажность:</div>
                        <div class='col s2 m2 hidden'>Ветер:</div>
                        <div class='col s3 m2'>Температура:</div>
                    
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                } else {
                    day2Weather.innerHTML += `
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                }
            })
            day3Weather.innerHTML = ''
            day3.forEach((element, index) => {
                if (index === 0) {
                    day3Weather.innerHTML += `
                        <div class='col s2 m1'>Время:</div>
                        <div class='col s3 m2'>Иконка:</div>
                        <div class='col s4 m3'>Информация:</div>
                        <div class='col s2 m2 hidden'>Влажность:</div>
                        <div class='col s2 m2 hidden'>Ветер:</div>
                        <div class='col s3 m2'>Температура:</div>
                    
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                } else {
                    day3Weather.innerHTML += `
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                }
            })
            day4Weather.innerHTML = ''
            day4.forEach((element, index) => {
                if (index === 0) {
                    day4Weather.innerHTML += `
                        <div class='col s2 m1'>Время:</div>
                        <div class='col s3 m2'>Иконка:</div>
                        <div class='col s4 m3'>Информация:</div>
                        <div class='col s2 m2 hidden'>Влажность:</div>
                        <div class='col s2 m2 hidden'>Ветер:</div>
                        <div class='col s3 m2'>Температура:</div>
                    
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                } else {
                    day4Weather.innerHTML += `
                        <div class='col s2 m1'>${timeZoneTime(element.dt,json.city.timezone)}</div>
                        <div class='col s3 m2'> <img class="card-icon" src="https://openweathermap.org/img/wn/${element.weather[0]["icon"]}@2x.png"></img></div>
                        <div class='col s4 m3'>${element.weather[0]['description']}</div>
                        <div class='col s2 m2 hidden'>${element.main.humidity} %</div>
                        <div class='col s2 m2 hidden'>${element.wind.speed + " м/с"}</div>
                        <div class='col s3 m2'>${Math.round(element.main.temp - 273) + "&deg"+"C"}</div>
                                                 `
                }
            })


        })
        .catch((error) => {
            if (error.response === undefined) {
                M.toast({ html: 'Ничего не найдено по вашему запросу!' })
            }
        });
}

// tab сегодня и на 4 дня
function openTab(evt, name) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}
defaultOpen.click()
openWeek.click()

// функция для добавления 0 
Number.prototype.pad = function(size) {
    let time = String(this);
    if (time.length < (size || 2)) {
        time = "0" + time;
    }
    return time;
}

// добавить день к дате
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// функция для перевода миллисекунд (дата )
let getDay = (date) => {
    let day = new Date(date * 1000);
    return day
}

//выводит дни недели
let renderWeekDay = () => {
    let presentTime = new Date().addDays(1)
    weekday.forEach(div => {
        div.innerHTML = `
        <span>${presentTime.toLocaleString("Ru", option2)} </span>
        <span>${presentTime.toLocaleString("Ru", options)} </span>
        `
        presentTime = (presentTime.addDays(1))
    })
}
renderWeekDay()



// sunrise sunset
let sunrise = (jsonData, timezone) => {
    if (+getDay(jsonData).getUTCHours() + (timezone / 3600) > 24) {
        return (+getDay(jsonData).getUTCHours().pad() + (timezone / 3600 - 24)) + ':' + getDay(jsonData).getUTCMinutes().pad()
    } else return (+getDay(jsonData).getUTCHours().pad() + (timezone / 3600)) + ':' + getDay(jsonData).getUTCMinutes().pad()
}

let sunset = (jsonData, timezone) => {
    let hours = (+getDay(jsonData).getUTCHours().pad() + (timezone / 3600))
    if (hours < 0) {
        return (24 + hours) + ':' + getDay(jsonData).getUTCMinutes().pad()
    } else return hours + ':' + getDay(jsonData).getUTCMinutes().pad()
}

let dayDuration = (sunRis, sunSet, timezone) => {
    let rise = sunrise(sunRis, timezone).split(':')
    let set = sunset(sunSet, timezone).split(':')
    let durDay = [set[0] - rise[0], set[1] - rise[1]]
    if (durDay[1] < 0) {
        durDay[1] += 60
        durDay[0] -= 1
    }

    return durDay[0].pad() + ':' + durDay[1].pad()
}



let isDay = (json) => {
    let time = new Date
    let hours = time.getUTCHours()
    let timezone = json.city.timezone / 3600
    let sunrise = getDay(json.city.sunrise).getUTCHours() + timezone
    let sunset = getDay(json.city.sunset).getUTCHours() + timezone
    if (sunset < 0) {
        sunset = getDay(json.city.sunset).getUTCHours() + timezone + 24
    }
    if (sunrise < hours && hours <= sunset) {
        bg.classList.add('day');
        bg.classList.remove('night');
        cardContent.classList.add('day');
        cardContent.classList.remove('night')
    } else if (sunset < hours || hours <= sunrise) {
        bg.classList.add('night');
        bg.classList.remove('day')
        cardContent.classList.add('night');
        cardContent.classList.remove('day')
    }
}

let timeZoneTime = ((elDate, timezone) => {


    let hours = getDay(elDate).getUTCHours() + timezone / 3600;
    if (hours < 0) {
        return (24 + hours).pad() + ':' + getDay(elDate).getUTCMinutes().pad()
    } else if (hours >= 24) {
        return (hours - 24).pad() + ':' + getDay(elDate).getUTCMinutes().pad()
    } else return hours.pad() + ':' + getDay(elDate).getUTCMinutes().pad()


})



// фильтр по дню
let getDayWeekArray = (wkDay, json, day) => {
    let presentDay = new Date()
    day = presentDay.getDay() + day
    if (day >= 7) {
        day = day - 7
    }
    wkDay = json.filter(e => {
        return getDay(e.dt).getDay() == day
    })
    return wkDay
}


// определяет ваш город по IP
let url = 'https://api.ipify.org/?format=json';
async function fetchIp(url) {
    const response = await fetch(url);
    let ip = await response.json();
    return ip;
}
let getIp = () => {
    fetchIp(url).then(ip => {
        let ipCity = ip.ip;
        let ipCheck = `http://ip-api.com/json/${ipCity}?fields=city`
        return ipCheck
    }).then(ipCheck => {
        fetchIp(ipCheck).then((city) => {
            // return search.value = city.city
            let country = city.city
            return country
        }).then(country => {
            search.value = country
            searchCity()
            search.value = ''
        })
    })
}

searchBtn.addEventListener("click", searchCity)
getIp()