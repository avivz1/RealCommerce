var express = require('express');
var router = express.Router();
const locationBL = require('../BL/LocationBL')


router.get('/getlocation/:q', async function (req, res, next) {

    try{
        let response = await locationBL.getAutoComplete(req.params.q)
        if (response != false) {
            return res.json(response)
        }
        return res.json(false)

    }catch(e){
        console.log(e)
        return res.json(false)
    }


});


module.exports = router;

