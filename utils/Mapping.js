export const getFromWeatherCode = (code) => {
    switch(code){
        case 0 : return {description: 'clear sky', icon:'weather-sunny'}
        case 1 : return {description: 'mainly clear', icon:'weather-partly-cloudy'}
        case 2 : return {description: 'partly cloudy', icon:'weather-partly-cloudy'}
        case 3 : return {description: 'overcast', icon:'weather-cloudy'}
        case 45 : return {description: 'fog', icon:'weather-fog'}
        case 48 : return {description: 'fog', icon:'weather-fog'}
        case 51 : return {description: 'light drizzle', icon:'weather-partly-rainy'}
        case 53 : return {description: 'moderate drizzle', icon:'weather-partly-rainy'}
        case 55 : return {description: 'heavy drizzle', icon:'weather-partly-rainy'}
        case 61 : return {description: 'slight rain', icon:'weather-partly-rainy'}
        case 63 : return {description: 'moderate rain', icon:'weather-rainy'}
        case 65 : return {description: 'heavy rain', icon:'weather-rainy'}
        case 66 : return {description: 'light freezing rain', icon:'weather-rainy'}
        case 67 : return {description: 'heavy freezing rain', icon:'weather-rainy'}
        case 71 : return {description: 'slight snow fall', icon:'weather-partly-snowy'}
        case 73 : return {description: 'moderage snow fall', icon:'weather-snowy'}
        case 75 : return {description: 'heavy snow fall', icon:'weather-snowy-heavy'}
        case 77 : return {description: 'snow grains', icon:'weather-snowy'}
        case 80 : return {description: 'slight rain showers', icon:'weather-partly-rainy'}
        case 81 : return {description: 'moderate rain showers', icon:'weather-rainy'}
        case 82 : return {description: 'violent rain showers', icon:'weather-rainy'}
        case 85 : return {description: 'light snow showers', icon:'weather-snowy-rainy'}
        case 86 : return {description: 'heavy snow showers', icon:'weather-snowy-rainy'}
        default : return {description: 'thunderstorms', icon:'weather-lightning'}
    }
}

export function getDirection(angle) {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const icons = ['arrow-up', 'arrow-top-right', 'arrow-right', 'arrow-bottom-right', 'arrow-down', 'arrow-bottom-left', 'arrow-left', 'arrow-top-left'];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return {
        direction: directions[index],
        icon: icons[index]
    };
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const getDay = (time) => {
    const date = new Date(time)
    return days[date.getDay()]
}

export const capitalise = (string) => {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
 }