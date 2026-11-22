# RentRig - Equipment Rental Platform

RentRig is an equipment rental marketplace. Owners list equipment for rent, customers browse, book and pay for rentals for a specific period, and admins approve listings and monitor the platform.

- **Live URL:** https://your-client.vercel.app
- **Server repository:** https://github.com/your-username/equipment-rental-server

## Key features

- **Authentication:** email and password registration (name, email, photo link or imgbb upload, password), Google login, Better Auth with the MongoDB adapter. Password must have an uppercase letter, a lowercase letter and at least 6 characters.
- **Role based access control:** Customer, Owner and Admin. Private routes are protected on the client layouts and on the API with `verifyToken`, `verifyRenter`, `verifyOwner` and `verifyAdmin`.
- **Home page:** banner, featured equipment (6 approved items), categories, how it works, why choose us, customer reviews and an owner call to action, animated with Framer Motion.
- **All Equipment:** 3 column grid with server side search (name, location, category), filters (category, rental type, price range, availability) and sorting.
- **Equipment details (private):** full equipment information, owner information, favorites and a booking modal.
- **Booking and payment:** the server calculates the rental amount and checks availability, then Stripe Checkout takes the payment. After a successful payment the booking is created and the transaction is saved in the `payments` collection.
- **Customer dashboard:** My Rentals, Favorites, Profile.
- **Owner dashboard:** analytics with a monthly earnings chart, Add Equipment (imgbb image upload), My Equipment (update, delete, view), My Equipment Rental, Profile.
- **Admin dashboard:** analytics with a monthly bookings chart, All Users (change role, suspend), All Equipment (approve, reject, update, delete), All Rentals, Profile.
- Loading page, error page, 404 page and unauthorized page.

## npm packages

`next`, `react`, `react-dom`, `better-auth`, `@better-auth/mongo-adapter`, `mongodb`, `stripe`, `framer-motion`, `recharts`, `@base-ui/react`, `shadcn`, `tailwindcss`, `lucide-react`, `next-themes`, `class-variance-authority`, `cn`, `tw-animate-css`

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | Better Auth secret and the site URL |
| `BETTER_AUTH_DB_URI` | MongoDB connection string used by Better Auth |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google social login |
| `NEXT_PUBLIC_API_BASE_URL` | URL of the Express server |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb image upload |
| `STRIPE_SECRET_KEY` | Stripe secret key |

## Run locally

```bash
npm install
npm run dev
```

## Roles

New accounts (email or Google) start as **Customer**. An admin changes a user's role from **All Users**. To create the first admin, register an account and set its `role` field to `admin` in the `user` collection of MongoDB.

## Deploy

Deploy to Vercel with the environment variables above. Set `BETTER_AUTH_URL` to the live URL, add `<live-url>/api/auth/callback/google` as an authorized redirect URI in the Google console, and allow the live URL in Stripe if needed.
