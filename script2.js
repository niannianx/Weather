
let but = document.getElementById("but");
but.onclick = function find() {
    let citys = document.getElementById("city").value;
    let apikey = '4c2c0ae0ab56470aa9a6d32f71eaae04';
    let url = `https://geoapi.qweather.com/v2/city/lookup?location=${citys}&key=${apikey}`;

    console.log("Fetching city data...");
    console.log("URL:", url);

    // 使用 fetch 函数进行城市数据的 API 调用
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('City lookup data:', data);

        if (data && data.location && data.location.length > 0) {
            // 选择第一组数据
            let firstLocation = data.location[0];
            console.log('First Location Name:', firstLocation.name);
            console.log('First Location ID:', firstLocation.id);
            let locationId = firstLocation.id;
            let WeatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=${apikey}`;

            console.log('Weather URL:', WeatherUrl);

            // 嵌套使用 fetch 函数进行天气数据的 API 调用
            fetch(WeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(weatherData => {
                console.log('Weather data:', weatherData);

                if (weatherData && weatherData.now) {
                    let temperature = weatherData.now.temp;
                    console.log(`${firstLocation.name} 温度: ${temperature}°C`);
                    document.getElementById("tempNumber").innerHTML=temperature
                    let icon=weatherData.now.icon
                    console.log(icon)
                    const imageElement = document.getElementById('image');
                    const textElement=document.getElementById('text')
                    let text=weatherData.now.text
                    textElement.innerHTML=text
                    function changeImage(icon){
                        const imageName='./photo/'+icon+'.svg'
                        imageElement.src=imageName
                    }
                    changeImage(icon)
                } else {
                    console.error('Weather data format is incorrect or no data returned');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation (Weather):', error);
            });
        } else {
            console.error('City lookup data format is incorrect or no data returned');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation (City Lookup):', error);
    });
}
