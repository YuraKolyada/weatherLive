import React from 'react';

export default function WeatherDetails({ city, temp }){
	return (
		<div className="weather-details">
			<p className="city">{city}</p>
			<p className="temperature">{temp} &deg; C</p>
		</div>

		)
}