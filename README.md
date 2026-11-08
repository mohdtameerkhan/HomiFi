This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# HomiFi — Project Continuation Brief

## Project goal
Build HomiFi, a portfolio-quality real-estate discovery web application inspired by modern US property platforms. Initial market: Austin, Texas. Buying and renting are both product goals.

## Tech stack
- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Realty API (`realtyapi.io`)
- Git for version control

## Current completed work
- Next.js project is running.
- Realty API key is stored in the project-root `.env.local` file as `REALITY_API_KEY`.
- `types/property.ts` defines the internal `Property` type.
- `services/realityApi.ts` fetches listings and maps provider fields into the internal type.
- `app/api/properties/route.ts` exposes mapped property data.
- `app/page.tsx` fetches and displays listings server-side.
- The API and data mapping work.
- Tailwind CSS styling and a property card have been created (confirmed by the developer/user).

## Current architecture
- `app/page.tsx`: server-rendered listings page.
- `app/api/properties/route.ts`: API route returning mapped properties.
- `services/realityApi.ts`: external API request and response mapping.
- `types/property.ts`: internal property contract.
- `components/property/`: planned home for reusable property components.

## Feature roadmap
1. Stabilize current listing page and verify responsive styling.
2. Search and filters: location, price range, bedrooms, bathrooms and property type.
3. URL-based filter state and sorting.
4. Dynamic property detail pages at `/properties/[id]`.
5. Pagination or load more, based on the provider's response.
6. Buy/rent search, after verifying API rental support.
7. Map view using listing coordinates.
8. Favorites and a favorites page.
9. Loading, error, empty and missing-image states.
10. Accessibility, SEO, performance and tests.
11. Deploy the app and write the final README.

## Engineering rules
- Do not rewrite working code without a clear reason.
- Do not expose `REALITY_API_KEY` to browser-side code.
- Do not invent API fields or assume an endpoint supports rentals or pagination; verify provider behavior.
- Reuse the existing `Property` type and mapping layer.
- Add dependencies only when needed.
- Implement one feature at a time and test each feature before continuing.

## How to resume
First inspect the current `app/page.tsx`, `components/`, `services/realityApi.ts`, and `types/property.ts` before changing code. The user's local code is the source of truth; this brief describes the plan, not a guarantee that every planned file already exists.

Ask the user to share the current relevant code if it is not available in the new chat. Continue from the next unfinished roadmap item, explain the reasoning in simple Hinglish, and make small testable changes.