import axios from 'axios';
import OpenAI from "openai";
import { questions } from '@/components/questions';

type UnsplashResponseItem = {
  created_at: string;
  updated_at: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
};

export async function getRecommendations(country: string, city: string, answers: string[]) {
  let prompt = `
Based on the following answers, please suggest three potential relocation destinations. The suggestions should include:

1. Four realistic relocation destinations **within the country where I currently reside**, based on the user's preferences and practical considerations.
2. Two **challenging relocation destination outside the user's current country**, which offers a unique lifestyle experience.

For each destination, include:
- The name of the destination (as a single city name, e.g., "Tokyo").
- A brief explanation of why the destination matches the criteria.\n`

  prompt += '## Questions and Answers\n';
  prompt += 'q. Where do you currently live?\n';
  prompt += `a. ${city} in ${country}\n\n`;

  questions.forEach((q, index) => {
    const answerIndex = answers[index].charCodeAt(0) - 'a'.charCodeAt(0);
    const answerText = q.options[answerIndex];
    prompt += `q. ${q.question}\n`;
    prompt += `a. ${answerText}\n\n`;
  });

  prompt += `
## Output format:
1. Destination: <city_name_within_country>
  Reason: <reason_for_suggestion>

2. Destination: <city_name_within_country>
  Reason: <reason_for_suggestion>

3. Destination: <city_name_within_country>
  Reason: <reason_for_suggestion>

4. Destination: <city_name_within_country>
  Reason: <reason_for_suggestion>

5. Destination: <city_name_outside_country>(<country_name>)
  Reason: <reason_for_suggestion>

6. Destination: <city_name_outside_country>(<country_name>)
  Reason: <reason_for_suggestion>`

  const openai = new OpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
  });

  return response.choices[0].message.content;
}

export async function getImage(city: string, per_page: number = 20) {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query: city,
      orientation: 'landscape',
      per_page,
      client_id: process.env.UNSPLASH_API_ACCESS_KEY,
    },
  });

  return response.data.results.map((result: UnsplashResponseItem) => result.urls.regular);
}
