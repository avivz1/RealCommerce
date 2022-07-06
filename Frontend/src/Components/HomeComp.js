import { useEffect, useState } from 'react';
import axios from 'axios';
import CitiesComp from './CitiesComp'
import CityComponent from './CityDetailsComp'
import styles from '../styles.css'


function HomeComp() {

    const [inputValue, setInputValue] = useState("");
    const [citiesDiv, setCitiesDiv] = useState(false);
    const [citiesData, setCitiesData] = useState([]);
    const [cityDetails, setCityDetails] = useState({});

    useEffect(() => {

    }, [])

    const onChangeHandler = event => {
        setInputValue(event.target.value);
    };

    const submitValue = async () => {
        let response = await axios.get('http://localhost:8000/location/getlocation/' + inputValue)
        setCitiesData(response.data)
        setCitiesDiv(true)
    }

    const addToFavorites = (city)=>{
        if(localStorage.getItem(city.Key)===undefined || localStorage.getItem(city.Key)==null){
            localStorage.setItem(city.Key,JSON.stringify(city.LocalizedName));
        }
    }


    return (
        <div>
            <h1>Home Page</h1>
            <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={inputValue}
            />
            <button onClick={submitValue}>Search</button>
      
            <div className='container'>

            <div className='col-1'>
                {cityDetails.Key && <CityComponent addCallBack={addToFavorites} page={'home'} data={cityDetails} />}

            </div>

            <div className='col-2'>
                {citiesDiv && <CitiesComp callback={(city) =>setCityDetails(city)} data={citiesData} />}
            </div>

            </div>
        </div>
    );
}

export default HomeComp;








{/* <div className="split left">
                <div className="centered">
                        <p>left</p>
                </div>
            </div>

            <div className='vertical' ></div>

            <div className="split right">
                <div className="centered">
                        <p>right</p>
                </div>
            </div> */}