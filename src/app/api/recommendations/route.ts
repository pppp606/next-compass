import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations, getImage, RecommendationsCity, LlmResultJson } from '@/services/recommendations';

export async function POST(request: NextRequest) {
  try {
    const { country, city, answers } = await request.json();

    if (!country || !city || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const recommendations = await getRecommendations(country, city, answers);

    if (!recommendations) {
      return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
    }

  const recommendationsCites: RecommendationsCity[] = JSON.parse(recommendations).map((recommendation: LlmResultJson, index:number) => {
      return {
        name: (index < 4) ? recommendation.city.split('(')[0] : recommendation.city,
        reasons: recommendation.reasons,
        rent: recommendation.rent,
        images: [""],
      };
    });

    await Promise.all(recommendationsCites.map(async (recommendationsCity) => {
      const searchWord = recommendationsCity.name;
      const images = await getImage(searchWord);
      recommendationsCity.images = images;
    }));

    return NextResponse.json({ recommendations: recommendationsCites });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
