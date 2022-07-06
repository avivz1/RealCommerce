const sqlite3 = require('sqlite3').verbose();
let db;


const startDB = async () => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database('./db_realcommerce.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }

        });
    })
}

const createTable = async () => {
    return new Promise((resolve, reject) => {
        const query = 'CREATE TABLE weather(city_key INTEGER PRIMARY KEY,weatherText ,temperature);';
        db.run(query, (err) => {
            if (err) {
                console.log('Some Error Occured');
                reject(err)
            } else {
                console.log('Table Created');
                resolve(true)
            }
        });
    })

}

const insertWeatherDetails = async (weatherObj)=> {
    return new Promise((resolve, reject) => {

        let insertQuery = 'INSERT INTO weather(city_key ,weatherText ,temperature) VALUES (?,?,?)'

        db.run(insertQuery, [weatherObj.cityKey, weatherObj.weatherText, weatherObj.temperature],
            (err) => {
                if (err) {
                    console.error(err.message)
                    reject(err);
                } else {
                    console.log('A new row has been created');
                    resolve(true);
                }
            })

    })
}

const isWeatherDetailsAlreadyExists = async (cityKey)=> {
    let selectQuery = 'SELECT * FROM weather'
    return new Promise((resolve, reject) => {
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                console.error(err.message)
                reject(err);
            } else {
                rows.forEach((row) => {
                    if (row.city_key == cityKey) {
                        resolve(row);
                    }
                })
                resolve(false);
            }
        })

    })
}


module.exports = {createTable, startDB, isWeatherDetailsAlreadyExists, insertWeatherDetails }


