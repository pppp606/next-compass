import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations, getImage } from '@/services/recommendations';

export type RecommendationsCity = {
  name: string;
  reasons: string;
  images: string[];
}

export async function POST(request: NextRequest) {
  // try {
    const { country, city, answers } = await request.json();

    if (!country || !city || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const recommendations = await getRecommendations(country, city, answers);

    // recommendations　ex
    // 1. Destination: **Kyoto**
    //   Reason: Kyoto offers a harmonious blend of rich cultural heritage, historical sites, and serene natural surroundings. With its famous temples, traditional gardens, and proximity to scenic spots like Arashiyama, it provides a peaceful suburban atmosphere ideal for walking in nature. Kyoto's warm climate and traditional Japanese cuisine also align well with your preferences.

    // 2. Destination: **Kanazawa**
    //   Reason: Kanazawa is a quiet city that retains much of its historical charm, featuring stunning gardens like Kenrokuen, traditional tea houses, and a slower-paced lifestyle. It offers a balance of natural beauty and cultural richness, making it an ideal place for you to enjoy both outdoor activities and cultural exploration. The city's relaxed, suburban vibe makes it a good fit for your preference for peace and tranquility.

    // 3. Destination: **Queenstown** (New Zealand)
    //   Reason: Queenstown is renowned for its breathtaking natural landscapes, with towering mountains, lakes, and forests that offer endless outdoor activities. Known as the adventure capital, it’s a great place for enjoying nature, hiking, and a peaceful atmosphere, while the small town fosters close-knit community interactions. This destination provides a unique lifestyle with a balance of adventure and serenity in a warm, sunny environment.

    const recommendationsCites: RecommendationsCity[] = recommendations.split('\n\n').map((recommendation: string) => {
      const [city, reasons] = recommendation.split('\n');
      return {
        name: city.split('**')[1],
        reason: reasons.split('Reason: ')[1],
        images: [],
      };
    });

    // proms all images
    await Promise.all(recommendationsCites.map(async (recommendationsCity) => {
      const images = await getImage(recommendationsCity.name);
      recommendationsCity.images = images;
    }));

    return NextResponse.json({ recommendations: recommendationsCites });

  // } catch (error) {
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }
}
