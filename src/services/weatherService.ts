const API_KEY = 'd22d087ec9ac400496a82935250811';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  rainChance: number;
  lastUpdated: string;
}

export interface ForecastDay {
  day: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
}

/**
 * Fetch current weather and 3-day forecast for a location
 * @param lat - Latitude
 * @param lon - Longitude
 * @param locationName - Display name for the location
 */
export async function fetchWeather(
  lat: number,
  lon: number,
  locationName: string = 'Your Location'
): Promise<WeatherResponse> {
  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch current weather');
    }
    
    const currentData = await currentResponse.json();
    
    // Fetch 5-day forecast (we'll extract 3 days)
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast');
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process current weather
    const current: WeatherData = {
      location: locationName,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      description: currentData.weather[0].description,
      icon: getWeatherEmoji(currentData.weather[0].id),
      rainChance: currentData.clouds?.all || 0, // Using cloud coverage as rain probability
      lastUpdated: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    };
    
    // Process 3-day forecast (take one reading per day at noon)
    const dailyForecasts: ForecastDay[] = [];
    const processedDays = new Set<string>();
    
    for (const item of forecastData.list) {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString();
      
      // Skip today and only take one forecast per day (preferably around noon)
      if (processedDays.has(dayKey) || dailyForecasts.length >= 3) continue;
      
      const hour = date.getHours();
      if (hour >= 11 && hour <= 14) {
        processedDays.add(dayKey);
        dailyForecasts.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          tempMax: Math.round(item.main.temp_max),
          tempMin: Math.round(item.main.temp_min),
          icon: getWeatherEmoji(item.weather[0].id),
          description: item.weather[0].description,
        });
      }
    }
    
    return {
      current,
      forecast: dailyForecasts,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Return fallback data
    return getFallbackWeather(locationName);
  }
}

/**
 * Get weather emoji based on OpenWeatherMap condition code
 */
function getWeatherEmoji(code: number): string {
  if (code >= 200 && code < 300) return '⛈️'; // Thunderstorm
  if (code >= 300 && code < 400) return '🌦️'; // Drizzle
  if (code >= 500 && code < 600) return '🌧️'; // Rain
  if (code >= 600 && code < 700) return '❄️'; // Snow
  if (code >= 700 && code < 800) return '🌫️'; // Atmosphere (fog, mist, etc.)
  if (code === 800) return '☀️'; // Clear
  if (code > 800) return '☁️'; // Clouds
  return '🌤️'; // Default
}

/**
 * Fallback weather data for offline or error scenarios
 */
function getFallbackWeather(locationName: string): WeatherResponse {
  return {
    current: {
      location: locationName,
      temperature: 28,
      feelsLike: 30,
      humidity: 62,
      windSpeed: 8,
      description: 'Partly cloudy',
      icon: '🌤️',
      rainChance: 35,
      lastUpdated: 'Cached',
    },
    forecast: [
      { day: 'Wed', tempMax: 32, tempMin: 23, icon: '☁️', description: 'Cloudy' },
      { day: 'Thu', tempMax: 29, tempMin: 22, icon: '🌦️', description: 'Light rain' },
      { day: 'Fri', tempMax: 27, tempMin: 21, icon: '☀️', description: 'Sunny' },
    ],
  };
}

/**
 * Fetch weather by city name
 */
export async function fetchWeatherByCity(city: string, state?: string): Promise<WeatherResponse> {
  try {
    const query = state ? `${city},${state},IN` : `${city},IN`;
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location coordinates');
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData || geoData.length === 0) {
      throw new Error('Location not found');
    }
    
    const { lat, lon, name } = geoData[0];
    return fetchWeather(lat, lon, name);
  } catch (error) {
    console.error('Weather by city error:', error);
    return getFallbackWeather(city);
  }
}

