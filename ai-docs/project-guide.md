Here’s the translated version of your text:

---

# Project Name: NextCompass

## Overview
The following is a list of tasks to be completed within the next 24 hours to advance the implementation.

---

### **Task List**

#### **1. Preparation**
1. **API Key Setup**
  - [x] **OpenAI API**: Obtain and configure the API key.
  - [x] **Unsplash API**: Obtain and configure the API key.

2. **Project Setup**
  - [x] Create a Next.js project.
    - Use TypeScript
    - `npx create-next-app next-compass --ts`
    - Utilize tailwindcss
    - Create in the `app/` directory
    - No need for jest initially
  - [x] Install necessary libraries:
    - axios
    - dotenv
    - openai

3. **Environment Variables Setup**
  - [x] Create a `.env.local` file to securely manage the API keys:
    ```
    OPENAI_API_KEY=
    UNSPLASH_API_ACCESS_KEY=
    ```

---

#### **2. Backend Integration**
1. **API Endpoint (Controller Layer)**
  - [x] POST: `/api/recommendations`
    - Body:
      ```
      {
        "country": "United States",
        "city": "New York",
        "answers": ["a", "b", "c", "d", "a", "b", "c", "d", "a", "b"]
      }
      ```
    - Response:
      ```
      [{
        "name": "New York",
        "reasons": "New York is a great city because it has a lot of things to do and see. It's a great place to live because it's a melting pot of cultures and people. It's a great place to visit because there are so many things to do and see. It's a great place to work because there are so many opportunities. It's a great place to raise a family because there are so many things to do and see. It's a great place to retire because there are so many things to do and see. It's a great place to live because there are so many things to do and see. It's a great place to visit because there are so many things to do and see. It's a great place to work because there are so many opportunities. It's a great place to raise a family because there are so many things to do and see. It's a great place to retire because there are so many things to do and see."
        "images": [
          "https://images.unsplash.com/photo/1",
          "https://images.unsplash.com/photo/2",
        ],
      }]
      ```
2. **Service Layer Function to Call API Requests**
  - [x] `getRecommendations`
    - Prop:
      - `country: string`
      - `city: string`
      - `answers: string[]`
    - Return:
      ```
      items:[
        {
          city: string
          reasons: string
        }
      ]
      ```
    - Create prompt for OpenAI API request using input arguments.
    - Return the parsed response.
    - Reference: [OpenAI Quickstart](https://platform.openai.com/docs/quickstart)
  - [x] `getImage`
    - Prop:
      - `city: string`
      - `per_page: number = 20`
    - Return:
      ```
      images: string[]
      ```
    - Unsplash API endpoint:
      - `https://api.unsplash.com/search/photos?query=tokyo&orientation=landscape&client_id=${process.env.UNSPLASH_API_ACCESS_KEY}`
      - Use `{results:[urls:{regular:}]}`.
      - Documentation: [Unsplash API](https://unsplash.com/documentation#search-photos)

3. **Error Handling**
  - [x] Temporarily return a 500 error for all requests.

---

#### **3. Frontend Implementation**
1. Pages
  - [x] Design the homepage
    - Service name: NextCompass
    - Service description: Discover Your Next Chapter. Find the perfect location for the life you want to live.
    - Start button: Let’s begin by answering 10 quick questions!
  - [ ] Input
    - [ ] After selecting a country, fetch and display a list of areas (states/regions) for that country using react-autosuggest.
      - [x] Store country list as a JSON on the frontend.
      - [ ] Fetch city list from the API.
        - Send a POST request to `https://countriesnow.space/api/v0.1/countries/cities` with `{"country":"United States"}`.
        - No keys required, so make the request directly from the frontend.
    - [x] Allow input for all 10 questions in a single screen, in sequence.
  - [x] Display Results
    - [x] Show three cities in cards.
      - [x] Display images, city name, and reasons.
      - [x] "More" button
        - Show remaining images.
        - Add a link to Google Maps in the top-right corner.
          - Google Maps link: `https://www.google.com/maps/place/${city}`
        - Optional: Implement infinite scrolling if time permits.
    - [ ] "Try Again" button to navigate back to the homepage.

2. Required Components
  - [ ] City selection component
    - [x] Country selection component
    - [ ] City selection component
  - [x] Question component
    - [x] Component to display options A, B, C, D.

---

#### **5. Deployment**
1. **Deployment**
   - [x] Host on Vercel
   - [x] Set environment variables on Vercel

---
