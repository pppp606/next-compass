/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { questions } from '@/components/questions';
import { Button } from '@/components/button';
import { RecommendationsCity } from '@/services/recommendations';
import { CountryInput } from '@/components/countryInput';
import axios from 'axios';

export type PostRecommendationsData = {
  country: string,
  city: string,
  answers: string[],
};

export default function Page() {
  const [iconMove, setIconMove] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [postRecommendationsData, setPostRecommendationsData] = useState<PostRecommendationsData>({
    country: '',
    city: '',
    answers: [],
  });
  const [recommendations, setRecommendations] = useState<RecommendationsCity[]>([]);
  const [moreRecommendationIndex, setMoreRecommendationIndex] = useState(0);

  const stepCurrentLocation = () => {
    setTimeout(() => {
      setIconMove(true);
      setTimeout(() => {
        setStep(1);
      }, 400);
    }, 100);
  }

  const nextStep = () => {
    setTimeout(() => {
      setStep(step + 1);
    }, 200);
  }

  const sendAnswers = async () => {
    nextStep();
    axios.post('/api/recommendations', postRecommendationsData).then((result) => {
      setRecommendations(result.data.recommendations);
      setStep(13);
    });
  };

  return (
  <div
    className="h-screen"
    style={{
      backgroundImage: `url('./bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <div
      className={`bg-white h-screen overflow-auto w-full flex items-start justify-center duration-[600ms] ${step === 14 ? "bg-opacity-90" : "bg-opacity-80"}`}
      >
      {step < 13 && (
        <div className={`p-4 w-[490px] duration-[600ms] ${step === 0 ? "pt-32" : "pt-8"}`}>
          {step < 12 && (
            <div className={`flex items-center mb-6 duration-[250ms] ${step === 0 ? "opacity-100" : "opacity-0"}`}>
              <span
                className={`text-3xl block px-4 duration-[1850ms] ${iconMove ? "ld ld-slide-rtl" : ""}`}
              >
                🚚
              </span>
              <span
                className={`text-6xl block px-4 duration-[1400ms] ${iconMove ? "ld ld-slide-rtl" : ""}`}
              >
                🚚
              </span>
              <span
                className={`text-4xl block px-4 duration-[2400ms] ${iconMove ? "ld ld-slide-rtl" : ""}`}
              >
                🚚
              </span>
            </div>
          )}
          {step === 0 && (
            <>
              <div className="flex justify-center mb-6 text-6xl">
                <h1>Next Compass</h1>
              </div>
              <p className="text-center text-xl mb-6">
                Discover Your Next Chapter.<br />
                Find the perfect location for the life you want to live.
              </p>
              <div className="text-center">
                <Button label="Let’s begin by answering 10 quick questions!" onClick={stepCurrentLocation} />
              </div>
            </>
          )}
          {step >= 1 && step <= 11 && (
            <div className=''>
              <div className={`relative duration-[700ms] ${step === 1 ? "opacity-100 h-96" : "opacity-0 h-0"} transition-all`}>
                <h2 className='text-2xl font-bold mb-6'>Where do you currently live? (Country/City)</h2>
                <div className='flex flex-col mb-6'>
                  <div className='mb-4'>
                    <label className='text-md font-bold mb-2'>Country</label>
                    <CountryInput
                      postRecommendationsData={postRecommendationsData}
                      setPostRecommendationsDataAction={setPostRecommendationsData}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='text-md font-bold mb-2'>City</label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded p-2 w-full"
                      placeholder="e.g., New York"
                      onChange={(e) => setPostRecommendationsData({ ...postRecommendationsData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <Button label="Next" onClick={() => {
                    if (postRecommendationsData.country === '' || postRecommendationsData.city === '') {
                      alert('Please enter your current location.');
                      return;
                    }
                    nextStep()
                  }} />
                </div>
              </div>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`relative duration-[700ms] ${step === index + 2 ? "opacity-100 h-96" : "opacity-0 h-0"} transition-all`}
                >
                  <h2 className='text-2xl font-bold mb-6 text-center'>{question.question}</h2>
                  {question.options.map((option, qIndex) => (
                    <div key={qIndex} className='mb-6'>
                      <Button
                        label={option}
                        onClick={() => {
                          const answers = postRecommendationsData.answers;
                          answers[step - 2] = String.fromCharCode('a'.charCodeAt(0) + qIndex);
                          setPostRecommendationsData({ ...postRecommendationsData, answers });

                          if (step === 11) {
                            sendAnswers();
                          }
                          nextStep();
                        }}
                        addClass={`w-full`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {step === 12 && (
            <div className={`flex items-center mb-6 justify-center pt-8`}>
              <span
                className={`text-[256px] block px-4 ld ld-vortex`}
                style={{ animationDuration: '4.5s' }}
              >
                🌎
              </span>
            </div>
          )}
        </div>
      )}
      {step === 13 && (
        <div className='w-full md:max-w-6xl p-4 pt-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {recommendations.map((recommendation, index) => (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow"
                key={index}
              >
                <img
                  className="rounded-t-lg w-full object-cover h-[180px]"
                  src={recommendation.images[0]}
                  alt=""
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {recommendation.name}
                  </h5>
                  <p className="mb-4 font-normal text-gray-700 line-clamp-3">
                    {recommendation.reasons}
                  </p>
                  <div className="text-right">
                    <a
                      className="text-white text-sm font-bold p-2 px-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 cursor-pointer"
                      onClick={() => {
                        setMoreRecommendationIndex(index);
                        setStep(14);
                      }}
                    >
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {step === 14 && (
        <div className='w-full md:max-w-6xl p-4 pt-8'>
          <div
            className='flex items-center justify-between mb-4'
          >
            <div className='flex items-center'>
              <button
                className='hover:bg-gray-100 p-2 rounded-full mr-2'
                onClick={() => setStep(13)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
              </button>
              <h2
                className='text-4xl font-bold'
              >{recommendations[moreRecommendationIndex].name}</h2>
            </div>
            <div className='flex items-center'>
              <button
                className='text-gray-500 hover:text-gray-800 flex items-center'
                onClick={() => {
                  window.open(`https://www.google.com/maps/place/${recommendations[moreRecommendationIndex].name}`);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>
                <span className='ml-1'>Google Maps</span>
              </button>
              <span className='px-4'> | </span>
              <button
                className='text-gray-500 hover:text-gray-800 flex items-center'
                onClick={() => {
                  window.open(`https://en.wikipedia.org/wiki/${recommendations[moreRecommendationIndex].name}`);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z"/></svg>
                <span className='ml-1'>Wikipedia</span>
              </button>
            </div>
          </div>
          <div className='mb-6 max-w-xl leading-8 ml-12'>
            {recommendations[moreRecommendationIndex].reasons}
          </div>
          <div className="columns-2 md:columns-4 gap-8 space-y-8 ml-12">
            {recommendations[moreRecommendationIndex].images.map((image, index) => (
              <img
                key={index}
                className="border border-gray-200 rounded-lg shadow min-h-[60px]"
                src={image}
                alt=""
              />
            ))}
          </div>
        </div>
      )}
      {step >= 13 && (
          <Button
            label="Try Again"
            addClass="fixed bottom-4 -right-8 pr-12"
            onClick={() => {
              setStep(0);
            }} />
      )}
    </div>
  </div>
  );
}
