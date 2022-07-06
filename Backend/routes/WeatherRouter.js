var express = require('express');
var router = express.Router();
const weatherBL = require('../BL/WeatherBL')


router.get('/getweather/:locationkey', async function (req, res, next) {
    try {
        let response = await weatherBL.getCurrentWeather(req.params.locationkey)
        if (response != null) {
            return res.json(response)
        }
        return res.json(false)

    } catch (e) {
        console.log(e)
        return res.json(false)
    }


});
router.post('/getFewCitiesWeather', async function (req, res, next) {

    
    let response = await weatherBL.getCurrentWeatherForOneOrMore(req.body);
    if (response == false) {
        res.json(false)
    } else {
        res.json(response)
    }
});


module.exports = router;
