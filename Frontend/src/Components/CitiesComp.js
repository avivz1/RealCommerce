import { useEffect, useState } from 'react';
import axios from 'axios';

function CitiesComp(props) {

    const [cities, setCities] = useState([props.data]);

    useEffect(() => {
        setCities(props.data)
    }, [props])


    const cityClicked = async (city) => {
        if (city.Key !== undefined && city.Key !== null) {
            let response = await axios.get('http://localhost:8000/weather/getweather/' + city.Key)
            city.weather = [response.data]
            props.callback(city);
        }
    }

    return (
        <div>
            {cities.length > 0 && cities.map((city, index) => {
                return <h1 key={index} onClick={() => cityClicked(city)}>{city.LocalizedName}</h1>
            })
            }

        </div>
    );
}

export default CitiesComp;
