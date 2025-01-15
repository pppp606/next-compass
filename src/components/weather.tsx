/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ForecastDay } from '../app/api/weather/route';

interface Props {
  city: string
  userCountry: string
}

const defaultForecast: ForecastDay = {
  date: '',
  date_epoch: 0,
  day: {
    maxtemp_c: 0,
    maxtemp_f: 0,
    mintemp_c: 0,
    mintemp_f: 0,
    maxwind_mph: 0,
    maxwind_kph: 0,
    condition: {
      text: '',
      icon: '',
      code: 0,
    },
    uv: 0,
  },
};

export const Weather: React.FC<Props> = ({
  city,
  userCountry,
}) => {
  const [forecast, setForecast] = useState<ForecastDay>(defaultForecast);
  const [loading, setLoading] = useState(false);

  const getUvRisk = (uv: number) => {
    if (uv <= 2) return "Low Risk";
    if (uv <= 5) return "Moderate Risk";
    if (uv <= 7) return "High Risk";
    return "Very High Risk";
  };

  const getWindDescription = (speed: number) => {
    if (speed <= 20) return "Light Breeze";
    if (speed <= 38) return "Moderate Breeze";
    if (speed <= 61) return "Strong Wind";
    return "Gale";
  };

  useEffect(() => {
    if (!city) {
      return;
    }

    setLoading(true);
    axios.get(`/api/weather?city=${city}`)
      .then((response) => {
        setForecast(response.data.forecast);
        setTimeout(() => setLoading(false), 500);
      });
  }, [city]);

  return (
    <div>
      {loading ?
        (<p className='text-right pt-8'>
          <span
            className={`text-xl inline-block px-1 duration-[4000ms] ld ld-bounce`}
            style={{ animationDuration: '0.5s' }}
          >
            💨
          </span>
          <span
            className={`text-xl inline-block px-1 duration-[4000ms] ld ld-bounce`}
            style={{ animationDuration: '1s' }}
          >
            💨
          </span>
          <span
            className={`text-xl inline-block px-1 duration-[4000ms] ld ld-bounce`}
            style={{ animationDuration: '2s' }}
          >
            💨
          </span>
        </p>)
        : (
          <div>
            <h3 className='text-sm text-bold text-right'>Today&apos;s Weather</h3>
            <ul className='text-sm text-right text-gray-700'>
              <li className='flex items-center justify-end'>
                {forecast.day.condition.icon !== '' && (
                  <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} className='w-8 mr-2' />
                )}
                {userCountry !== 'United States' ? `${forecast.day.mintemp_c} - ${forecast.day.maxtemp_c}°C` : `${forecast.day.mintemp_f} - ${forecast.day.maxtemp_f}°F`}
              </li>
              <li>UV : {getUvRisk(forecast.day.uv)}</li>
              <li>Wind: {getWindDescription(forecast.day.maxwind_kph)}</li>
            </ul>
          </div>
        )}
    </div>
  );
};

