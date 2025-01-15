'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PostRecommendationsData } from '../app/page';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <input type="text" className="border border-gray-300 rounded p-2 py-1.5 w-full" placeholder=""/>,
})

type SelectOption = {
  value: string;
  label: string;
}

interface Props {
  postRecommendationsData: PostRecommendationsData;
  setPostRecommendationsDataAction: (data: PostRecommendationsData) => void;
}

export const CityInput: React.FC<Props> = ({
  postRecommendationsData,
  setPostRecommendationsDataAction,
}) => {
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!postRecommendationsData.country) {
      return;
    }

    setLoading(true);
    axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country: postRecommendationsData.country })
      .then((response) => {
        setCities(response.data.data.map((city: string) => ({ value: city, label: city })));
        setLoading(false);
      });
  }, [postRecommendationsData.country]);

  return (
    <Select
      options={cities}
      value={cities.find((city) => city.value === postRecommendationsData.city)}
      onChange={(selectedOption) => {
        const target = selectedOption as SelectOption;
        setPostRecommendationsDataAction({
          ...postRecommendationsData,
          city: target?.value || '',
        });
      }}
      filterOption={(option, rawInput) => {
        return option.label.toLowerCase().startsWith(rawInput.toLowerCase());
      }}
      isLoading={loading}
    />
  );
};

