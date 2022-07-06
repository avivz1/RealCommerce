
const axios = require('axios')
const URL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?';
const apiKey = 'apikey=gGAWPNqyZVuAuOzDsHAWRAvAuzyvkV3e'

const getAutoComplete =  (userQuery) => {
    return new Promise(async(resolve, reject) => {
        try {
            let res = await axios.get(URL + apiKey + '&q=' + userQuery)
            if (res.data.length == 0) {
                resolve(false);
            } else {
                resolve(res.data);
            }
        } catch (e) {
            console.log(e)
            reject(e);
        }
    })

}


module.exports = { getAutoComplete }