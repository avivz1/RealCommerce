import { useEffect, useState } from 'react';


function CityDetailsComp(props) {

    const [city, setCity] = useState([props.data]);

    useEffect(() => {
        setCity(props.data)
    }, [props])

    const addCityToFavorites = () => {
        props.addCallBack(city)
    }

    const removeFromFavorites = () => {
        props.removeCallBack(city)
    }

    return (
        <div >


            <div className='textDetailsDiv'>
                <h1 className='cityText'>{city.Version ? city.LocalizedName : 'empty'} </h1>
                <h1 className='cityText'>{city.Version ? city.weather[0].weatherText : 'empty'}  {city.Version ? city.weather[0].temperature : 'empty'}c</h1>
            </div>


            <div className='cityElementsDiv'>
                {props.page=='home' && <button className='favoriteButton' onClick={() => { addCityToFavorites() }} > Add to Favorites</button>}
                {props.page == 'favorites' && <button className='favoriteButton' onClick={() => { removeFromFavorites() }} > Remove from Favorites</button>}
                <img className='heartLogo' src="images/heartlogo.png" alt="HeartLogo" />
            </div>



        </div>


    );
}

export default CityDetailsComp;
