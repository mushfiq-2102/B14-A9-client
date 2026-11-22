import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("rentrigdb")

export const auth = betterAuth({
    //...

    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            // New accounts (email or Google) are always customers; an admin changes the role later.
            role: {
                type: ["customer", "owner", "admin"],
                input: false,
                defaultValue: "customer",
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
})
