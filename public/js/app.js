const form = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')
const icon = document.querySelector('#icon')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    icon.src = ''
    result.textContent = ''

    fetch('http://localhost:3000/weather?city=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                result.textContent = data.error
            }
            else
            {
                icon.src = data.weather_icons

                const array = [
                    `City: ${data.city}`,
                    `Country: ${data.country}`,
                    `Weather: ${data.weather}`,
                    `Temparature: ${data.temperature}°C`, 
                    `Feels like: ${data.feelslike}°C`
                ]

                let table = document.createElement('table')

                for (var r = 0; r < array.length; r++) {
                    var row = document.createElement('tr')

                    var column = document.createElement('td')
                    var text = document.createTextNode(array[r])

                    column.appendChild(text)
                    row.appendChild(column)

                    table.appendChild(row)
                }

                result.appendChild(table)
            }
            
        })
    })
})