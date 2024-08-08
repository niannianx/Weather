let but=document.getElementById("but")
but.onclick=function find(){
let citys=document.getElementById("city").value;
let apikey='4c2c0ae0ab56470aa9a6d32f71eaae04';
// let url= 'https://geoapi.qweather.com/v2/city/lookup?location=beijing&key=${apikey}'
// let url= 'https://geoapi.qweather.com/v2/city/lookup?location=${citys}&key=${apikey}'
// let url= 'https://devapi.qweather.com/v7/weather/now??location=citys&key=apikey'
// let url = `https://cors-anywhere.herokuapp.com/https://geoapi.qweather.com/v2/city/lookup?location=${citys}&key=${apikey}`;
let url = `http://localhost:8080/https://geoapi.qweather.com/v2/city/lookup?location=${citys}&key=${apikey}`
// console.log(citys)

    console.log("111")
    // 输出URL以便调试
    console.log("URL:", url); 

    //测试公共API排除跨域问题
    // fetch('https://api.github.com')
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok ' + response.statusText);
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('GitHub API data:', data); // 成功请求，不是CORS问题
    // })
    // .catch(error => {
    //   console.error('There has been a problem with your fetch operation (GitHub):', error);
    // });


    // 使用fetch函数进行API调用
    fetch(url)
    .then(response => {
    // 检查响应状态
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    // 将响应转换为JSON
    return response.json();
    })
    .then(data => {
    // 处理和使用API返回的数据
    // console.log('Current Temperature in "citys":', location.name, '°C');
    // console.log('Current Temperature in "citys":', location.id, '°C');
    data.location.forEach(location => {
        console.log('Location Name:', location.name);
        console.log('Location ID:', location.id);
        let locationId=location.id
        console.log(locationId)
        let WeatherUrl=`http://localhost:8080/https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=${apikey}`
        console.log(WeatherUrl)
        //嵌套使用fetch函数进行天气API的调用
        fetch(WeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // 将响应转换为JSON
            return response.json();
        })
        .then(weatherData =>{
            // data.locationId.forEach(location => {
            //     let Temperature=LocationId.now.temp
            //     console.log(location.name,"温度",Temperature)
            // })
            console.log('Weather data:', weatherData);
            if (weatherData && weatherData.now) {
                let temperature = weatherData.now.temp;
                console.log(`${location.name} 温度: ${temperature}°C`);
            } else {
                console.error('Weather data format is incorrect or no data returned');
            }


                // let Temperature=weatherData.now.temp
                // console.log(location.name,"温度",Temperature)

        })
    })
    })
    .catch(error => {
    // 处理任何错误
    console.error('There has been a problem with your fetch operation:', error);
    });
}