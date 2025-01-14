/* eslint-disable @next/next/no-img-element */
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

  const [recommendations, setRecommendations] = useState(
    [
      {
        "name": "Sapporo  ",
        "reasons": "Sapporo offers a blend of urban conveniences and access to nature, featuring beautiful parks and mountainous surroundings perfect for relaxation. The city experiences all four distinct seasons, making it ideal for someone seeking seasonal diversity. Moreover, Sapporo is known for its unique food culture, including famous ramen and seafood dishes, aligning with your adventurous palate while still providing a suburban, quiet atmosphere.",
        "images": [
          "https://images.unsplash.com/photo-1514186077719-5f31a164c12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1656404113186-ee31a6ee8e65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1598176762419-7abc6840533a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1710691191549-1e3e67036fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1696053066632-3ef25f7bb0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1707745957273-095f00615590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1707745507046-2d3eea777837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1645611034528-437acf187829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1574835154663-3d11951f9b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1693974677145-80fac5b696ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1693975045908-1b4d44cfbf97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1488273478515-f13bd0b73037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1519105467443-4779d0fb729d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1709459991438-fabb89f2873c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1650385114503-ab8a04090e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1528257861216-ccdaeb4e3f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1586404883382-7b1c58b4d59e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1700228675976-8bd9d90528ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1548860367-c5da2ecf8d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1574834856800-80a83663cd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      },
      {
        "name": "Nagano  ",
        "reasons": "Nagano is surrounded by stunning alpine scenery and offers numerous outdoor activities, such as hiking and skiing. Living in Nagano allows for a more tranquil lifestyle with close-knit community interactions. With a climate that presents four distinct seasons, this city caters to your preference for nature-focused living and provides exotic local flavors, especially in its renowned mountain cuisine.",
        "images": [
          "https://images.unsplash.com/photo-1614059236155-eb1a7523c1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1717325218360-c41843cd79c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1572166365087-96ac83103260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494307-4950ecbe6a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393515427-526b3922a5ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494358-65315c599e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393560955-fa2dc413fde0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1633259320039-a3974fefc105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1677030550750-b6ca3f969dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494303-42aba9694bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1650892148507-67159952578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1580475673599-d9b9946d0c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1580475673651-2a40cb046d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1732682275819-d9ab36a8375a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1705028572444-a411c7a9c8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1499715008769-aa2cf0aaad5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1686530577072-1961ce4ae4a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1716719924772-aac80d7c14e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1633259305571-aed2f2f20f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1732682275753-c3d3b98b0896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      },
      {
        "name": "Prague (Czech Republic)  ",
        "reasons": "Prague is a captivating city that combines historical beauty with modern conveniences, showcasing striking scenery and a rich cultural life. Although it may be a challenging relocation due to a different language and culture, it offers an adventurous lifestyle experience with its vibrant food scene featuring both traditional and innovative cuisines. The presence of numerous parks and a charming suburban feel can fulfill your desire for nature and community interactions while enjoying a unique European lifestyle.",
        "images": [
          "https://images.unsplash.com/photo-1594492256402-1463c14e0317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776933-f4da8cc8a099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1565555303481-539930cc8368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1565555235619-453821013079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1458150945447-7fb764c11a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1509322479815-6b85f2442ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602525842-2cffe3fc76ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1581686041603-f581e6890b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602735699-712fb4531024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1509321395964-9173e84ffe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602782630-78bd6d22edee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776933-043772e7fc72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776714-be5f30170236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776713-e562db9788d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634842544343-006ddb7bae94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855654601-aa2b499281a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855654632-420b641a7a69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855657368-53e15ca91bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634842544412-5e00dd991b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855655651-d1a64421360a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      },
      {
        "name": "Sapporo  ",
        "reasons": "Sapporo offers a blend of urban conveniences and access to nature, featuring beautiful parks and mountainous surroundings perfect for relaxation. The city experiences all four distinct seasons, making it ideal for someone seeking seasonal diversity. Moreover, Sapporo is known for its unique food culture, including famous ramen and seafood dishes, aligning with your adventurous palate while still providing a suburban, quiet atmosphere.",
        "images": [
          "https://images.unsplash.com/photo-1514186077719-5f31a164c12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1656404113186-ee31a6ee8e65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1598176762419-7abc6840533a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1710691191549-1e3e67036fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1696053066632-3ef25f7bb0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1707745957273-095f00615590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1707745507046-2d3eea777837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1645611034528-437acf187829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1574835154663-3d11951f9b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxTYXBwb3JvJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1693974677145-80fac5b696ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1693975045908-1b4d44cfbf97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1488273478515-f13bd0b73037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1519105467443-4779d0fb729d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1709459991438-fabb89f2873c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1650385114503-ab8a04090e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1528257861216-ccdaeb4e3f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1586404883382-7b1c58b4d59e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1700228675976-8bd9d90528ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1548860367-c5da2ecf8d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1574834856800-80a83663cd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8U2FwcG9ybyUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      },
      {
        "name": "Nagano  ",
        "reasons": "Nagano is surrounded by stunning alpine scenery and offers numerous outdoor activities, such as hiking and skiing. Living in Nagano allows for a more tranquil lifestyle with close-knit community interactions. With a climate that presents four distinct seasons, this city caters to your preference for nature-focused living and provides exotic local flavors, especially in its renowned mountain cuisine.",
        "images": [
          "https://images.unsplash.com/photo-1614059236155-eb1a7523c1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1717325218360-c41843cd79c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1572166365087-96ac83103260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494307-4950ecbe6a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393515427-526b3922a5ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494358-65315c599e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393560955-fa2dc413fde0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1633259320039-a3974fefc105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1677030550750-b6ca3f969dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxOYWdhbm8lMjAlMjB8ZW58MHwwfHx8MTczNjg2NDEyMHww&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1674393494303-42aba9694bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1650892148507-67159952578a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1580475673599-d9b9946d0c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1580475673651-2a40cb046d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1732682275819-d9ab36a8375a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1705028572444-a411c7a9c8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1499715008769-aa2cf0aaad5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1686530577072-1961ce4ae4a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1716719924772-aac80d7c14e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1633259305571-aed2f2f20f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1732682275753-c3d3b98b0896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8TmFnYW5vJTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      },
      {
        "name": "Prague (Czech Republic)  ",
        "reasons": "Prague is a captivating city that combines historical beauty with modern conveniences, showcasing striking scenery and a rich cultural life. Although it may be a challenging relocation due to a different language and culture, it offers an adventurous lifestyle experience with its vibrant food scene featuring both traditional and innovative cuisines. The presence of numerous parks and a charming suburban feel can fulfill your desire for nature and community interactions while enjoying a unique European lifestyle.",
        "images": [
          "https://images.unsplash.com/photo-1594492256402-1463c14e0317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776933-f4da8cc8a099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1565555303481-539930cc8368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwzfHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1565555235619-453821013079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw0fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1458150945447-7fb764c11a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw1fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1509322479815-6b85f2442ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw2fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602525842-2cffe3fc76ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw3fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1581686041603-f581e6890b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw4fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602735699-712fb4531024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHw5fHxQcmFndWUlMjAlMjhDemVjaCUyMFJlcHVibGljJTI5JTIwJTIwfGVufDB8MHx8fDE3MzY4NjQxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1509321395964-9173e84ffe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1578602782630-78bd6d22edee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776933-043772e7fc72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxMnx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776714-be5f30170236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxM3x8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1550776713-e562db9788d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634842544343-006ddb7bae94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855654601-aa2b499281a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxNnx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855654632-420b641a7a69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxN3x8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855657368-53e15ca91bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634842544412-5e00dd991b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwxOXx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080",
          "https://images.unsplash.com/photo-1634855655651-d1a64421360a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTYwNzZ8MHwxfHNlYXJjaHwyMHx8UHJhZ3VlJTIwJTI4Q3plY2glMjBSZXB1YmxpYyUyOSUyMCUyMHxlbnwwfDB8fHwxNzM2ODY0MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080"
        ]
      }
    ]
  );

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
    }}
  >
    <div
      className={`bg-white bg-opacity-80 h-screen w-full flex items-start justify-center`}
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
                    <a href="#" className="text-white text-sm font-bold p-2 px-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
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
    </div>
  </div>
  );
}
