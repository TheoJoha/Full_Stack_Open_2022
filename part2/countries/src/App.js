import { useState, useEffect } from 'react'
import axios from 'axios'

var fetchCount = 0

const Displayer = (props) => {
  const [weather, setWeather] = useState('')
  let lengthVar = props.countries
  let lng = 0
  let lat = 0

  // get longitute and latitude   
  let longLatArr = []
  longLatArr.push(props.countries.map(country => country.latlng))
  let arrCount = 0
  for (let i = 0; i < longLatArr[0].length; i++) {
    if (i == 0) {
      lng = longLatArr[0][0][0]
      lat = longLatArr[0][0][1]
    }
  }


  // http://www.7timer.info/doc.php?lang=en#api - weather API website
  let weatherAPIString = "https://www.7timer.info/bin/astro.php?lon=" + lng + "&lat=" + lat + "&ac=0&unit=metric&output=json&tzshift=0"
  useEffect(() => {
    axios
      .get(weatherAPIString)
      .then(response => {
        setWeather(response.data)
        fetchCount += 1
        console.log(fetchCount)
      })
  }, [props.newCountry]);


  if (lengthVar.length == 1) {
   
  
   // get languages
   let langVar = []
   let arrOfLang = []
   arrOfLang.push(props.countries.map(country => country.languages ))
   for (var key in arrOfLang[0][0]) {
    langVar.push(arrOfLang[0][0][key])
   }
    return (
        <><>
        <h2>{props.countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}</h2>
        </><>
          {props.countries.map(country => <div key={country.name.common}>{country.capital}</div>)}
        </><>
          {props.countries.map(country => <div key={country.name.common}>Area: {country.area}</div>)}
        </><>
          {props.countries.map(country => <div key={country.name.common}>{country.flag}</div>)}
        </><>
        <>
        <b>Languages: </b>
        </>
         {langVar.map(lang => <div key={lang}>{lang}</div>)} 
         <div>
         <b>Weather in {props.countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}</b>
         </div>
         <div>
         cloudcover: {weather.dataseries[0].cloudcover }
         </div>
         <div>
         temp2m (C): {weather.dataseries[0].temp2m }
         </div>
         <div>
         transparency: {weather.dataseries[0].transparency }
         </div>
       </></>
    )
  }
  if (lengthVar.length > 1 && lengthVar.length <= 10) {
    return (
      <>
      {props.countries.map(country => <div key={country.name.common}>
        {country.name.common}
        </div>)}
      </>
    )
  }
  if (lengthVar.length > 10) {
    return (
      <>
      Too many matches specify another filter
      </>
    )
  }
  
}


function App(props) {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
    changeCountry(event.target.value)
  }

  function changeCountry(search) {
    let arrSearch = []
    if (search.length == 0) {
      arrSearch = countries
    }
    else {
      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < search.length; j++) {
          if (JSON.stringify(search[j]).toUpperCase() !== JSON.stringify(countries[i].name.common[j]).toUpperCase()) {
            break
          }
          if (search.length - 1 == j) {
            arrSearch.push(countries[i])
          }
        }
      }
    }
    // Set countries to show
    setCountriesToShow(arrSearch)

  }


  return (
    <>
    <div>
    find countries <input
    value={newCountry}
    onChange={handleCountryChange}
    />
    </div>
    <div>
      <Displayer countries={countriesToShow} newCountry={newCountry}  />
    </div>
    </>
  );
}


export default App;
