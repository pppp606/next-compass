'use client';

import React, { useState } from 'react';
import { questions } from '@/components/questions';
import { Button } from '@/components/button';
import axios from 'axios';

type PostRecommendationsData = {
  country: string,
  city: string,
  answers: string[],
};

export default function Page() {
  const [iconMove, setIconMove] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [postRecommendationsData, setPostRecommendationsData] = useState<PostRecommendationsData>({
    country: '',
    city: '',
    answers: [],
  });

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
    const result = await axios.post('/api/recommendations', postRecommendationsData);
    console.log(result);
  };

  return (
  <div
    className="h-screen"
    style={{
      backgroundImage: `url('./bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div
      className={`bg-white bg-opacity-80 h-screen w-full flex items-start justify-center`}
    >
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
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder="e.g., United States"
                    onChange={(e) => setPostRecommendationsData({ ...postRecommendationsData, country: e.target.value })}
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
        {step >= 12 && (
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
    </div>
  </div>
  );
}
