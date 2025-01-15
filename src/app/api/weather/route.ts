import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export type ForecastDay = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
};

export type WeatherResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: Record<string, never>;
  forecast: {
    forecastday: ForecastDay[];
  };
};

export async function GET(request: NextRequest) {
  try {
    const city = request.nextUrl.searchParams.get('city')?.trim();

    if (!city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const weather: WeatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${process.env.WEATHER_API_KEY}`).then((response) => response.data);

    return NextResponse.json({ forecast:weather.forecast.forecastday[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
