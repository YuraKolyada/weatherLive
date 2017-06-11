import React, { Component } from 'react';
import './App.css';
import WeatherIcon from './components/WeatherIcon';
import WeatherDetails from './components/WeatherDetails'

class App extends Component {
  constructor(){
    super();

    this.state = {
      icon: '',
      temperature: '',
      time: 1,
      city: '',
      weatherCode: '',
      fetching: true
    }
  }

  componentDidMount(){
    this.fetchIP();
  }

  fetchingDataWeather = city => {
    const baseUrl = 'http://api.openweathermap.org/',
      urlCity = `data/2.5/weather?q=${city}`,
      appId = '1b76d1baa4aa38dd2a2f20fa20734f37',
      otherOptions = `&units=metric&lang=ru&appId=${appId}`;

    fetch(`${baseUrl}${urlCity}${otherOptions}`)
      .then(response => response.json())
      .then(data => {
        let date = new Date(),
          time = date.getHours();

        this.setState({
          time,
          city,
          temperature: Math.round(data.main.temp),
          weatherCode: data.weather[0].id,
          fetching: false
        });
      })
      .catch(error => console.log(error))
  }

  fetchIP = () => {
    fetch(`//freegeoip.net/json/`)
      .then((response) => response.json())
      .then(({ city }) => this.fetchingDataWeather(city))
      .catch((error) => console.log(error));
  }

  render() {
    let {time, city, temperature, weatherCode, fetching, icon} = this.state;
    return (
      fetching ? 
        (<div className="app">....Loading</div>)
        :
        ( <div className="app" data-hour={time}>
            <WeatherIcon 
              time={time} 
              weatherCode={weatherCode} />
            <WeatherDetails
              city={city}
              temp={temperature} />
          </div>
        )
    );
  }
}

export default App;
