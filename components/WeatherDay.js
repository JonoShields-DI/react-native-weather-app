import { StyleSheet, Text, View } from "react-native"
import { capitalise, getDay, getFromWeatherCode } from "../utils/Mapping"
import {MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

const WeatherDay = ({weather}) => {
    const weatherFromCode = getFromWeatherCode(weather.weathercode)
    return (
        <View style={styles.container}>
            <Text style={styles.bigText}>{getDay(weather.time).toUpperCase()}</Text>
            <View style={styles.leftContainer}>
                <MaterialCommunityIcons style={styles.icon} name={weatherFromCode.icon} size={50} color={'black'}/>
                <Text style={styles.weatherDescription}>{capitalise(weatherFromCode.description)}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.text}>
                    <FontAwesome5 name="temperature-high" size={20} color="black" />
                    {weather.maxTemp}
                </Text>
                <Text style={styles.text}>
                <FontAwesome5 name="temperature-low" size={20} color="black" />
                    {weather.minTemp}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgray',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    leftContainer:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: "40%",
    },
    rightContainer:{
        padding: 0,
        justifyContent: 'center',
        alignItems:'flex-start',
        textAlign:'right'
    },
    text: {
        fontSize: 22,
        textAlign: "right",
        padding: 0,
    },
    bigText: {
        fontSize: 40,
        width: 120,
        paddingTop: 10,
    },
    icon: {
        paddingRight: 10,
    },
    weatherDescription:{
        width:90
    }
})

export default WeatherDay