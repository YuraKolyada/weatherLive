import React, { Component } from 'react';
import './App.css';

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
      <div className="App">
      {fetching ? 
        (<div className="load">....Loading</div>)
        :
        (<div className="dataWeather">
          <span className='city'>{city}</span>
          <p className='time'>{time}</p>
          <p className='temperature'>{temperature}</p>
          <p className='weatherCode'>{weatherCode}</p>
        </div>
        )}
      </div>
    );
  }
}

export default App;
