import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations, getImage, RecommendationsCity } from '@/services/recommendations';

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

    const recommendationsCites: RecommendationsCity[] = recommendations.split('\n\n').map((recommendation: string) => {
      const [city, reasons] = recommendation.split('\n');
      return {
        name: city.split('Destination: ')[1].replace('*', ''),
        reasons: reasons.split('Reason: ')[1],
        images: [""],
      };
    });

    await Promise.all(recommendationsCites.map(async (recommendationsCity) => {
      const images = await getImage(recommendationsCity.name);
      recommendationsCity.images = images;
    }));

    return NextResponse.json({ recommendations: recommendationsCites });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
