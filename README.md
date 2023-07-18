# Coffee Compass

Users can search for coffee shops and upvote them for others to see. The project also features an Airtable database that makes it easier to access and manage the information. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<hr>

## :fire: Deployed Link ##

This project is hosted on [Vercel Platform](https://vercel.com/). Visit the following link to view the web application.

```
https://coffee-project-anmol-baranwal.vercel.app/
```
<hr>

## ✅ Guidelines to run web app locally

- For this app to work, you need to configure the following environment variables in your .env file in the root directory.

```
NEXT_PUBLIC_FOURSQUARE_PLACES_API_KEY=<value>
NEXT_PUBLIC_UNSPLASH_ACCESS_API_KEY=<value>
NEXT_PUBLIC_UNSPLASH_SECRET_API_KEY=<value>
AIRTABLE_WEB_API_KEY=<value>
AIRTABLE_BASE_KEY=<value>
```

- Use these commands to run the application

```bash
# to install dependencies 
npm install

# to run the server
npm run dev

```

- Open `http://localhost:3000` with your browser to see the application.

<br>

## 🚀 Complex Features

- Employed serverless functions to generate API responses, allowing for efficient and scalable data retrieval.

- Utilized useSWR to effectively fetch data from an Airtable database, streamlining the data fetching process.
- Implemented both client side rendering and server side rendering with useContext, resulting in a seamless and user-friendly experience.
- Employed various cutting-edge techniques, including lazy loading, preloading, and lighthouse, to optimize website performance.
- Ensured the highest level of code quality and error detection by using lint, resulting in a flawless end product.

## <img src="https://user-images.githubusercontent.com/74038190/221857984-5bf77e81-6f65-4502-a7c8-f29a978efb3f.png" alt="bullseye" width="35" /> Frameworks & Tools
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Airtable-18BFFF?style=for-the-badge&logo=Airtable&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<hr>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
