import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { capitalise, getDirection, getFromWeatherCode } from './utils/Mapping';
import WeatherDay from './components/WeatherDay';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await fetchData(location)
    })();
  }, []);

  const fetchData = async (location) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`)
    const data = await response.json()
    if(data){
      setWeatherData(data)
    }
    let weatherDataByDay = []
    for(let i = 0; i < 7; i++){
      const day = {
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
        maxTemp: data.daily.temperature_2m_max[i] + data.daily_units.temperature_2m_max,
        minTemp: data.daily.temperature_2m_min[i] + data.daily_units.temperature_2m_min,
        weathercode: data.daily.weathercode[i],
        time: data.daily.time[i]
      }
      weatherDataByDay.push(day)
    }
    console.log(weatherDataByDay)
    setDailyWeather(weatherDataByDay)
  }

  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      {
        weatherData &&
        <>
          <Text style={styles.bigText}>RIGHT NOW</Text>
          <View style={styles.todayContainer}>
            <View style={styles.innerContainer}>
              <MaterialCommunityIcons style={[styles.icon, !weatherData.current_weather.is_day && styles.night ]} name={getFromWeatherCode(weatherData.current_weather.weathercode).icon} size={100} color="black" />
              <Text>{capitalise(getFromWeatherCode(weatherData.current_weather.weathercode).description)}</Text>
            </View>
            <View style={styles.innerContainer}>
              <MaterialCommunityIcons style={styles.icon} name={getDirection(weatherData.current_weather.winddirection).icon} size={100} color="black" />
              <Text>{weatherData.current_weather.windspeed + " kmh " + getDirection(weatherData.current_weather.winddirection).direction}</Text>
            </View>
            <View style={styles.innerContainer}>
              <Text style={styles.tempDisplay}>{weatherData.current_weather.temperature}°C</Text>
              <Text>Temperature</Text>
            </View>
          </View>
          <FlatList data={dailyWeather} renderItem={({item}) => <WeatherDay weather={item}/>}/>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bigText: {
    fontSize: 40,
    paddingTop: 40,
  },
  todayContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  innerContainer:{
    flex:1,
    alignItems: 'center'
  },
  tempDisplay:{
    paddingTop: 23,
    paddingBottom: 23,
    fontSize:40,
    fontWeight: '700'
  },
  night: {
    color: 'blue'
  }
});