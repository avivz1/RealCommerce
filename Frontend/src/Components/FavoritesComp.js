import { useEffect, useState } from 'react';
import CityDetailsComp from './CityDetailsComp'
import axios from 'axios';

function FavoritesComp() {

    const [favoritesCities, setFavoritesCities] = useState([]);


    useEffect(() => {
        let arr = []
        for (const [key, value] of Object.entries(localStorage)) {
            arr.push({ cityName: JSON.parse(value), cityKey: key })
        }
        if (favoritesCities.length === 0) {
            fetchData(arr)
        }
        async function fetchData(arr) {
            let response = await axios.post('http://localhost:8000/weather/getFewCitiesWeather', arr)
            setFavoritesCities(response.data)
        }
    }, [favoritesCities.length])


    const removeFromFavorites = (city) => {
        localStorage.removeItem(city.Key);
        setFavoritesCities(favoritesCities.filter(favCity => favCity.Key !== city.Key))
    }


    return (
        <div>
            <h1>Favorites</h1>
            {favoritesCities.length > 0 && favoritesCities.map((favCity, index) => {
                return <CityDetailsComp removeCallBack={removeFromFavorites} page={'favorites'} key={index} data={favCity} />
            })}
        </div>
    );
}

export default FavoritesComp;
