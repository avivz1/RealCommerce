const axios = require('axios')
const URL = 'http://dataservice.accuweather.com/currentconditions/v1/';
const apiKey = 'apikey=gGAWPNqyZVuAuOzDsHAWRAvAuzyvkV3e'
const dataBaseBL = require('../BL/DataBaseBL')
const locationBL = require('../BL/LocationBL')


const getCurrentWeather = async (locationKey) => {
    return new Promise(async (resolve, reject) => {
        let isWeatherExistsInDB = false;
        let obj = {}

        try {
            await dataBaseBL.startDB()
        } catch (e) {
            console.log(e.message)
            reject(e)
        }
        try {
            await dataBaseBL.createTable()
        } catch (e) {
            console.log(e.message)
            //dont reject, the table already created
        }
        try {
            isWeatherExistsInDB = await dataBaseBL.isWeatherDetailsAlreadyExists(locationKey)
        } catch (e) {
            console.log(e);
        }
        //if the weather not in the DB. (initial false)
        if (isWeatherExistsInDB == false) {

            console.log('Request to External API getCurrentWeather()')
            axios.get(URL + locationKey + '?' + apiKey).then(async (res) => {

                if (res.data.length == 0) {
                    resolve(false);

                } else {
                    obj = {
                        cityKey: locationKey,
                        weatherText: res.data[0].WeatherText,
                        temperature: res.data[0].Temperature.Metric.Value,
                    }
                    try {
                        await dataBaseBL.insertWeatherDetails(obj);
                    } catch (e) {
                        console.error(e)
                    }
                    resolve(obj);
                }

            })
        } else {
            resolve(isWeatherExistsInDB);
        }
    })

}

const getCurrentWeatherForOneOrMore = (arr) => {
    return new Promise(async (resolve, reject) => {

        let requestsArr = []
        let dataArr = []
        let getWeather = []
        //get autoComplete Promises
        arr.forEach(obj => {
            requestsArr.push(locationBL.getAutoComplete(obj.cityName))
        });
        const allPromises = Promise.all(requestsArr);
        const list = await allPromises;

        if (list.includes(undefined || false)) {
            reject(false);
        } else {
            //if query 'tel aviv' can get various 'tel aviv' so need to filter by cityKey for one way match
            list.filter(arrObj => {
                arrObj.forEach(city => {
                    if (arr.some(element => element.cityKey == city.Key)) {
                        dataArr.push(city)
                    }
                })
            })
            //get weather details 
            dataArr.forEach(obj => {
                getWeather.push(getCurrentWeather(obj.Key))
            })

            const weatherPromises = Promise.all(getWeather);
            const weatherList = await weatherPromises;

            if (weatherList.includes(undefined || false)) {
                reject(false);
            } else {
                //attaching the weatherDetails to the returned objects array
                dataArr.forEach(cityDetails => {
                    let cityWeather = weatherList.filter(c => c.city_key == cityDetails.Key)
                    cityDetails.weather = cityWeather;
                });
                resolve(dataArr)
            }

        }
    })

}

module.exports = { getCurrentWeatherForOneOrMore, getCurrentWeather }



